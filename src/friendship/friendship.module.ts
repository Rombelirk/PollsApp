import { Module, forwardRef } from '@nestjs/common';
import { FriendshipResolver } from './friendship.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendshipSchema } from './friendship.schema';
import { FriendshipService } from './friendship.service';
import { ConfigModule } from '../config/config.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        forwardRef(() => UserModule),
        ConfigModule,
        MongooseModule.forFeature([{ name: 'Friendship', schema: FriendshipSchema }]),
    ],
    providers: [FriendshipService, FriendshipResolver],
    exports: [FriendshipService],
})
export class FriendshipModule {}
