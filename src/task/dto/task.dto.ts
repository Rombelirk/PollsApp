import { ObjectType, Field } from 'type-graphql';
import { UserDto } from 'src/user/dto/user.dto';
@ObjectType()
export class TaskDto {
    @Field()
    _id: string;
    @Field()
    title: string;
    @Field((type) => UserDto)
    assignees: UserDto[];
    @Field((type) => UserDto)
    author: UserDto;
    @Field()
    create_date: Date;
    @Field()
    deadline: Date;
    @Field()
    description: string;
    @Field()
    imageURL: string;
}
