import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskDto } from './dto/task.dto';
import { TaskInput } from './inputs/task.input';
import { TaskService } from './task.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../gql-auth-guard';
import { CurrentUser } from '../user/decorators/current-user';
import { User } from '../user/interfaces/user.interface';

@Resolver(() => TaskDto)
export class TaskResolver {
    constructor(private readonly taskService: TaskService) {}

    @Query(() => [TaskDto])
    @UseGuards(GqlAuthGuard)
    async getTasksAssignedToUser(@Args('userId') userId: string) {
        return this.taskService.getTasksAssignedToUser(userId);
    }

    @Mutation(() => TaskDto)
    @UseGuards(GqlAuthGuard)
    async createTask(@Args('input') input: TaskInput, @CurrentUser() user: User) {
        return this.taskService.create(input, user._id);
    }
}
