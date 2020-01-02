import { Module } from '@nestjs/common';
import { pubSub } from './pubsub.service';

@Module({
    providers: [
        {
            provide: pubSub,
            useValue: new pubSub(),
        },
    ],
    exports: [pubSub],
})
export class PubsubModule { }
