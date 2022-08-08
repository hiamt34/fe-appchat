import { useEffect } from "react";
import { useScript } from "../../../hook/useScript";
import "./style.css"
import jwt_decode from "jwt-decode"
import { useAppDispatch } from "../../../app/hooks";
import { authAction } from "../../../app/auth/authSlice";
const SignWithSocical = () => {
    const dispatch = useAppDispatch();
    function handleCallbackResponse(res: any) {
        const userDecode = jwt_decode(res.credential) as any
        const user = {
            email: userDecode.sub,
            name: userDecode.name,
            photo: userDecode.picture,
            authType: "google"
        }

        dispatch(authAction.oauth(user));
    }
    useScript("https://accounts.google.com/gsi/client", () => {
        /* global google */
        //@ts-ignore
        window.google.accounts.id.initialize({
            client_id:
                "905214752541-78bqptnjcbeqmu1sr43gdpgpkhn0ve2e.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        });
        //@ts-ignore
        window.google.accounts.id.renderButton(
            document.getElementById("btn-gg"),
            {}
        );
    });
    return (
        <div className="mt-4 text-center">
            <div className="signin-other-title">
                <h5 className="font-size-14 mb-4 title">Sign in using</h5>
            </div>
            <div className="row">
                <div className="col-4">
                    <div>
                        <button type="button" className="btn btn-light w-100">
                            <i className="mdi mdi-facebook text-indigo" />
                        </button>
                    </div>
                </div>
                <div className="col-4" style={{ position: 'relative' }}>
                    <div id="btn-gg"></div>
                    <div>
                        <button type="button" className="btn btn-light w-100">
                            <i className="mdi mdi-google text-danger" />
                        </button>
                    </div>
                </div>
                <div className="col-4">
                    <div>
                        <button type="button" className="btn btn-light w-100">
                            <i className="mdi mdi-github text-black" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignWithSocical;
