import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../gql-auth-guard';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { CurrentUser } from './decorators/current-user';
import { UserDto } from './dto/user.dto';
import { UserLoginInput } from './inputs/user-login.input';
import { UserService } from './user.service';
import { TaskService } from '../task/task.service';
import { User } from './interfaces/user.interface';
import { TaskDto } from 'src/task/dto/task.dto';

@Resolver(() => UserDto)
export class UserResolver {
    constructor(private readonly userService: UserService, private readonly taskService: TaskService) {}

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
        return this.userService.getFriends(user._id);
    }

    @Mutation(() => UserDto)
    async createUser(@Args('input') input: UserLoginInput) {
        return this.userService.create(input);
    }
}
