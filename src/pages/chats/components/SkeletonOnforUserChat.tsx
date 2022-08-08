import { Skeleton } from '@mui/material';
import React from 'react';

const SkeletonOnforUserChat = () => {
    return (
        <div id="users-chat" className="position-relative">
            <div className="p-3 p-lg-4 user-chat-topbar">
                <div className="row align-items-center">
                    <div className="col-sm-4 col-8">
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                        <Skeleton variant="circular" width={50} height={50} />
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h6 className="text-truncate mb-0 font-size-18">
                                            <Skeleton width={200} />
                                        </h6>
                                        <Skeleton width={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8 col-4">
                        <ul className="list-inline user-chat-nav text-end mb-0">
                            <li className="list-inline-item">
                                <Skeleton variant="circular" width={40} height={40} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* end chat user head */}
            {/* start chat conversation */}
            <div className="chat-conversation p-3 p-lg-4 " id="chat-conversation" data-simplebar>
                <ul className="list-unstyled chat-conversation-list" id="users-conversation">
                    <li className="chat-list left" >
                        <div className="conversation-list">
                            <div className="chat-avatar">
                                <Skeleton variant="circular" width={30} height={30} />
                            </div>
                            <div className="user-chat-content">
                                <div className="ctext-wrap">
                                    <div className="ctext-wrap-content" >
                                        <div className="replymessage-block mb-0 d-flex align-items-start">
                                            <div className="flex-grow-1">
                                                <Skeleton width={100} />
                                                <Skeleton width={400} />
                                            </div>
                                        </div>
                                        <Skeleton width={100} />
                                    </div>
                                </div>
                                <div className="ctext-wrap">
                                    <div className="ctext-wrap-content" >
                                        <Skeleton width={100} />
                                    </div>
                                </div>
                                <div className="conversation-name">
                                    {/* <small className="text-muted time">10:07 am</small> */}
                                    <Skeleton width={50} />
                                    <span className="text-success check-message-icon">
                                        <i className="bx bx-check-double" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="chat-list right" >
                        <div className="conversation-list">
                            <div className="user-chat-content">
                                <div className="ctext-wrap">
                                    <div className="ctext-wrap-content" >
                                        <div className="replymessage-block mb-0 d-flex align-items-start">
                                            <div className="flex-grow-1">
                                                <Skeleton width={100} />
                                                <Skeleton width={400} />
                                            </div>

                                        </div>
                                        <Skeleton width={300} />
                                    </div>
                                </div>
                                <div className="conversation-name">
                                    <Skeleton width={50} />
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SkeletonOnforUserChat;