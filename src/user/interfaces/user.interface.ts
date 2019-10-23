import { Document } from 'mongoose';

export interface User extends Document {
    _id: string;
    login: string;
    password: string;
    friends: User[];
}
