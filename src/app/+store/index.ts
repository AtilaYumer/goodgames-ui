import { IUser } from "../modules/model/IUser";

export interface IRootState {
    currentUser: IUser | undefined
}