/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { navLinks } from "./navLink";
import "../style/style.css";
import { OverLayContext } from "../../../contexts/OverlayProvider";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { authAction, selectIsLoggedIn } from "../../../app/auth/authSlice";
import { selectUser } from "../../../app/user/userSlice";
const SideMenu = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [mode, setMode] = useState<boolean>(true);
    const isLoggin = useAppSelector(selectIsLoggedIn);
    const changeMode = () => {
        const body = document.getElementsByTagName("body")[0];
        if (!mode) body.setAttribute("data-layout-mode", "dark");
        else body.setAttribute("data-layout-mode", "light");
        setMode(!mode);
    };
    const context = useContext(OverLayContext);
    const toggleChange = () => {
        context.setIsOverlay(!context.isOverlay);
    };

    const logout = () => {

        dispatch(authAction.logout())
    }

    useEffect(() => {
        isLoggin || navigate("/login", { replace: true });
    }, [isLoggin, navigate]);
    const user = useAppSelector(selectUser);
    return (
        <div className="side-menu flex-lg-column">
            <div className="navbar-brand-box">
                <Link to="/" className="logo logo-dark">
                    <Logo />
                </Link>
            </div>
            <div className="flex-lg-column my-0 sidemenu-navigation">
                <ul className="nav nav-pills side-menu-nav">
                    {navLinks.map((element, key) => {
                        return (
                            <li key={key} className="nav-item d-none d-lg-block">
                                <NavLink to={element.path} className="nav-link">
                                    <i className={element.icon} />
                                </NavLink>
                            </li>
                        );
                    })}
                    <li
                        className="nav-item mt-auto"
                        style={{ cursor: "pointer" }}
                        onClick={changeMode}
                    >
                        <a className="nav-link light-dark">
                            <i className="bx bx-moon" />
                        </a>
                    </li>
                    <li
                        className="nav-item dropdown profile-user-dropdown"
                        onClick={toggleChange}
                        style={{ cursor: "pointer" }}
                    >
                        <a className="nav-link dropdown-toggle">
                            <img
                                src={
                                    user?.photo ||
                                    "https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-vui-ve.jpg"
                                }
                                className="profile-user rounded-circle"
                            />
                        </a>
                        <div
                            className={
                                context.isOverlay ? "dropdown-menu show" : "dropdown-menu"
                            }
                        >
                            <Link to="/profile" className="dropdown-item d-flex align-items-center justify-content-between">
                                Profile <i className="bx bx-user-circle text-muted ms-1" />
                            </Link>
                            <Link to="settings" className="dropdown-item d-flex align-items-center justify-content-between">
                                Setting <i className="bx bx-cog text-muted ms-1" />
                            </Link>
                            <a className="dropdown-item d-flex align-items-center justify-content-between">
                                Change Password
                                <i className="bx bx-lock-open text-muted ms-1" />
                            </a>
                            <div className="dropdown-divider" />
                            <a style={{ cursor: "pointer" }}
                                onClick={logout}
                                className="dropdown-item d-flex align-items-center justify-content-between">
                                Log out <i className="bx bx-log-out-circle text-muted ms-1" />
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideMenu;
