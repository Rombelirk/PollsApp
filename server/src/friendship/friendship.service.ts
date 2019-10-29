import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Friendship } from './interfaces/friendship.interface';
import { FriendshipStatus } from './enums/friendshipStatus.enum';
import { UserService } from '../user/user.service';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class FriendshipService {
    constructor(
        @InjectModel('Friendship')
        private readonly friendsipModel: Model<Friendship>,
        private readonly userService: UserService
    ) { }

    async getUsersFriendship(userIds: [string, string]): Promise<Friendship | null> {
        return this.friendsipModel.findOne({
            $or: [
                { recipient: userIds[0], requester: userIds[1], status: { $ne: FriendshipStatus.declined } },
                { recipient: userIds[1], requester: userIds[0], status: { $ne: FriendshipStatus.declined } },
            ],
        });
    }

    async createRequest(recipientId: User['_id'], requesterId: User['_id']): Promise<Friendship> {
        if (requesterId === recipientId) {
            throw new Error(`Friendship members cannot be the same user`);
        }

        const existingFriendship = await this.getUsersFriendship([requesterId, recipientId]);

        if (existingFriendship && existingFriendship.status) {
            throw new Error(
                `Users with ids ${requesterId} and ${recipientId} are already friends or have pending friendship request`
            );
        }

        const friendship: Friendship = new this.friendsipModel({
            recipient: recipientId,
            requester: requesterId,
            requested_date: new Date(),
            status: FriendshipStatus.pending,
        });

        return friendship.save();
    }

    async acceptRequest(requestId: Friendship['_id'], userId: User['_id']): Promise<Friendship> {
        const friendship = await this.friendsipModel.findById(requestId);

        if (!friendship) {
            throw new Error(`Failed to find friendship with id ${requestId}`);
        }

        if (friendship.recipient && !friendship.recipient.equals(userId)) {
            throw new Error(`User ${userId} is not allowed to accept request 
            ${requestId} as he is not its recipient`);
        }

        if (friendship.status === FriendshipStatus.accepted) {
            throw new Error(`Friendship ${requestId} is already accepted`);
        }

        friendship.status = FriendshipStatus.accepted;
        return friendship.save();
    }

    async getRecievedRequestsOfUser(userId: User['_id'], status: FriendshipStatus): Promise<Friendship[]> {
        return this.friendsipModel.find({ recipient: userId, status: status || FriendshipStatus.pending });
    }

    async getFriendsOfUser(userId: User['_id']): Promise<User[]> {
        const freindRelations = await this.friendsipModel.find({
            $or: [
                { recipient: userId, status: FriendshipStatus.accepted },
                { requester: userId, status: FriendshipStatus.accepted },
            ],
        });

        const friendIds: User['_id'][] = freindRelations.map((friendshipRelation: Friendship): User['_id'] => {
            const { recipient, requester } = friendshipRelation;
            if (recipient === userId) {
                return recipient;
            }
            return requester;
        });

        return this.userService.findManyByIds(friendIds);
    }
}
