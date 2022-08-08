import { useLocation, Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/Auth";

export function Public({ children }: { children: JSX.Element }) {
    //   let { user } = useAuth();
    let isUser = Boolean(localStorage.getItem('accessToken'))
    let location = useLocation();

    if (isUser) {
        return <Navigate to="/" state={{ from: location }} replace />;
    } else {
        return children;
    }
}