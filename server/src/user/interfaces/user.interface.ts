import { Document } from 'mongoose';
import { Poll } from '../../poll/interfaces/poll.interface';
import { Friendship } from '../../friendship/interfaces/friendship.interface';

export interface User extends Document {
    login: string;
    password: string;
    friends: User['_id'][] | User[];
    currentPoll: Poll['_id'] | Poll;
    pollHistory: Poll['_id'][] | Poll[];
    friendRequests: Friendship['_id'][] | Friendship[];
}
