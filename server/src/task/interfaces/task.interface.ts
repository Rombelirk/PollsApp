import { User } from './../../user/interfaces/user.interface';
import { Document } from 'mongoose';

export interface Task extends Document {
    title: string;
    assignees: User['_id'][] | User[];
    author: User['_id'] | User;
    create_date: Date;
    deadline: Date;
    description: string;
    imageURL: string;
}
