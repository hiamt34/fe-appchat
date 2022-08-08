/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { IMes, roomAction, selectMess } from '../../../app/room/roomSlice';
import { selectUser } from '../../../app/user/userSlice';
import { ReplyContext } from '../../../contexts/RepLyProvider';

const UserChatConten = ({ mes, mesNext }: { mes: IMes, mesNext: IMes | undefined }) => {
    const user = useAppSelector(selectUser)
    const scrollRef = useRef()
    const dispatch = useAppDispatch();
    const context = useContext(ReplyContext);
    const getMessInStore = useAppSelector(selectMess)
    useEffect(() => {
        //@ts-ignore
        return scrollRef?.current?.scrollIntoView({ behavior: "smooth" })
    }, [mes, getMessInStore])
    const changeReply = () => {
        context.contextReply.setIsReply(true)
        context.contextReply.setConten(mes.conten)
    }
    const deleteMes = () => {
        dispatch(roomAction.deleteMes({ _id: mes._id as string }))
    }

    return (
        <li className={user?._id === mes?.senderId?._id ? "chat-list right" : "chat-list left"} >
            <div className={(!mesNext || mesNext?.senderId?._id !== mes?.senderId?._id) ? "conversation-list" : "conversation-list non-img"}>
                {
                    (!mesNext || mesNext?.senderId?._id !== mes?.senderId?._id)
                    &&
                    (<div className="chat-avatar">
                        <img src={mes?.senderId?.photo ? mes?.senderId?.photo : 'https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-vui-ve.jpg'} />
                    </div>)
                }

                <div className="user-chat-content">
                    <div className="ctext-wrap">
                        <div className="ctext-wrap-content" >
                            {
                                mes.reply && (
                                    <div className="replymessage-block mb-0 d-flex align-items-start">
                                        <div className="flex-grow-1">
                                            <p className="mb-0">{mes.reply}</p>
                                        </div>
                                    </div>
                                )
                            }
                            <p className="mb-0 ctext-content">{mes.conten}</p>
                        </div>
                        <div className="dropdown align-self-start message-box-drop">
                            <a className="dropdown-toggle" onClick={changeReply}>
                                <i className="bx bx-share ms-2 text-muted" />
                            </a>
                            <a className="dropdown-toggle" onClick={deleteMes}>
                                <i className="bx bx-trash text-muted ms-2" />
                            </a>
                        </div>
                    </div>
                    {
                        (!mesNext || mesNext?.senderId?._id !== mes?.senderId?._id)
                        &&
                        (<div className="conversation-name" ref={scrollRef as unknown as React.RefObject<HTMLDivElement>}>
                            {mes?.senderId?.name}
                            <small className="text-muted time">{
                                new Date(mes.createdAt).toString().split(" ")[4].slice(0, 5) + ', ' +
                                new Date(mes.createdAt).getDate() +
                                ' tháng ' + (new Date(mes.createdAt).getMonth() + 1) +
                                ', ' + new Date(mes.createdAt).getFullYear()
                            }</small>
                            <span className="text-success check-message-icon">
                                <i className="bx bx-check-double" />
                            </span>
                        </div>)
                    }

                </div>
            </div>
        </li>
    );
};

export default UserChatConten;