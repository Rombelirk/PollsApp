import { ObjectType, Field } from 'type-graphql';
import { PollDto } from 'src/poll/dto/poll.dto';
import { FriendshipDto } from '../../friendship/dto/friendship.dto';
@ObjectType()
export class UserDto {
    @Field()
    _id: string;

    @Field()
    login: string;

    @Field((type) => PollDto, { nullable: true })
    currentPoll: PollDto;

    @Field((type) => PollDto)
    pollHistory: PollDto[];

    @Field((type) => UserDto)
    friends: UserDto[];

    @Field((type) => FriendshipDto)
    friendRequests: FriendshipDto[];
}
