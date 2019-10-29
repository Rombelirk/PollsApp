import { ObjectType, Field } from 'type-graphql';
import { UserDto } from 'src/user/dto/user.dto';
@ObjectType()
export class TaskDto {
    @Field({ name: '_id' })
    _id: string;
    @Field({ name: 'title' })
    title: string;
    @Field((type) => UserDto, { name: "assignees" })
    assignees: UserDto[];
    @Field((type) => UserDto, { name: "author" })
    author: UserDto;
    @Field({ name: 'create_date' })
    create_date: Date;
    @Field({ name: 'deadline' })
    deadline: Date;
    @Field({ name: 'description' })
    description: string;
    @Field({ name: 'imageURL' })
    imageURL: string;
}
