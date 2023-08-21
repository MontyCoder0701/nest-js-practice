import { User } from "src/auth/models/user.interface";

export interface Todo {
    id?: number;
    title?: string;
    text?: string;
    date?: Date;
    user?: User;
}
