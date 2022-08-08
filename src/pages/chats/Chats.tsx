/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IMes, INotyfysMsg, roomAction, selectLoadding, selectRoom, selectRooms } from '../../app/room/roomSlice';
import { selectUser } from '../../app/user/userSlice';
import { SocketContext } from '../../contexts/SocketProvider';
import ItemMsg from './components/ItemMsg';
import ItemMsgGroup from './components/ItemMsgGroup';
import { ModelAddSer } from './components/ModelAddUser';
import SkeletonLoading from './components/SkeletonLoading';

const Chats = () => {
    const rooms = useAppSelector(selectRooms)
    const room = useAppSelector(selectRoom)
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { socket } = useContext(SocketContext)
    useEffect(() => {
        const listenerMessage = (msg: IMes) => {
            const isExitRoom = rooms.some(r => r._id === msg.roomId)

            isExitRoom || dispatch(roomAction.getRoom())

            const isInRoom = room?._id === msg.roomId
            if (isInRoom) {
                dispatch(roomAction.insertMes(msg))
                socket.emit('delete-notify', ({ roomId: room._id, userId: user?._id }))
            } else {
                socket.emit('get-notifys', (user?._id))
            }
            console.log('on:', msg);

        }
        const listenerNotifys = (notifys: INotyfysMsg[]) => {
            dispatch(roomAction.insertNotitysMsg(notifys))
        }
        socket.on('message', listenerMessage)
        socket.on('notifys', listenerNotifys)
        return () => {
            socket.off("message", listenerMessage);
            socket.off('notifys', listenerNotifys)
        }
    }, [socket, room, user, rooms, dispatch])

    return (
        <div className="active">
            {/* Start chats content */}
            <div>
                <div className="px-4 pt-4">
                    <div className="d-flex align-items-start">
                        <div className="flex-grow-1">
                            <h4 className="mb-4">Chats</h4>
                        </div>
                        <div className="flex-shrink-0">
                            <div >
                                {/* Button trigger modal */}
                                <button type="button" className="btn btn-soft-primary btn-sm" onClick={handleOpen}>
                                    <i className="bx bx-plus" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <form>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control bg-light border-0 pe-0" id="serachChatUser" placeholder="Search here.." />
                            <button className="btn btn-light" type="button" id="searchbtn-addon"><i className="bx bx-search align-middle" /></button>
                        </div>
                    </form>
                </div> {/* .p-4 */}
                <div className="chat-room-list" >
                    {/* Start chat-message-list */}

                    <div className="d-flex align-items-center px-4 mt-5 mb-2">
                        <div className="flex-grow-1">
                            <h4 className="mb-0 font-size-11 text-muted text-uppercase">Direct Messages</h4>
                        </div>

                    </div>
                    <div className="chat-message-list">
                        <ul className="list-unstyled chat-list chat-user-list">
                            {
                                rooms.length === 0 && user ? (
                                    <>
                                        <SkeletonLoading />
                                        <SkeletonLoading />
                                        <SkeletonLoading />
                                    </>
                                ) : rooms.map((room, key) => {
                                    //@ts-ignore
                                    if (room.members.length === 2) {

                                        return (
                                            //@ts-ignore
                                            <ItemMsg key={key} _id={room.members[0] === user?._id ? room.members[1] : room.members[0]} roomId={room._id} room={room} />
                                        )
                                    }
                                })
                            }


                            <ModelAddSer open={open} handleOpen={handleOpen} handleClose={handleClose} />

                        </ul>
                    </div>
                    <div className="d-flex align-items-center px-4 mt-5 mb-2">
                        <div className="flex-grow-1">
                            <h4 className="mb-0 font-size-11 text-muted text-uppercase">Groups</h4>
                        </div>
                    </div>
                    <div className="chat-message-list">
                        <ul className="list-unstyled chat-list chat-user-list mb-3" id="channelList">
                            {
                                rooms.length === 0 && user ? (
                                    <>
                                        <SkeletonLoading />
                                        <SkeletonLoading />
                                        <SkeletonLoading />
                                    </>
                                ) : rooms.map((room, key) => {
                                    //@ts-ignore
                                    if (room.members.length > 2) {
                                        return (
                                            //@ts-ignore
                                            <ItemMsgGroup key={key} room={room} />
                                        )
                                    }
                                })
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Chats;