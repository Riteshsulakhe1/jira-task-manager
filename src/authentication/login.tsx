import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signin } from './auth.effect';
import { useAppDispatch, useAppSelector } from '../hooks';
import { LoginReqBody } from '../Types/auth';
import { useNavigate } from 'react-router-dom';
import Loading from '../common/loading';
import { RouteKeys } from '../navigation/routekeys';
import SnackbarAlert from '../common/snackbar';
import { SnackbarInfo } from '../Types/common';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { userInfo, loading, error } = useAppSelector(state => state.auth);

    const [snackbar, setSnackbar] = useState<SnackbarInfo>({ message: '', severity: 'success' });
    const [details, setDetails] = useState({ email: '', password: '' });

    useEffect(() => {
        setSnackbar({ message: error?.message, severity: error ? 'error' : 'success' });
    }, [error]);

    useEffect(() => {
        console.log('userInfo==>', userInfo);
        if (userInfo && !userInfo.orgId) {
            navigate(RouteKeys.createOrg);
        } else if (userInfo?.id) {
            navigate(RouteKeys.project);
        }
    }, [userInfo, navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        const credentials: LoginReqBody = {
            email: data.get('email') as string,
            password: data.get('password') as string
        }
        dispatch(signin(credentials));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDetails(prev => ({
            ...prev,
            [event.target.id]: event.target.value
        }));
    };

    const onCloseSnackbar = () => {
        setSnackbar({ message: '' });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <SnackbarAlert {...snackbar} onClose={onCloseSnackbar} />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={details.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={details.password}
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? <Loading size={15} /> : 'Sign In'}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href={RouteKeys.register} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}