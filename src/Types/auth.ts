
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

export enum UserDetailsKey {
    NAME = 'name',
    EMAIL = 'email',
    PASSWORD = 'password',
    CONFIRM_PASSWORD = 'confirmPassword'
}

export interface UserDetailsBody {
    name: string;
    email: string;
    password: string;
}

export interface UserDetails extends UserDetailsBody {
    confirmPassword: string;
}

export interface LogoutRequest {
    refreshToken: string;
}

export interface RefreshAuthTokenBody {
    refreshToken: string;
}

export const REFRESH_TOKENS_URL = '/auth/refresh-tokens';