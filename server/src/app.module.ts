import { ConfigService } from './config/config.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PollModule } from './poll/poll.module';
import { ConfigModule } from './config/config.module';
import { FriendshipModule } from './friendship/friendship.module';

@Module({
    imports: [
        ConfigModule,
        AuthModule,
        UserModule,
        PollModule,
        FriendshipModule,
        MongooseModule.forRoot(new ConfigService().get('DATABASE_URL')),
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
            context: ({ req }) => ({ req }),
            debug: true,
            playground: true,
            typePaths: ['./**/*.graphql'],
            installSubscriptionHandlers: true,
        }),

    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule { }
