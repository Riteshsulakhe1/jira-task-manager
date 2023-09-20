import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
    message: string;
    duration?: number;
    onClose: () => void;
    severity?: 'success' | 'error';
}

const defaultDuration: number = 5000; // 5sec
export default function SnackbarAlert(props: Props) {
    console.log('props in snack', props);
    const {
        message,
        duration = defaultDuration,
        onClose,
        severity = 'success'
    } = props;

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose();
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={message ? true : false} autoHideDuration={duration} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
