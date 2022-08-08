import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { alertAction } from '../../app/alert/alertSlice';
import { authAction, selectIsLoggedIn } from '../../app/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { validateRegister } from '../../validate/validate';
import SignWithSocical from '../login/components/SignWithSocical';

const Register = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const isLoggin = useAppSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const HandleLogin = () => {
        const data = {
            email,
            password,
            name,
            confirmPassword
        };
        validateRegister
            .validate(data)
            .then(() => {
                dispatch(authAction.register(data));
            })
            .catch((error) => {
                dispatch(
                    alertAction.changeMessage({
                        message: error.message,
                        type: "error",
                    })
                );
            });
    };
    useEffect(() => {
        isLoggin && navigate("/", { replace: true });
    }, [isLoggin, navigate]);
    return (
        <>
            <div>
                <div className="text-center mb-5">
                    <h3>Register Account</h3>
                </div>
                <form className="needs-validation"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        HandleLogin();
                    }}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
                        <div className="invalid-feedback">
                            Please Enter Email
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" placeholder="Enter Username" onChange={(event) => setName(event.target.value)} />
                        <div className="invalid-feedback">
                            Please Enter Username
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={(event) => setPassword(event.target.value)} />
                        <div className="invalid-feedback">
                            Please Enter Password
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" placeholder="Enter ConfirmPassword" onChange={(event) => setConfirmPassword(event.target.value)} />
                        <div className="invalid-feedback">
                            Please Enter Confirm Password
                        </div>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary w-100 waves-effect waves-light" type="submit">Register</button>
                    </div>
                    <SignWithSocical />
                </form>{/* end form */}
                <div className="mt-5 text-center text-muted">
                    <p>Already have an account ? <Link to="/login" className="fw-medium text-decoration-underline">Login</Link></p>
                </div>
            </div>

        </>
    );
};

export default Register;