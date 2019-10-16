import { ObjectType, Field } from 'type-graphql';
@ObjectType()
export class UserDto {
    @Field()
    readonly _id: string;
    @Field()
    readonly login: string;
    // @Field(type => UserDto)
    // friends: UserDto[]
}
