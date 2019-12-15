import { User } from './../../user/interfaces/user.interface';
import { Document } from 'mongoose';

export interface Option {
    _id: string, option: string
}

export interface Vote {
    user: User['_id'] | User, optionId: string
}

export interface Poll extends Document {
    title: string;
    votes: Vote[]
    options: Option[]
    author: User['_id'] | User;
    create_date: Date;
}
