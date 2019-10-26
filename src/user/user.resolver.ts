import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../gql-auth-guard';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { CurrentUser } from './decorators/current-user';
import { FriendshipDto } from './../friendship/dto/friendship.dto';
import { UserDto } from './dto/user.dto';
import { UserLoginInput } from './inputs/user-login.input';
import { UserService } from './user.service';
import { TaskService } from '../task/task.service';
import { FriendshipService } from '../friendship/friendship.service';
import { User } from './interfaces/user.interface';
import { TaskDto } from 'src/task/dto/task.dto';
import { FriendshipStatus } from 'src/friendship/enums/friendshipStatus.enum';

@Resolver(() => UserDto)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly taskService: TaskService,
        private readonly friendshipService: FriendshipService
    ) {}

    @Query((returns) => UserDto)
    @UseGuards(GqlAuthGuard)
    async getSelfInfo(@CurrentUser() user: UserDto) {
        return this.userService.findById(user._id);
    }

    @Query(() => [UserDto])
    @UseGuards(GqlAuthGuard)
    async getAllUsers() {
        return this.userService.findAll();
    }

    @ResolveProperty(() => [TaskDto])
    async tasks(@Parent() user: User) {
        return this.taskService.getTasksAssignedToUser(user._id);
    }

    @ResolveProperty(() => [UserDto])
    async friends(@Parent() user: User) {
        return this.friendshipService.getFriendsOfUser(user._id);
    }

    @ResolveProperty(() => [FriendshipDto])
    async friendRequests(@Parent() user: User) {
        return this.friendshipService.getRecievedRequestsOfUser(user._id, FriendshipStatus.pending);
    }

    @Mutation(() => UserDto)
    async createUser(@Args('input') input: UserLoginInput) {
        return this.userService.create(input);
    }
}
