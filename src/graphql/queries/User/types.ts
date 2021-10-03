
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
    email: string
    username: string
    firstName: string
    lastName: string
    role: string
    communitiesWhereMember: Community[]
}

export interface User_User {
    user: User
}