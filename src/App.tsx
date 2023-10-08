import React, { useEffect } from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PersistentDrawerLeft from "./navigation/drawer";
import { useAppDispatch, useAppSelector } from './hooks';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import AppBar from './navigation/appBar';
import { setAuthHeader, resetAuthHeader } from './Apis/axios';
import { whoIsLoggedIn } from './authentication/auth.effect';
import PublicRoutes from './publicRoutes';
import { getProjectsEffect } from './projects/projects.effect';
import { RouteKeys } from './navigation/routekeys';
import { getTaskStaticPropertiesEffect } from './task/task.effect';

const App = () => {

  const navigate = useNavigate();
  const classes = useStyles();

  const dispatch = useAppDispatch();

  // Redux store state selectors
  const userInfo = useAppSelector(state => state.auth.userInfo);
  const userToken = useAppSelector(state => state.auth.userToken);
  const isRefreshingAuth = useAppSelector(state => state.auth.refreshingAuth);

  useEffect(() => {
    console.log('App@@@@@@@@')
    if (userInfo?.id) return;
    const refresh = localStorage.getItem('st');
    const tokens = refresh ? JSON.parse(refresh) : {};
    if (tokens.access) {
      dispatch(whoIsLoggedIn({ refreshToken: tokens.refresh.token }))
    }
  }, []);

  useEffect(() => {
    if (userInfo?.id) {
      localStorage.setItem('st', JSON.stringify(userToken));
      setAuthHeader(userToken ? userToken?.access.token : '');
      dispatch(getProjectsEffect());
      dispatch(getTaskStaticPropertiesEffect());
    }
    if (!isRefreshingAuth && !userInfo?.id) {
      navigate(RouteKeys.login);
    }
  }, [userInfo, isRefreshingAuth]);

  return (
    <Container classes={{ root: classes.root }}>
      <Grid item={true} xs={12} classes={{ root: classes.nav }}>
        {userInfo?.id && <AppBar />}
      </Grid>
      <Grid container={true} classes={{ root: classes.main }}>
        <Grid item={true} xs={3}>
          {userInfo?.id && <PersistentDrawerLeft />}
        </Grid>
        <Grid item={true} xs={userInfo?.id ? 9 : 12}>
          <div>ToDo</div>
          <div>Replace select with Menu in TaskStatus</div>
          <div>Use status menu options from TaskStaticProps reducer state</div>
          <div>Avoid keeping status menu options in a state at TaskStatus component</div>
          <PublicRoutes />
        </Grid>
      </Grid>
    </Container>
  );
}


const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '100vh'
  },
  nav: {
    height: '10vh'
  },
  drawer: {

  },
  main: {
    height: '90vh',
    width: '100vw'
  }
}));

export default App;
