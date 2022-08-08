/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

const Setting = () => {
    return (
        <div className="active" >
            {/* Start Settings content */}
            <div>
                <div className="user-profile-img">
                    <img src="assets/images/small/img-4.jpg" className="profile-img profile-foreground-img" style={{ height: 160 }} />
                    <div className="overlay-content">
                        <div>
                            <div className="user-chat-nav p-3">
                                <div className="d-flex w-100 align-items-center">
                                    <div className="flex-grow-1">
                                        <h5 className="text-white mb-0">Settings</h5>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <div className="avatar-xs p-0 rounded-circle profile-photo-edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" title="Change Background">
                                            <input id="profile-foreground-img-file-input" type="file" className="profile-foreground-img-file-input" />
                                            <label htmlFor="profile-foreground-img-file-input" className="profile-photo-edit avatar-xs">
                                                <span className="avatar-title rounded-circle bg-light text-body">
                                                    <i className="bx bxs-pencil" />
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center p-3 p-lg-4 border-bottom pt-2 pt-lg-2 mt-n5 position-relative">
                    <div className="mb-3 profile-user">
                        <img src="assets/images/users/avatar-1.jpg" className="rounded-circle avatar-lg img-thumbnail user-profile-image" alt="user-profile-image" />
                        <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                            <input id="profile-img-file-input" type="file" className="profile-img-file-input" />
                            <label htmlFor="profile-img-file-input" className="profile-photo-edit avatar-xs">
                                <span className="avatar-title rounded-circle bg-light text-body">
                                    <i className="bx bxs-camera" />
                                </span>
                            </label>
                        </div>
                    </div>
                    <h5 className="font-size-16 mb-1 text-truncate" />
                    <div className="dropdown d-inline-block">
                        <a className="text-muted dropdown-toggle d-block" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="bx bxs-circle text-success font-size-10 align-middle" /> Active <i className="mdi mdi-chevron-down" />
                        </a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#"><i className="bx bxs-circle text-success font-size-10 me-1 align-middle" /> Active</a>
                            <a className="dropdown-item" href="#"><i className="bx bxs-circle text-warning font-size-10 me-1 align-middle" /> Away</a>
                            <a className="dropdown-item" href="#"><i className="bx bxs-circle text-danger font-size-10 me-1 align-middle" /> Do not disturb</a>
                        </div>
                    </div>
                </div>
                {/* End profile user */}
                {/* Start User profile description */}
                <div className="user-setting" data-simplebar>
                    <div id="settingprofile" className="accordion accordion-flush">
                        <div className="accordion-item">
                            <div className="accordion-header" id="headerpersonalinfo">
                                <button className="accordion-button font-size-14 fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#personalinfo" aria-expanded="true" aria-controls="personalinfo">
                                    <i className="bx bxs-user text-muted me-3" /> Personal Info
                                </button>
                            </div>
                            <div id="personalinfo" className="accordion-collapse collapse show" aria-labelledby="headerpersonalinfo" data-bs-parent="#settingprofile">
                                <div className="accordion-body">
                                    <div className="float-end">
                                        <button type="button" className="btn btn-soft-primary btn-sm"><i className="bx bxs-pencil align-middle" /></button>
                                    </div>
                                    <div>
                                        <p className="text-muted mb-1">Name</p>
                                        <h5 className="font-size-14">Adam Zampa</h5>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-muted mb-1">Email</p>
                                        <h5 className="font-size-14">adc@123.com</h5>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-muted mb-1">Location</p>
                                        <h5 className="font-size-14 mb-0">California, USA</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end profile-setting-accordion */}
                </div>
                {/* End User profile description */}
            </div>
            {/* Start Settings content */}
        </div>

    );
};

export default Setting;