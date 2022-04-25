import { createReducer, on } from "@ngrx/store";
import { IUser } from "../modules/model/IUser";
import { login, logout } from "./action";

export const currentUserReducer = createReducer<IUser | undefined>(undefined,
    on(login, (_, action) => action.user),
    on(logout, () => undefined)
)