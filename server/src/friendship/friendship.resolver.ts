import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../gql-auth-guard';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../user/decorators/current-user';
import { FriendshipService } from './friendship.service';
import { User } from '../user/interfaces/user.interface';
import { FriendshipDto } from './dto/friendship.dto';
import { Friendship } from './interfaces/friendship.interface';

@Resolver('Friendship')
export class FriendshipResolver {
    constructor(private readonly friendshipService: FriendshipService) { }

    @Mutation(() => FriendshipDto)
    @UseGuards(GqlAuthGuard)
    async createFriendshipRequest(@Args('userId') id: string, @CurrentUser() user: User): Promise<Friendship> {
        return this.friendshipService.createRequest(id, user._id);
    }

    @Mutation(() => FriendshipDto)
    @UseGuards(GqlAuthGuard)
    async acceptFriendshipRequest(@Args('requestId') id: string, @CurrentUser() user: User): Promise<Friendship> {
        return this.friendshipService.acceptRequest(id, user._id);
    }
}
