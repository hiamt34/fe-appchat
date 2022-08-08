import React, { useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authAction, selectIsLoggedIn } from '../../app/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { roomAction, selectRooms } from '../../app/room/roomSlice';
import { IUserOnline, selectIsUser, selectUser, selectUsers, userAction } from '../../app/user/userSlice';
import { OverLayContext } from '../../contexts/OverlayProvider';
import { SocketContext } from '../../contexts/SocketProvider';
import MainChat from '../../pages/chats/components/MainChat';
import { CustomizedAlert } from '../components/Alert';
import Main from './component/Main';
import SideMenu from './component/SideMenu';
interface LayoutProps {
    children: React.ReactNode
}
const ChatLayout: React.FC<LayoutProps> = ({ children }) => {
    const context = useContext(OverLayContext)
    const { socket } = useContext(SocketContext)
    const rooms = useAppSelector(selectRooms)
    const changeOverlay = () => {
        context.setIsOverlay(!context.isOverlay)
    }
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const users = useAppSelector(selectUsers);
    const user = useAppSelector(selectUser)
    useEffect(() => {
        // dispatch(userAction.getAll())
        dispatch(userAction.get())
        dispatch(roomAction.getRoom())
    }, [dispatch])

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login", { replace: true })
        }
    }, [dispatch, isLoggedIn, navigate])
    const { pathname } = useLocation()

    //socket
    useEffect(() => {
        user?._id && socket.emit('user-connect', user?._id)
    }, [socket, user?._id])
    useEffect(() => {
        const listenerGetUser = (data: IUserOnline[]) => {
            let isExit = true
            for (let i = 0; i < data.length; i++) {
                const user = data[i];

                isExit = users.some(u => u._id === user.userId)
                if (!isExit) {
                    dispatch(userAction.getAll())
                    break;
                }
            }
            dispatch(userAction.setUserOnline(data))
        }
        const listenerUpdateRoom = () => {
            dispatch(roomAction.getRoom())
        }
        socket.on('get-users', listenerGetUser)
        socket.on('update-rooms', listenerUpdateRoom)
        return () => {
            socket.off('get-users', listenerGetUser)
            socket.off('update-rooms', listenerUpdateRoom)
        }
    }, [dispatch, socket, users])

    useEffect(() => {
        rooms.forEach(room => {
            socket.emit('join-room', {
                userId: user?._id,
                roomId: room._id
            })
        })
    }, [rooms])

    return (
        <div className="layout-wrapper d-lg-flex">
            <div className={context.isOverlay ? "overlay show" : "overlay"} onClick={changeOverlay} />
            <SideMenu />
            <div className="chat-leftsidebar">

                <div className="tab-content">
                    <CustomizedAlert />
                    {children}
                </div>
            </div>
            {
                pathname !== '/' ?
                    <Main /> :
                    <MainChat />
            }

        </div>
    );
};

export default ChatLayout;