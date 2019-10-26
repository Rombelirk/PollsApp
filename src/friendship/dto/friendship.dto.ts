import { ObjectType, Field } from 'type-graphql';
import { UserDto } from 'src/user/dto/user.dto';

@ObjectType()
export class FriendshipDto {
    @Field()
    _id: string;

    @Field()
    recipient: string;

    @Field()
    requester: string;

    @Field()
    status: string;
}
