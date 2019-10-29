import { ObjectType, Field } from 'type-graphql';
import { TaskDto } from 'src/task/dto/task.dto';
import { FriendshipDto } from '../../friendship/dto/friendship.dto';
@ObjectType()
export class UserDto {
    @Field()
    _id: string;

    @Field()
    login: string;

    @Field((type) => UserDto)
    friends: UserDto[];

    @Field((type) => FriendshipDto)
    friendRequests: FriendshipDto[];

    @Field((type) => TaskDto)
    tasks: TaskDto[];
}
