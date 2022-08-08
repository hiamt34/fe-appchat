/* eslint-disable jsx-a11y/anchor-is-valid */
import { Skeleton } from '@mui/material';
import React from 'react';

const SkeletonLoading = () => {
    return (
        <li data-name="favorite" className="">
            <a className="unread-msg-user">
                <div className="d-flex align-items-center">
                    <div className="chat-user-img online align-self-center me-2 ms-0">
                        <Skeleton variant="circular" width={30} height={30} />
                        <span className="user-status" />
                    </div>
                    <div className="overflow-hidden">
                        <Skeleton width={200} />
                    </div>
                    <div className="ms-auto">
                        <span className="badge badge-soft-dark rounded p-1"><Skeleton width={10} height={10} /></span>
                    </div>
                </div>
            </a>
        </li>
    );
};

export default SkeletonLoading;