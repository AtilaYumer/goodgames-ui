import { IUser } from "./IUser";
import { Role } from "./Role";

export class UserDto implements IUser {

    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public rePassword: string,
        public role: Role | undefined
    ) { };
}