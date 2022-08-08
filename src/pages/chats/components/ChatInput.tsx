/* eslint-disable jsx-a11y/heading-has-content */

import { useContext, useEffect, useRef, useState } from "react";
import { alertAction } from "../../../app/alert/alertSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { IMes, roomAction, selectRoom, selectRoomId } from "../../../app/room/roomSlice";
import { selectUser } from "../../../app/user/userSlice";
import { ReplyContext } from "../../../contexts/RepLyProvider";
import { SocketContext } from "../../../contexts/SocketProvider";
import { validateConten } from "../../../validate/validate";
import Emoji from "./Emoji";


const ChatInput = () => {
    const [conten, setConten] = useState<string>('');
    const [isOpenEmoji, setIsOpenEmoji] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser)
    const room = useAppSelector(selectRoom)
    const roomId = useAppSelector(selectRoomId) as string
    const context = useContext(ReplyContext);
    const { socket } = useContext(SocketContext)
    const forcus = useRef()
    const HandleSendMes = () => {
        validateConten
            .validate({ conten })
            .then(() => {
                const msg = {
                    roomId,
                    senderId: user?._id,
                    conten,
                    createdAt: new Date().toUTCString(),
                    reply: context.contextReply.conten
                }
                dispatch(roomAction.insertMes(msg))
                setConten("")
                closeReply()

                socket.emit('chat-messager', { msg, members: room?.members })
            })
            .catch((error) => {
                dispatch(
                    alertAction.changeMessage({
                        message: error.message,
                        type: "error",
                    })
                );
            });
    }
    const closeReply = () => {
        context.contextReply.setIsReply(false)
        context.contextReply.setConten(undefined)
    }
    useEffect(() => {
        //@ts-ignore
        forcus?.current.focus()
    }, [context.contextReply, conten])
    useEffect(() => {
        setIsOpenEmoji(false)
    }, [conten])



    return (
        <div className="position-relative">
            <div className="chat-input-section p-3 p-lg-4">
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    HandleSendMes();
                }}>
                    <div className="row g-0 align-items-center">
                        <div className="col-auto">
                            <div className="chat-input-links me-md-2">
                                <div className="links-list-item">
                                    <button type="button" className="btn btn-link text-decoration-none btn-lg waves-effect" >
                                        <i className="bx bx-images align-middle" />
                                    </button>
                                </div>
                                <div className="links-list-item">
                                    <button type="button"
                                        onClick={() => setIsOpenEmoji(!isOpenEmoji)}
                                        className="btn btn-link text-decoration-none btn-lg waves-effect emoji-btn" >
                                        <i className="bx bx-smile align-middle" />
                                    </button>
                                    {
                                        isOpenEmoji && <Emoji setConten={setConten} conten={conten} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="position-relative">
                                <input type="text" onChange={(event) => setConten(event.target.value)}
                                    className="form-control form-control-lg chat-input"
                                    placeholder="Type your message..."
                                    value={conten}
                                    ref={forcus as unknown as React.LegacyRef<HTMLInputElement>}
                                />
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="chat-input-links ms-2 gap-md-1">
                                <div className="links-list-item">
                                    <button type="submit" className="btn btn-primary btn-lg chat-send waves-effect waves-light" >
                                        <i className="bx bxs-send align-middle" id="submit-btn" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
            {/* reply */}
            <div className={context.contextReply.isReply ? "replyCard show" : "replyCard"}>
                <div className="card mb-0">
                    <div className="card-body py-3">
                        <div className="replymessage-block mb-0 d-flex align-items-start">
                            <div className="flex-grow-1">
                                <p className="mb-0">{context.contextReply.conten}</p>
                            </div>
                            <div className="flex-shrink-0">
                                <button type="button" className="btn btn-sm btn-link mt-n2 me-n3 font-size-18" onClick={closeReply}>
                                    <i className="bx bx-x align-middle" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;