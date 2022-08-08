import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormControlLabel, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser, selectUsers } from '../../../app/user/userSlice';

import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { roomAction } from '../../../app/room/roomSlice';
import { IRoom } from '../../../services/roomService';

export const ModelAddSer = ({
    open,
    handleClose,
    handleOpen
}: {
    open: boolean,
    handleClose: Function,
    handleOpen: Function
}) => {
    const users = useAppSelector(selectUsers)
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch();
    const [members, setMembers] = useState<string[]>([])
    const [name, setName] = useState<string | undefined>(undefined)

    const handleChooseMembers = (e: any) => {
        if (e.target.checked) {
            let data = [...members, e.target.value]
            setMembers(data)
        } else {
            let data = members.filter(m => m !== e.target.value)
            setMembers(data)
        }
    }
    const create = () => {
        const room = {
            name,
            members: [
                ...members,
                user?._id
            ]
        } as unknown as IRoom
        dispatch(roomAction.inserRoom(room))
        setMembers([])
        setName(undefined)
        handleClose()
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={() => handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content modal-header-colored shadow-lg border-0">
                        <div className="modal-header">
                            <h5 className="modal-title text-white font-size-16" >Create Room</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={() => handleClose()}>
                            </button>
                        </div>
                        <div className="modal-body p-4">
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="addgroupname-input" className="form-label">Room Name</label>
                                    <TextField id="outlined-basic" className="form-control" label="Room name" variant="outlined" autoFocus={true} onChange={(event) => setName(event.target.value)} />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Room Members</label>
                                    <div className="mb-3">
                                        {
                                            users.map((u, key) => {
                                                if (u._id !== user?._id) {
                                                    return <FormControlLabel key={key} control={<Checkbox />} label={u.name} value={u._id} onChange={(event) => handleChooseMembers(event)} />
                                                }
                                            })
                                        }

                                    </div>

                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={create}>Create Groups</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
