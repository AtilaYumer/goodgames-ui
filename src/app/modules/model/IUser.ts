import { Role } from "./Role";

export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    rePassword: string,
    role: Role | undefined
}