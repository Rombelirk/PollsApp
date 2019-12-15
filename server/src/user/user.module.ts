import { Module, forwardRef } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';
import { PollModule } from '../poll/poll.module';
import { ConfigModule } from '../config/config.module';
import { FriendshipModule } from '../friendship/friendship.module';

@Module({
    imports: [
        ConfigModule,
        PollModule,
        forwardRef(() => FriendshipModule),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    providers: [UserService, UserResolver],
    exports: [UserService],
})
export class UserModule { }
