import { Model } from 'mongoose';
import { Injectable, Optional } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/task.interface';
import { User } from '../user/interfaces/user.interface';
import { TaskInput } from './inputs/task.input';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel('Task') private readonly taskModel: Model<Task>,
        @InjectModel('User') private readonly userModel: Model<User>
    ) {}
    async getAll(): Promise<Task[]> {
        return this.taskModel.find().exec();
    }

    async getById(id: string): Promise<Task | null> {
        return this.taskModel.findById(id);
    }

    async create(createUserInput: TaskInput, user: User): Promise<Task> {
        const finalInput = {
            ...createUserInput,
            author: user._id,
        };
        const createdTask = new this.taskModel(finalInput);
        return createdTask.save();
    }

    async assignTaskToUsers(assigneeIds: string[], taskId: string): Promise<boolean> {
        await this.userModel.updateMany({ _id: { $in: assigneeIds } }, { $push: { tasks: taskId } });
        return true;
    }

    async getTasksAssignedToUser(userId: string): Promise<Task[]> {
        return this.taskModel.find({ assignees: userId });
    }
}
