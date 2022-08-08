import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Slide, { SlideProps } from '@mui/material/Slide';
import { alertAction, selectMessage, selectOpen, selectType } from "../../app/alert/alertSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

type TransitionProps = Omit<SlideProps, 'direction'>;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props: TransitionProps) {
    return <Slide {...props} direction="left" />;
}

export const CustomizedAlert = () => {

    const type = useAppSelector(selectType);
    const message = useAppSelector(selectMessage);
    const open = useAppSelector(selectOpen);
    const dispatch = useAppDispatch();
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(alertAction.changeOpen())
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            TransitionComponent={TransitionLeft}
        >
            <Alert severity={type} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
