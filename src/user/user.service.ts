import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/User.interface';
import { UserLoginInput } from './inputs/user-login.input';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

    async create(createUserInput: UserLoginInput): Promise<User> {
        const createdUser = new this.UserModel(createUserInput);
        return await createdUser.save();
    }

    async findOneByLogin(login: string): Promise<User | null> {
        const foundUser = await this.UserModel.findOne({ login });
        return foundUser;
    }

    async findById(id: string): Promise<User | null> {
        const foundUser = await this.UserModel.findById(id);
        return foundUser;
    }

    async findAll(): Promise<User[]> {
        return await this.UserModel.find().exec();
    }
}
