import { Document } from 'mongoose';
import { Task } from '../../task/interfaces/task.interface';

export interface User extends Document {
    _id: string;
    login: string;
    password: string;
}
