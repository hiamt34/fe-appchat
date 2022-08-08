/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { CustomizedAlert } from '../components/Alert';
interface LayoutProps {
    children: React.ReactNode
}
const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="auth-bg">
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-xl-3 col-lg-4">
                        <div className="p-4 pb-0 p-lg-5 pb-lg-0 auth-logo-section">
                            <div className="text-white-50">
                                <h3><a href="index.html" className="text-white"><i className="bx bxs-message-alt-detail align-middle text-white h3 mb-1 me-2" /> React chat</a></h3>
                            </div>
                            <div className="mt-auto">
                                <img src="assets/images/auth-img.png" className="auth-img" />
                            </div>
                        </div>
                    </div>
                    {/* end col */}
                    <div className="col-xl-9 col-lg-8">
                        <div className="authentication-page-content">
                            <div className="d-flex flex-column h-100 px-4 pt-4">
                                <div className="row justify-content-center my-auto">
                                    <div className="col-sm-8 col-lg-6 col-xl-5 col-xxl-4">
                                        <div className="py-md-5 py-4">
                                            <CustomizedAlert />
                                            {children}
                                        </div>
                                    </div>{/* end col */}
                                </div>{/* end row */}
                            </div>
                        </div>
                    </div>
                    {/* end col */}
                </div>
                {/* end row */}
            </div>
            {/* end container-fluid */}
        </div>
    );
};

export default AuthLayout;