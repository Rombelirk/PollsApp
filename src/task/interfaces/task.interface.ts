import { User } from './../../user/interfaces/user.interface';
import { Document } from 'mongoose';

export interface Task extends Document {
    _id: string;
    title: string;
    assignees: User[];
    author: User;
    create_date: Date;
    deadline: Date;
    description: string;
    imageURL: string;
}
