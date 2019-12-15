import { UserDto } from './../user/dto/user.dto';
import { Args, Mutation, Query, Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
import { PollDto } from './dto/poll.dto';
import { PollInput } from './inputs/poll.input';
import { AnswerPollInput } from './inputs/answer_poll.input'
import { PollService } from './poll.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../gql-auth-guard';
import { CurrentUser } from '../user/decorators/current-user';
import { User } from '../user/interfaces/user.interface';
import { Poll } from './interfaces/poll.interface'
import { UserService } from '../user/user.service'

@Resolver(() => PollDto)
export class PollResolver {
    constructor(
        private readonly pollService: PollService,
        private readonly userService: UserService
    ) { }

    @Query(() => [PollDto])
    @UseGuards(GqlAuthGuard)
    async getPollsCreatedByUser(@Args('userId') userId: string) {
        return this.pollService.getPollsCreatedByUser(userId);
    }

    @Query(() => [PollDto])
    @UseGuards(GqlAuthGuard)
    async getPollsToAnswer(@CurrentUser() user: User) {
        return this.pollService.getPollsToAnswer(user._id);
    }

    @ResolveProperty(() => UserDto)
    async author(@Parent() poll: Poll) {
        return this.userService.findById(poll.author)
    }




    @Mutation(() => PollDto)
    @UseGuards(GqlAuthGuard)
    async closeCurrentPoll(@CurrentUser() user: User) {
        return this.pollService.closeCurrentPoll(user._id);
    }

    @Mutation(() => PollDto)
    @UseGuards(GqlAuthGuard)
    async createPoll(@Args('input') input: PollInput, @CurrentUser() user: User) {
        return this.pollService.create(input, user._id);
    }

    @Mutation(() => PollDto)
    @UseGuards(GqlAuthGuard)
    async giveAnswer(@Args('input') input: AnswerPollInput, @CurrentUser() user: User) {
        return this.pollService.giveAnswer(input, user._id);
    }
}
