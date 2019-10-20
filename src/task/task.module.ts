import { UserService } from './../user/user.service';
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './task.schema';
import { UserSchema } from '../user/user.schema';
import { TaskResolver } from './task.resolver';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }, { name: 'User', schema: UserSchema }])],
    providers: [TaskService, TaskResolver],
    exports: [TaskService],
})
export class TaskModule {}
