import { ObjectType, Field } from 'type-graphql';
import { UserDto } from 'src/user/dto/user.dto';

@ObjectType()
class PollDtoOptions {
    @Field({ name: '_id' })
    _id: string;
    @Field({ name: 'option' })
    option: string;
}

@ObjectType()
class PollDtoVotes {
    @Field((type) => UserDto, { name: 'user' })
    user: UserDto;
    @Field({ name: 'optionId' })
    optionId: string;
}

@ObjectType()
export class PollDto {
    @Field({ name: '_id' })
    _id: string;
    @Field({ name: 'title' })
    title: string;
    @Field((type) => UserDto, { name: 'author' })
    author: UserDto;
    @Field({ name: 'create_date' })
    create_date: Date;
    @Field((type) => PollDtoOptions, { name: 'options' })
    options: PollDtoOptions[];
    @Field((type) => PollDtoVotes, { name: 'votes' })
    votes: PollDtoVotes[];
}
