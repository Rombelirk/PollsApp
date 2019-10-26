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

    async findById(id: User['_id']): Promise<User | null> {
        return this.UserModel.findById(id);
    }

    async findAll(): Promise<User[]> {
        return this.UserModel.find().exec();
    }

    async findManyByIds(ids: User['_id'][]): Promise<User[]> {
        return await this.UserModel.find({ _id: { $in: ids } });
    }
}
