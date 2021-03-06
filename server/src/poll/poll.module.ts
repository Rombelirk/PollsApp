import { Module, forwardRef } from '@nestjs/common';
import { PollService } from './poll.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PollSchema } from './poll.schema';
import { PollResolver } from './poll.resolver';
import { UserModule } from '../user/user.module';
import { PubsubModule } from '../pubsub/pubsub.module'

@Module({
    imports: [
        PubsubModule,
        MongooseModule.forFeature([{ name: 'Poll', schema: PollSchema }]),
        forwardRef(() => UserModule)],

    providers: [PollService, PollResolver],
    exports: [PollService],
})
export class PollModule { }
