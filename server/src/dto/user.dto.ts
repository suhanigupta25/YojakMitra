export interface RegisteredUserDTO {
    name: string;
    age: number;
    gender: string;
    username: string;
    email: string;
    password: string;
}

export interface LoginUserDTO {
    username: string;
    password: string;
}
