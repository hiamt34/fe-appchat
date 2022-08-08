/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { roomAction } from "../../app/room/roomSlice";
import { selectLoadding, selectUser, selectUserOnline, selectUsers, userAction } from "../../app/user/userSlice";
import SkeletonContact from "./components/SkeletonContact";
let timer: NodeJS.Timeout | undefined

const Contacts = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser)
    let users = [...useAppSelector(selectUsers)]
    const navigate = useNavigate();
    users = useMemo(() => users.sort(function (
        a: any,
        b: any
    ) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }).filter(u => u._id !== user?._id), [user?._id, users]);

    const isLoadding = useAppSelector(selectLoadding);
    const userOnline = useAppSelector(selectUserOnline);
    const setSearch = (value: string) => {
        dispatch(userAction.searchLoading())

        clearTimeout(timer);

        timer = setTimeout(() => {
            dispatch(userAction.search({
                name: value
            }))
        }, 500)
    }
    const createRoom = (_id: any) => {
        dispatch(roomAction.inserRoom({
            members: [
                user?._id,
                _id
            ]
        }))
        navigate("/", { replace: true })
    }
    return (
        <div className="active">
            {/* Start Contact content */}
            <div>
                <div className="px-4 pt-4">
                    <div className="d-flex align-items-start">
                        <div className="flex-grow-1">
                            <h4 className="mb-4">Contacts</h4>
                        </div>
                    </div>
                    <form>
                        <div className="input-group mb-4">
                            <input
                                type="text"
                                className="form-control bg-light border-0 pe-0"
                                placeholder="Search Contacts.."
                                onChange={(event) => setSearch(event.target.value)}
                            />
                            <button className="btn btn-light" type="button">
                                <i className="bx bx-search align-middle" />
                            </button>
                        </div>
                    </form>
                </div>
                {/* end p-4 */}
                <div className="chat-message-list chat-group-list">
                    <div className="sort-contact">
                        {isLoadding ? (
                            <>
                                <SkeletonContact />
                                <SkeletonContact />
                                <SkeletonContact />
                            </>
                        ) : (
                            users?.map((user, key) => {
                                return (
                                    <div className="mt-3" key={key}>
                                        {users[key].name[0].toUpperCase() !==
                                            users[key - 1]?.name[0].toUpperCase() && (
                                                <div className="contact-list-title">
                                                    {users[key].name[0].toUpperCase()}
                                                </div>
                                            )}
                                        <ul
                                            id="contact-sort-A"
                                            className="list-unstyled contact-list"
                                            onClick={() => createRoom(user._id)}
                                        >
                                            <li>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0 me-2">
                                                        <div className={userOnline.some(u => u.userId === user?._id) ?
                                                            "chat-user-img online align-self-center me-2 ms-0 avatar-xs" :
                                                            "chat-user-img align-self-center me-2 ms-0 avatar-xs"}>
                                                            <img
                                                                src={
                                                                    user.photo ||
                                                                    "https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-vui-ve.jpg"
                                                                }
                                                                className="img-fluid rounded-circle"
                                                            />
                                                            <span className="user-status" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h5 className="font-size-14 m-0">{user.name}</h5>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
                {/* end contact lists */}
            </div>
            {/* Start Contact content */}
        </div>
    );
};

export default Contacts;
