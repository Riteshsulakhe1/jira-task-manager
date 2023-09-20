export const projectKey = '/projects';
export const projectIdParam = 'projectId';

export const RouteKeys = {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    project: projectKey,
}

export const getProjectDetailsRoute = (projectId: string) => {
    return `${projectKey}/${projectId}`;
};

export const getBacklogRoute = (projectId: string) => {
    return `${getProjectDetailsRoute(projectId)}/backlog`;
};

export const getBoardRoute = (projectId: string) => {
    return `${getProjectDetailsRoute(projectId)}/board`;
};