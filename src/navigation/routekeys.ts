export const projectKey = '/projects';
export const projectIdParam = 'projectId';

export const RouteKeys = {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    project: projectKey,
    board: '/board',
    backlog: '/backlog',
    createOrg: '/createOrganization',
    createProject: `${projectKey}/create`
};
export const PROJECT_ID_KEY = 'projectId';
export const publicRoutes = [RouteKeys.login, RouteKeys.register, RouteKeys.forgotPassword];

export const getProjectDetailsRoute = (projectId: string) => {
    return `${projectKey}/${projectId}`;
};

export const getBacklogRoute = (projectId: string) => {
    return `${getProjectDetailsRoute(projectId)}${RouteKeys.backlog}`;
};

export const getBoardRoute = (projectId: string) => {
    return `${getProjectDetailsRoute(projectId)}${RouteKeys.board}`;
};

export const getCreateProjectRoute = () => RouteKeys.createProject;