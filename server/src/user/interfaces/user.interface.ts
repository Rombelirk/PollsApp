
import { Document } from 'mongoose';
import { Task } from '../../task/interfaces/task.interface'
import { Friendship } from '../../friendship/interfaces/friendship.interface'

export interface User extends Document {
    login: string;
    password: string;
    friends: User['_id'][] | User[];
    tasks: Task['_id'][] | Task[];
    friendRequests: Friendship["_id"][] | Friendship[]
}
