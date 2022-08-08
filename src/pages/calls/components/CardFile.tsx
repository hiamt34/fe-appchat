/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const CardFile = () => {
    return (
        <div className="card p-2 border mb-2">
            <div className="d-flex align-items-center">
                <div className="flex-shrink-0 avatar-xs ms-1 me-3">
                    <div className="avatar-title bg-soft-primary text-primary rounded-circle">
                        <i className="bx bx-file" />
                    </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                    <h5 className="font-size-14 text-truncate mb-1">react-chat.pdf</h5>
                    <p className="text-muted font-size-13 mb-0">12.5 MB</p>
                </div>
                <div className="flex-shrink-0 ms-3">
                    <div className="d-flex gap-2">
                        <div>
                            <a href="#" className="text-muted px-1">
                                <i className="bx bxs-download" />
                            </a>
                        </div>
                        <div className="dropdown">
                            <a className="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="bx bx-dots-horizontal-rounded" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardFile;