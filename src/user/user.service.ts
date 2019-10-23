import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { Task } from '../task/interfaces/task.interface';
import { UserLoginInput } from './inputs/user-login.input';
import { ConfigService } from '../config/config.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User')
        private readonly UserModel: Model<User>,
        private readonly config: ConfigService
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
        return await this.UserModel.findOne({ login });
    }

    async findById(id: string): Promise<User | null> {
        const foundUser = await this.UserModel.findById(id);
        return foundUser;
    }

    async findAll(): Promise<User[]> {
        return await this.UserModel.find().exec();
    }
}
