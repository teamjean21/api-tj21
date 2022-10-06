export interface BaseUser {
    name: string;
    image: string;
}

export interface User extends BaseUser {
    id: number;
}