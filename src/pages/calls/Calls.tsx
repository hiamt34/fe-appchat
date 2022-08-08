/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../app/user/userSlice';
import CardFile from './components/CardFile';
import './style.css'
const Profile = () => {
    const user = useAppSelector(selectUser);

    return (
        <div className="active" >
            {/* Start profile content */}
            <div>
                <div className="user-profile-img">
                    <img src={
                        user?.photo ||
                        "https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-vui-ve.jpg"
                    } className="profile-img" style={{ height: 160 }} />
                    <div className="overlay-content">
                        <div>
                            <div className="user-chat-nav p-2 ps-3">
                                <div className="d-flex w-100 align-items-center">
                                    <div className="flex-grow-1">
                                        <h5 className="text-white mb-0">My Profile</h5>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <div className="dropdown">
                                            <button className="btn nav-btn text-white dropdown-toggle" type="button">
                                                <i className="bx bx-dots-vertical-rounded" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center p-3 p-lg-4 border-bottom pt-2 pt-lg-2 mt-n5 position-relative">
                    <div className="mb-lg-3 mb-2">
                        <img src={
                            user?.photo ||
                            "https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-vui-ve.jpg"
                        } className="rounded-circle avatar-lg img-thumbnail" />
                    </div>
                    <h5 className="font-size-16 mb-1 text-truncate">{user?.name}</h5>
                    <p className="text-muted font-size-14 text-truncate mb-0">{user?.role}</p>
                </div>
                {/* End profile user */}
                {/* Start user-profile-desc */}
                <div className="p-4 profile-desc">
                    <div className="text-muted">
                        <p className="mb-4">
                            Fronend: React | Typescript | Redux | ReduxSaga | MateriaUI
                        </p>
                    </div>
                    <div>
                        <div className="d-flex py-2">
                            <div className="flex-shrink-0 me-3">
                                <i className="bx bx-user align-middle text-muted" />
                            </div>
                            <div className="flex-grow-1">
                                <p className="mb-0">{user?.name}</p>
                            </div>
                        </div>
                        <div className="d-flex py-2">
                            <div className="flex-shrink-0 me-3">
                                <i className="bx bx-message-rounded-dots align-middle text-muted" />
                            </div>
                            <div className="flex-grow-1">
                                <p className="mb-0">{user?.email}</p>
                            </div>
                        </div>
                        <div className="d-flex py-2">
                            <div className="flex-shrink-0 me-3">
                                <i className="bx bx-location-plus align-middle text-muted" />
                            </div>
                            <div className="flex-grow-1">
                                <p className="mb-0">{user?.authType}</p>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />

                    <div>
                        <div>
                            <h5 className="font-size-11 text-muted text-uppercase mb-3">Attached Files</h5>
                        </div>
                        <div>
                            <CardFile />
                        </div>
                    </div>
                </div>
                {/* end user-profile-desc */}
            </div>
            {/* End profile content */}
        </div>

    );
};

export default Profile;