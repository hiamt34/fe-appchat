/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { roomAction, selectNotifysMsg, selectRoomId } from '../../../app/room/roomSlice';
import { selectUser } from '../../../app/user/userSlice';
import { IRoom } from '../../../services/roomService';

const ItemMsgGroup = ({ room }: { room: IRoom }) => {
    const dispatch = useAppDispatch();
    const getMess = () => {
        dispatch(roomAction.saveRoom(room))
    }
    const roomIdCurent = useAppSelector(selectRoomId);
    const notifys = useAppSelector(selectNotifysMsg);
    const userLogin = useAppSelector(selectUser);

    return (
        <li id="contact-id-12" style={{
            cursor: "pointer"
        }} onClick={getMess} className={room._id === roomIdCurent ? "msg-li active" : "msg-li"}>
            <a className="unread-msg-user">
                <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 avatar-xs me-2">
                        <span className="avatar-title rounded-circle bg-soft-light text-dark">
                            <img src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-vui-ve.jpg" className="rounded-circle avatar-xs" />
                        </span>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                        <p className="text-truncate mb-0">{room.name}</p>
                    </div>
                    <div>
                        <div className="flex-shrink-0 ms-2">
                            <span className="badge badge-soft-dark rounded p-1">{notifys.filter(n => (n.roomId === room._id && userLogin?._id === n.userId)).length || ""}</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
    );
};

export default ItemMsgGroup;