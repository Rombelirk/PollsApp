import { TaskDto } from './../../task/dto/task.dto';
import { InputType, Field } from 'type-graphql';

@InputType()
export class UserLoginInput {
    @Field()
    login: string;
    @Field()
    password: string;
}
