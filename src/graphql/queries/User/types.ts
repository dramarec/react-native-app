
export interface Background {
    type: string;
    value: string | string[];
}

export interface StyleOverride {
    background: Background;
    moduleShadowColor: Background
}

export interface Community {
    id: string;
    name: string;
    styleOverride: StyleOverride | null;
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