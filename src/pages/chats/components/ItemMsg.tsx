/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { IUser } from '../../../app/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { roomAction, selectNotifysMsg, selectRoomId } from '../../../app/room/roomSlice';
import { selectUser, selectUserOnline } from '../../../app/user/userSlice';
import client from '../../../services/client';
import { IRoom } from '../../../services/roomService';
import SkeletonLoading from './SkeletonLoading';

const ItemMsg = ({ _id, roomId, room }:
    {
        _id: string | undefined,
        roomId: string,
        room: IRoom
    }) => {
    const [user, setUser] = useState<IUser | undefined>(undefined)
    useEffect(() => {
        client.post('/user/get-member', { _id }).then((data: any) => {
            setUser(data.payload);
        })
    }, [_id])
    const dispatch = useAppDispatch();
    const getMess = () => {
        dispatch(roomAction.saveRoom(room))
    }
    const roomIdCurent = useAppSelector(selectRoomId);
    const userOnline = useAppSelector(selectUserOnline);
    const notifys = useAppSelector(selectNotifysMsg);
    const userLogin = useAppSelector(selectUser);
    return (
        !user ? (<SkeletonLoading />) : (
            <li className={roomId === roomIdCurent ? "msg-li active" : "msg-li"} style={{ cursor: "pointer", marginBottom: 10 }} onClick={getMess}>
                <a className="unread-msg-user">
                    <div className="d-flex align-items-center">
                        <div className={userOnline.some(u => u.userId === _id) ?
                            "chat-user-img online align-self-center me-2 ms-0" :
                            "chat-user-img align-self-center me-2 ms-0"}>
                            <img src={user?.photo || "https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-vui-ve.jpg"}
                                className="rounded-circle avatar-xs" />
                            <span className="user-status" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-truncate mb-0">{user?.name}</p>
                        </div>
                        <div className="ms-auto">
                            <span className="badge badge-soft-dark rounded p-1">{notifys.filter(n => (n.roomId === roomId && userLogin?._id === n.userId)).length || ""}</span>
                        </div>
                    </div>
                </a>
            </li>
        )
    );
};

export default ItemMsg;