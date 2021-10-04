export interface Background {
    type: string;
    value: string;
}

export interface StyleOverride {
    background: Background;
}

export interface Community {
    id: string;
    name: string;
    styleOverride: StyleOverride;
}

export interface User {
    id: string
    firstName: string
    lastName: string
    username: string
}

export interface Login {
    token: string;
    user: User;
    communities: Community[];
}


export interface Login_Login {
    login: Login;
}