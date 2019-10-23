import { ConfigService } from './config/config.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { ConfigModule } from './config/config.module';

@Module({
    imports: [
        ConfigModule,
        AuthModule,
        UserModule,
        TaskModule,
        MongooseModule.forRoot(new ConfigService().get('DATABASE_URL')),
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
            context: ({ req }) => ({ req }),
            debug: true,
            playground: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
