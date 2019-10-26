import { Model } from 'mongoose';
import { Injectable, Optional } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/task.interface';
import { User } from '../user/interfaces/user.interface';
import { TaskInput } from './inputs/task.input';

@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}
    async getAll(): Promise<Task[]> {
        return this.taskModel.find().exec();
    }

    async getById(id: Task['_id']): Promise<Task | null> {
        return this.taskModel.findById(id);
    }

    async create(createUserInput: TaskInput, userId: User['_id']): Promise<Task> {
        const finalInput = {
            ...createUserInput,
            author: userId,
        };
        const createdTask = new this.taskModel(finalInput);
        return createdTask.save();
    }

    async getTasksAssignedToUser(userId: User['_id']): Promise<Task[]> {
        if (!userId) {
            throw new Error('No user id provided');
        }
        return this.taskModel.find({ assignees: userId });
    }
}
