import React, { useEffect } from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from './hooks';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { setAuthHeader, resetAuthHeader } from './Apis/axios';
import { whoIsLoggedIn } from './authentication/auth.effect';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Redux store state selectors
    const userInfo = useAppSelector(state => state.auth.userInfo);
    const userToken = useAppSelector(state => state.auth.userToken);
    const isRefreshingAuth = useAppSelector(state => state.auth.refreshingAuth);
    const apiController = new AbortController();

    useEffect(() => {
        // if (userInfo?.id) return;
        // console.log('IN HOME');
        // const refresh = localStorage.getItem('st');
        // const tokens = refresh ? JSON.parse(refresh) : {};
        // if (tokens.access) {
        //     dispatch(whoIsLoggedIn({ refreshToken: tokens.refresh.token }))
        // }
    }, []);

    useEffect(() => {
        console.log('Home comp userInfo effect==>');
        // if (!isRefreshingAuth && !userInfo?.id) {
        //     navigate('/login');
        // } else {
        //     localStorage.setItem('st', JSON.stringify(userToken));
        //     setAuthHeader(userToken ? userToken?.access.token : '');
        // }
    }, [userInfo, isRefreshingAuth]);

    return (
        <>At HOME....!!!!</>
    )
}

export default Home;