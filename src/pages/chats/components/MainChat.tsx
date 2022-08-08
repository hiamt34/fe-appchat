/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useContext, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { roomAction, selectLoadding, selectRoom, selectRoomId, selectRooms } from "../../../app/room/roomSlice";
import ReplyProvider from "../../../contexts/RepLyProvider";
import { SocketContext } from "../../../contexts/SocketProvider";
import ChatInput from "./ChatInput";
import InforUserChat from "./InforUserChat";
import SkeletonOnforUserChat from "./SkeletonOnforUserChat";


const MainChat = () => {
    const isLoadding = useAppSelector(selectLoadding);
    const dispatch = useAppDispatch();
    const roomId = useAppSelector(selectRoomId)
    const room = useAppSelector(selectRoom)
    const { socket } = useContext(SocketContext)
    useEffect(() => {
        room?._id && dispatch(roomAction.getMembers({
            ids: room?.members as string[]
        }))

        room?._id && dispatch(roomAction.getMess({ roomId: room._id }))
    }, [dispatch, room])
    return (
        <div className="user-chat w-100 overflow-hidden">
            <div className="user-chat-overlay" style={{ background: 'rgb(78, 172, 109)' }} />
            <div className="chat-content d-lg-flex">
                {/* start chat conversation section */}
                <div className="w-100 overflow-hidden position-relative">
                    {
                        (!room?._id || isLoadding) ? (
                            <SkeletonOnforUserChat />
                        ) : (
                            <ReplyProvider>
                                <>
                                    <InforUserChat />
                                    <ChatInput />
                                </>
                            </ReplyProvider>
                        )
                    }

                </div>
            </div>
        </div>

    );
};

export default MainChat;