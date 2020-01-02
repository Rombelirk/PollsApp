import { UserDto } from './../user/dto/user.dto';
import { Args, Mutation, Query, Resolver, ResolveProperty, Parent, Subscription } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PollDto } from './dto/poll.dto';
import { PollInput } from './inputs/poll.input';
import { AnswerPollInput } from './inputs/answer_poll.input';
import { PollService } from './poll.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../gql-auth-guard';
import { CurrentUser } from '../user/decorators/current-user';
import { User } from '../user/interfaces/user.interface';
import { Poll } from './interfaces/poll.interface';
import { UserService } from '../user/user.service';
import { PubSubEngine } from 'graphql-subscriptions';
import { pubSub } from '../pubsub/pubsub.service'

const ANSWER_GIVEN = 'answerGiven';
const POLL_CREATED = 'pollCreated'

@Resolver(() => PollDto)
export class PollResolver {
    constructor(
        private readonly pollService: PollService,
        private readonly userService: UserService,
        @Inject(pubSub) private pubSub: PubSubEngine
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
        return this.userService.findById(poll.author);
    }

    @Mutation(() => UserDto)
    @UseGuards(GqlAuthGuard)
    async closeCurrentPoll(@CurrentUser() user: User) {
        return this.pollService.closeCurrentPoll(user._id);
    }

    @Mutation(() => UserDto)
    @UseGuards(GqlAuthGuard)
    async createPoll(@Args('input') input: PollInput, @CurrentUser() user: User) {
        const result = await this.pollService.create(input, user._id);
        this.pubSub.publish(POLL_CREATED, { [POLL_CREATED]: result });
        return result;
    }

    @Mutation(() => PollDto)
    @UseGuards(GqlAuthGuard)
    async giveAnswer(@Args('input') input: AnswerPollInput, @CurrentUser() user: User) {
        const result = await this.pollService.giveAnswer(input, user._id);
        this.pubSub.publish(ANSWER_GIVEN, { [ANSWER_GIVEN]: result });
        return result;
    }

    @Subscription(returns => PollDto, {
        filter(payload, variables) {
            return payload[ANSWER_GIVEN].author.equals(variables.userId)
        }
    })
    [ANSWER_GIVEN](@Args('userId') userId: string) {
        const result = this.pubSub.asyncIterator(ANSWER_GIVEN);
        return result;

    }


    @Subscription(returns => PollDto, {
        filter(payload, variables) {
            return !payload[POLL_CREATED]._id.equals(variables.userId)
        }
    })
    [POLL_CREATED](@Args('userId') userId: string) {
        const result = this.pubSub.asyncIterator(POLL_CREATED);
        return result;

    }
}
