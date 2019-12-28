import { UserService } from './../user/user.service';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Poll } from './interfaces/poll.interface';
import { User } from '../user/interfaces/user.interface';
import { PollInput } from './inputs/poll.input';
import { Types } from 'mongoose';
import { AnswerPollInput } from './inputs/answer_poll.input';

@Injectable()
export class PollService {
    constructor(
        @InjectModel('Poll') private readonly pollModel: Model<Poll>,
        private readonly userService: UserService
    ) { }
    async getAll(): Promise<Poll[]> {
        return this.pollModel.find().exec();
    }

    async getPollsCreatedByUser(userId: User['_id']): Promise<Poll[]> {
        if (!userId) {
            throw new Error('No user id provided');
        }
        return await this.pollModel.find({ author: userId });
    }

    async getPollById(poll: Poll['id']): Promise<Poll | null> {
        const result = await this.pollModel.findById(poll);
        return result;
    }

    async getPollsById(polls: Poll['id'][]): Promise<Poll[]> {
        return await this.pollModel.find({ id: { $in: polls } });
    }

    async getPollsToAnswer(userId: User['id']): Promise<Poll[]> {
        const polls = await this.pollModel.find({
            $and: [{ author: { $ne: userId } }, { 'votes.user': { $nin: [userId] } }],
        });
        return polls;
    }

    async giveAnswer(input: AnswerPollInput, userId: string): Promise<Poll> {
        const { _id, optionId } = input;
        const poll = await this.getPollById(_id);
        if (!poll) {
            throw new Error('No poll found');
        }
        if (poll.votes.find((vote) => vote.user === userId)) {
            throw new Error('This user has already voted in this poll');
        }
        poll.votes.push({ user: userId, optionId });
        poll.save();
        return poll;
    }

    async closeCurrentPoll(userId: string): Promise<User> {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new Error('No user found');
        }
        const currentPoll = user.currentPoll;
        if (user.currentPoll) {
            user.pollHistory.push(currentPoll);
        }
        user.currentPoll = null;
        await user.save();
        return user;
    }

    async create(createPollInput: PollInput, userId: User['_id']): Promise<User> {
        const { title, options } = createPollInput;
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new Error('No user found');
        }
        if (user.currentPoll) {
            throw new Error('User already has an opened poll');
        }
        const optionsWithIds = options.map((option, index) => {
            return {
                _id: Types.ObjectId(),
                option,
            };
        });
        const finalInput = {
            title,
            options: optionsWithIds,
            author: userId,
        };
        const createdPoll = new this.pollModel(finalInput);
        await createdPoll.save();
        user.currentPoll = createdPoll._id;
        await user.save();
        return user;
    }
}
