import { Skeleton } from '@mui/material';
import React from 'react';

const SkeletonContact = () => {
    return (
        <div className="mt-3">
            <div className="contact-list-title"><Skeleton variant="text" /></div>
            <ul id="contact-sort-A" className="list-unstyled contact-list">
                <li>
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-2">
                            <div className="avatar-xs">
                                <Skeleton variant="circular" width={30} height={30} />
                            </div>
                        </div>
                        <div className="flex-grow-1">
                            <Skeleton width={200} />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default SkeletonContact;