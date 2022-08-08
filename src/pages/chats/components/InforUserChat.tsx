/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { IUser } from "../../../app/auth/authSlice";
import { useAppSelector } from "../../../app/hooks";
import { IMes, roomAction, selectMembers, selectMess, selectRoom } from "../../../app/room/roomSlice";
import { selectUser, selectUserOnline, selectUsers } from "../../../app/user/userSlice";
import { SocketContext } from "../../../contexts/SocketProvider";
import { IRoom } from "../../../services/roomService";
import UserChatConten from "./UserChatConten";
interface IPropInforUserChat {
    room?: IRoom,
}

const InforUserChat = () => {
    const members = useAppSelector(selectMembers)
    const { socket } = useContext(SocketContext)
    const dispatch = useDispatch()
    const getMessInStore = [...useAppSelector(selectMess)].sort(function (
        a: IMes,
        b: IMes
    ) {
        if (new Date(a.createdAt) > new Date(b.createdAt)) {
            return 1;
        }
        if (new Date(a.createdAt) < new Date(b.createdAt)) {
            return -1;
        }
        return 0;
    }).map(mes => {
        const sender = members.find(u => u._id === mes.senderId)
        return {
            ...mes,
            senderId: sender
        }
    })
    const user = useAppSelector(selectUser)
    const roomStore = useAppSelector(selectRoom)
    const userOnline = useAppSelector(selectUserOnline);
    const [room, setRoom] = useState<IRoom | undefined>()

    useEffect(() => {
        if (members.length === 2) {
            const inforChat = (members[0]._id !== user?._id) ? members[0] : members[1]

            setRoom({
                ...roomStore,
                inforChat
            })
        } else {
            setRoom(roomStore)
        }
    }, [roomStore, members])

    const deleteRoom = () => {
        dispatch(roomAction.outRoom({
            userId: user?._id as string,
            roomId: room?._id as string
        }))
        socket.emit('out-room', roomStore?.members) // dng chay bat doong bo chua su ly
    }
    useEffect(() => {
        socket.emit('delete-notify', ({ roomId: room?._id, userId: user?._id }))
    }, [room])
    return (
        <div id="users-chat" className="position-relative">
            <div className="p-3 p-lg-4 user-chat-topbar">
                <div className="row align-items-center">
                    <div className="col-sm-4 col-8">
                        <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 d-block d-lg-none me-3">
                                <a className="user-chat-remove font-size-18 p-1"><i className="bx bx-chevron-left align-middle" /></a>
                            </div>
                            <div className="flex-grow-1 overflow-hidden">
                                <div className="d-flex align-items-center">
                                    <div className={!room?.inforChat ? "flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0" :
                                        (userOnline.some(u => u.userId === room?.inforChat?._id) ?
                                            "flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0" :
                                            "flex-shrink-0 chat-user-img user-own-img align-self-center me-3 ms-0")}
                                    >
                                        <img src={room?.inforChat?.photo ? room?.inforChat.photo : "https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-vui-ve.jpg"} className="rounded-circle avatar-sm" />
                                        <span className="user-status" />
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h6 className="text-truncate mb-0 font-size-18"><a className="user-profile-show text-reset">{room?.inforChat ? room?.inforChat?.name : room?.name}</a></h6>
                                        <p className="text-truncate text-muted mb-0"><small>{
                                            !room?.inforChat ? "Online"
                                                :
                                                (userOnline.some(u => u.userId === room?.inforChat?._id) ? "Online" : "Offline")
                                        }</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8 col-4">
                        <ul className="list-inline user-chat-nav text-end mb-0">
                            <li className="list-inline-item">
                                <button className="btn nav-btn dropdown-toggle" onClick={deleteRoom} >
                                    <i className="bx bx-trash text-muted" />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* end chat user head */}
            {/* start chat conversation */}
            <div className="chat-conversation p-3 p-lg-4 " id="scroll" >
                <ul className="list-unstyled chat-conversation-list" id="users-conversation">
                    {
                        getMessInStore.map((mes, key) => {
                            return (
                                <UserChatConten key={key} mes={mes} mesNext={getMessInStore[key + 1]} />
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default InforUserChat;