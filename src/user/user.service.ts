import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { UserLoginInput } from './inputs/user-login.input';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User')
        private readonly UserModel: Model<User>
    ) {}

    async create(createUserInput: UserLoginInput): Promise<User> {
        const { login } = createUserInput;
        const foundUser = await this.findOneByLogin(login);
        if (foundUser) {
            throw new Error('User with such login already exists');
        }
        const createdUser = new this.UserModel(createUserInput);
        return createdUser.save();
    }

    async findOneByLogin(login: string): Promise<User | null> {
        return this.UserModel.findOne({ login });
    }

    async findById(id: string): Promise<User | null> {
        return this.UserModel.findById(id);
    }

    async getFriends(id: string): Promise<User[] | null> {
        const user = await this.UserModel.findById(id);
        if (!user) {
            throw new Error(`Failed to get user with id ${id}`);
        }
        const populatedUser = await user.populate('friends').execPopulate();
        return populatedUser.friends;
    }

    async findAll(): Promise<User[]> {
        return this.UserModel.find().exec();
    }
}
