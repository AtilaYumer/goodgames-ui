import { IUser } from "./IUser";

export class UserDto implements IUser {

    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public rePassword: string
    ) { };
}