import { useLocation, Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/Auth";

export function RequireAuth({ children }: { children: JSX.Element }) {
    //   let { user } = useAuth();
    let isUser = Boolean(localStorage.getItem('accessToken'))
    let location = useLocation();

    if (!isUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    } else {
        return children;
    }
}