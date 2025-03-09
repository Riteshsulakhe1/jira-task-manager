import React, { useEffect } from 'react';
import './App.css';
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
import { RouteKeys, getBoardRoute, publicRoutes } from './navigation/routekeys';
import { getTaskStaticPropertiesEffect } from './task/task.effect';
import { useLocation } from 'react-router-dom';
import { selectProject } from './projects/projects.slice';
import { UserInfo } from './Types/auth';
import Loading from './common/loading';

const App = () => {

  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();

  const dispatch = useAppDispatch();

  // Redux store state selectors
  const userInfo: UserInfo | null = useAppSelector(state => state.auth.userInfo);
  const userToken = useAppSelector(state => state.auth.userToken);
  const isRefreshingAuth = useAppSelector(state => state.auth.refreshingAuth);
  const projects = useAppSelector(state => state.project.data || []);

  const mongoIdRegex = /^[0-9a-fA-F]{24}$/;

  useEffect(() => {
    onInit();
  }, []);

  useEffect(() => {
    console.log('onLoggedInUserRetrived==>', userInfo, isRefreshingAuth);
    onLoggedInUserRetrived();
  }, [userInfo, isRefreshingAuth]);


  useEffect(() => {
    onProjectsFetched();
  }, [projects]);

  const onInit = () => {
    storeCurrentLocation();
    if (!userInfo?.id) {
      console.log('retriveLoggedInUser==>',);
      retriveLoggedInUser();
    }
  };

  const storeCurrentLocation = () => {
    if (!isPublicRoute()) {
      localStorage.setItem('location', JSON.stringify(location));
    }
  };

  const retriveLoggedInUser = () => {
    const refresh = localStorage.getItem('st') || '';
    const tokens = refresh ? JSON.parse(refresh) : {};
    if (tokens?.access) {
      dispatch(whoIsLoggedIn({ refreshToken: tokens.refresh.token }))
    }
  };

  const onLoggedInUserRetrived = () => {
    if (isRefreshingAuth) return;
    console.log('userInfo==>', userInfo);
    if (!userInfo?.id) {
      navigateToLogin();
    } else {
      storeToken();
      setTokenAuthHeader();
      if (!userInfo?.orgId) {
        gotoCreateOrgPage();
      } else {
        afterRetriveUserInfo();
      }
    }
  };

  const gotoCreateOrgPage = () => {
    navigate(RouteKeys.createOrg);
  };

  const storeToken = () => {
    console.log('storeToken userToken==>', userToken);
    localStorage.setItem('st', JSON.stringify(userToken));
  };

  const setTokenAuthHeader = () => {
    console.log('setTokenAuthHeader userToken==>', userToken);
    setAuthHeader(userToken ? userToken?.access.token : '');
  };

  const afterRetriveUserInfo = () => {
    fetchProjects();
    restorePreviousLocation();
    fetchTaskStaticProperties();
  };

  const fetchProjects = () => {
    dispatch(getProjectsEffect());
  };

  const fetchTaskStaticProperties = () => {
    dispatch(getTaskStaticPropertiesEffect());
  };

  const restorePreviousLocation = () => {
    const previousLocation = JSON.parse(localStorage.getItem('location') || '{}');
    console.log('previousLocation==>', previousLocation);
    if (isPathValid(previousLocation?.pathname)) {
      navigate(previousLocation.pathname);
      localStorage.removeItem('location');
    } else if (userInfo?.id) {
      navigateToProjects();
    } else {
      navigateToLogin();
    }
  };

  const onProjectsFetched = () => {
    console.log('projects==>', projects);
    if (projects?.length === 0) return;
    const currentRouteProjectId = getRouteProjectId();
    if (currentRouteProjectId) {
      selectProjectByCurrentProjectId(currentRouteProjectId);
    } else {
      setDefaultProject();
    }
  }

  const getRouteProjectId = () => {
    const projectId = location.pathname.split('/').filter((path: string) => {
      return path.match(mongoIdRegex);
    });
    return projectId.length ? projectId[0] : '';
  };

  const selectProjectByCurrentProjectId = (routeProjectId: string) => {
    const selectedProject = projects.find(project => project.id === routeProjectId);
    dispatch(selectProject(selectedProject));
  };

  /**
   * If no project selected then selects the first one and navigate to board
   */
  const setDefaultProject = () => {
    dispatch(selectProject(projects[0]));
    navigateToBoard(projects[0].id);
  }

  const isPathValid = (path: string) => {
    return path && (path !== '/' || path !== RouteKeys.login);
  };

  const navigateToProjects = () => {
    navigate(RouteKeys.project);
  };

  const navigateToLogin = () => {
    if (!isRefreshingAuth && !userInfo?.id && !isPublicRoute()) {
      console.log('navigating to login $$$$$$$$$$$$')
      navigate(RouteKeys.login);
    }
  };

  const navigateToBoard = (projectId: string) => {
    navigate(getBoardRoute(projectId));
  }

  const isPublicRoute = () => {
    const path = location.pathname;
    return publicRoutes.indexOf(path) >= 0 || path === '/';
  };

  return (
    <Grid container={true} xs={12} classes={{ root: classes.root }}>
      {
        isRefreshingAuth ? <Loading /> :
          (
            <>
              <Grid item={true} xs={12} classes={{ root: classes.nav }}>
                {userInfo?.id && <AppBar />}
              </Grid>
              <Grid container={true} classes={{ root: classes.main }}>
                <Grid item={true} xs={2}>
                  {userInfo?.id && <PersistentDrawerLeft />}
                </Grid>
                <Grid item={true} xs={userInfo?.id ? 10
                  : 12} classes={{ root: classes.routeContainer }}>
                  <PublicRoutes />
                </Grid>
              </Grid>
            </>
          )
      }

    </Grid>
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
    width: '100vw',
    overflow: 'hidden'
  },
  routeContainer: {
    // paddingTop: '1rem'
  }
}));

export default App;
