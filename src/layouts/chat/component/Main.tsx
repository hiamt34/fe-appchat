import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
    return (
        <div
            className="user-chat w-100 overflow-hidden"
            id="user-chat"
            style={{
                backgroundImage:
                    'url("/assets/images/bg-pattern/pattern-05.png")',
            }}
        >
            <div className="user-chat-overlay" id="user-chat-overlay" />
            <div className="chat-welcome-section">
                <div className="w-100 justify-content-center row">
                    <div className="col-md-7">
                        <div className="p-4 text-center">
                            <div className="avatar-xl mx-auto mb-4">
                                <div className="avatar-title bg-soft-primary rounded-circle">
                                    <i className="bx bxs-message-alt-detail display-4 text-primary m-0" />
                                </div>
                            </div>
                            <h4>Welcome to React Chat App</h4>
                            <p className="text-muted mb-1">
                                Fronend: React | Typescript | Redux | ReduxSaga | MateriaUI
                            </p>
                            <p className="text-muted mb-1">
                                Backend: Microservice | NodeJS | Typescript | Express | RestApi | GRPC | Redis | Moongodb | RabitMQ | Socket.io
                            </p>
                            <p className="text-muted mb-1">
                                Depop: Docker | K8s | Gitlap | CICD
                            </p>
                            <Link to="/">
                                <button
                                    type="button"
                                    className="btn btn-primary w-lg btn btn-secondary"
                                >
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
