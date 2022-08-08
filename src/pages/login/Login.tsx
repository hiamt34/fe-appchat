/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */

import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { alertAction } from "../../app/alert/alertSlice";
import {
    authAction,
    selectIsLoggedIn,
    selectLogging,
} from "../../app/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RegisterPayload } from "../../interface/auth";
import { validateLogin } from "../../validate/validate";
import SignWithSocical from "./components/SignWithSocical";
const Login = () => {
    const [isPass, setIsPass] = useState(true);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const isLoggin = useAppSelector(selectIsLoggedIn);
    const isLoading = useAppSelector(selectLogging);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const HandleLogin = () => {
        const data = {
            email,
            password,
        };
        validateLogin
            .validate(data)
            .then(() => {
                dispatch(authAction.login(data));
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

    const LoginWithoutAccount = () => {
        const data = {
            email: window.crypto.randomUUID() + '@xxx.xxx',
            password: window.crypto.randomUUID(),
            name: 'Anonymous',
        } as RegisterPayload;
        dispatch(authAction.register(data));
    }

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading as boolean}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="text-center mb-5">
                <h3>Welcome React chat !</h3>
                <p className="text-muted">Sign in to continue.</p>
            </div>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    HandleLogin();
                }}
            >
                <div className="mb-3">
                    <label className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <div className="float-end">
                        <a className="text-muted">Forgot password?</a>
                    </div>
                    <label className="form-label">
                        Password
                    </label>
                    <div className="position-relative auth-pass-inputgroup mb-3">
                        <input
                            type={isPass ? "password" : "text"}
                            className="form-control pe-5"
                            placeholder="Enter Password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <button
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                            type="button"
                            id="password-addon"
                        >
                            <i
                                className="ri-eye-fill align-middle"
                                onClick={() => setIsPass(!isPass)}
                            />
                        </button>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <button className="btn btn-primary w-100" type="submit">
                        Log In
                    </button>
                </div>
                <div className="text-center mt-2">
                    <button className="btn btn-info w-100" type="button" onClick={LoginWithoutAccount}>
                        Join Without Account
                    </button>
                </div>
                <SignWithSocical />
            </form>
            {/* end form */}
            <div className="mt-5 text-center text-muted">
                <p>
                    Don't have an account ?{" "}
                    <Link to="/register" className="fw-medium text-decoration-underline">
                        {" "}
                        Register
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Login;
