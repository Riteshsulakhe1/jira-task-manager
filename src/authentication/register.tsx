import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { UserDetails, UserDetailsBody, UserDetailsKey } from '../Types/auth';
import { Button, Grid, Link, Typography } from '@mui/material';
import { RouteKeys } from '../navigation/routekeys';
import { useAppSelector, useAppDispatch } from '../hooks';
import Loading from '../common/loading';
import SnackbarAlert from '../common/snackbar';
import { SnackbarInfo } from '../Types/common';
import { registerEffect } from './auth.effect';
import { useNavigate } from 'react-router-dom';

const userDetailsInitials: UserDetails = {
    [UserDetailsKey.NAME]: '',
    [UserDetailsKey.EMAIL]: '',
    [UserDetailsKey.PASSWORD]: '',
    [UserDetailsKey.CONFIRM_PASSWORD]: ''
};
export default function Register() {

    const [userDetails, setUserDetails] = useState(userDetailsInitials);
    const [snackbar, setSnackbar] = useState<SnackbarInfo>({ message: '', severity: 'success' });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const disptach = useAppDispatch();
    const navigate = useNavigate();
    const { loading, userInfo, error } = useAppSelector(state => state.auth);

    useEffect(() => {
        if (userInfo) {
            setSnackbar({ message: 'You have registered successfully.' });
            navigate(RouteKeys.createOrg);
        }
    }, [userInfo]);

    useEffect(() => {
        setSnackbar({ message: error?.message, severity: 'error' });
    }, [error]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserDetails(prev => ({
            ...prev,
            [event.target.id]: event.target.value
        }));
        setIsFormSubmitted(false);
    };

    const onSubmit = () => {
        setIsFormSubmitted(true);
        if (!userDetails.name || !userDetails.email || !userDetails.password || !userDetails.confirmPassword) {
            setSnackbar({ message: 'Please fill all the fields properly.', severity: 'error' });
            return;
        }
        if (userDetails.password === userDetails.confirmPassword) {
            const body: UserDetailsBody = {
                name: userDetails.name,
                email: userDetails.email,
                password: userDetails.password
            };
            disptach(registerEffect(body));
        } else {
            setSnackbar({ message: 'Password and confirm password mismatch.', severity: 'error' });
        }
    };

    const onCloseSnackbar = () => {
        setSnackbar({ message: '' });
    };

    const getValidationErr = (field: UserDetailsKey) => {
        if (isFormSubmitted && !userDetails[field]) {
            return `Please enter ${field}.`;
        } else {
            return '';
        }
    };

    return (
        <Grid container={true} justifyContent={'center'}>
            <Box
                component="form"
                sx={{
                    width: '50vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > :not(style)': {
                        m: 1,
                        width: '100%',
                    },
                }}
                noValidate
                autoComplete="off"
            >
                <SnackbarAlert {...snackbar} onClose={onCloseSnackbar} />
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Grid item={true} xs={12}>
                    <TextField
                        label="Name"
                        id={UserDetailsKey.NAME}
                        variant="standard"
                        value={userDetails.name}
                        onChange={handleInputChange}
                        sx={{ width: '100%' }}
                        error={isFormSubmitted && !userDetails.name}
                        helperText={getValidationErr(UserDetailsKey.NAME)}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <TextField
                        label="Email"
                        id={UserDetailsKey.EMAIL}
                        variant="standard"
                        value={userDetails.email}
                        onChange={handleInputChange}
                        sx={{ width: '100%' }}
                        error={isFormSubmitted && !userDetails.email}
                        helperText={getValidationErr(UserDetailsKey.EMAIL)}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <TextField
                        label="Password"
                        id={UserDetailsKey.PASSWORD}
                        variant="standard"
                        value={userDetails.password}
                        onChange={handleInputChange}
                        sx={{ width: '100%' }}
                        error={isFormSubmitted && !userDetails.password}
                        helperText={getValidationErr(UserDetailsKey.PASSWORD)}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <TextField
                        label="Confirm Password"
                        id={UserDetailsKey.CONFIRM_PASSWORD}
                        variant="standard"
                        value={userDetails.confirmPassword}
                        onChange={handleInputChange}
                        sx={{ width: '100%' }}
                        error={isFormSubmitted && !userDetails.confirmPassword}
                        helperText={getValidationErr(UserDetailsKey.CONFIRM_PASSWORD)}
                    />
                </Grid>
                <Button variant='contained' color='secondary' onClick={onSubmit}>
                    {loading ? <Loading size={15} /> : 'Register'}
                </Button>
                <Grid item={true}>
                    <Link href={RouteKeys.login} variant="body2">
                        {"Already have an account ?"}
                    </Link>
                </Grid>
            </Box>
        </Grid>
    );
};