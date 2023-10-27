import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { UserDetails, UserDetailsBody, UserDetailsKey } from '../Types/auth';
import { Button, Grid, Link, Typography } from '@mui/material';
import { RouteKeys } from '../navigation/routekeys';

const userDetailsInitials: UserDetails = {
    [UserDetailsKey.NAME]: '',
    [UserDetailsKey.EMAIL]: '',
    [UserDetailsKey.PASSWORD]: '',
    [UserDetailsKey.CONFIRM_PASSWORD]: ''
};
export default function Register() {
    const [userDetails, setUserDetails] = useState(userDetailsInitials);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserDetails(prev => ({
            ...prev,
            [event.target.id]: event.target.value
        }));
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1, width: '40ch',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                },
            }}
            noValidate
            autoComplete="off"
        >
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <TextField
                label="Name"
                id={UserDetailsKey.NAME}
                variant="standard"
                value={userDetails.name}
                onChange={handleInputChange}
            />
            <TextField
                label="Email"
                id={UserDetailsKey.EMAIL}
                variant="standard"
                value={userDetails.email}
                onChange={handleInputChange}
            />
            <TextField
                label="Password"
                id={UserDetailsKey.PASSWORD}
                variant="standard"
                value={userDetails.password}
                onChange={handleInputChange}
            />
            <TextField
                label="Confirm Password"
                id={UserDetailsKey.CONFIRM_PASSWORD}
                variant="standard"
                value={userDetails.confirmPassword}
                onChange={handleInputChange}
            />
            <Button fullWidth={true} variant='contained' color='secondary'>
                {'Register'}
            </Button>
            <Grid item={true}>
                <Link href={RouteKeys.login} variant="body2">
                    {"Already have an account ?"}
                </Link>
            </Grid>
        </Box>
    );
};