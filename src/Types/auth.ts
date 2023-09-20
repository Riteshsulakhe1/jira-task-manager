
export interface LoginReqBody {
    email: string;
    password: string;
}

export interface GetLoggedInUserBody {
    refreshToken: string;
}

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: string;
    orgId: string;
    isEmailVerified: boolean;
    invitedBy: string;
}

export interface UserToken {
    access: {
        token: string;
        expires: Date;
    },
    refresh: {
        token: string;
        expires: Date;
    }
}

export interface InitialState {
    loading: boolean;
    userInfo: UserInfo | null;
    userToken: UserToken | null;
    error: any;
    success: boolean;
    refreshingAuth: boolean;
}