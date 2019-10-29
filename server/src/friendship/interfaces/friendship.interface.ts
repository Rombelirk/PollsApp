import { Document } from 'mongoose';
import { User } from '../../user/interfaces/user.interface';
import { FriendshipStatus } from '../enums/friendshipStatus.enum';

export interface Friendship extends Document {
    recipient: User['_id'] | User;
    requester: User['_id'] | User;
    status: FriendshipStatus;
    requested_date: Date;
    accepted_date: Date;
    declined_date: Date;
}
