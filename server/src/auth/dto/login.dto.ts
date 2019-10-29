import { ObjectType, Field } from 'type-graphql';
import { UserDto } from '../../user/dto/user.dto';
@ObjectType()
export class LoginDto {
    @Field((type) => UserDto)
    user: UserDto;
    @Field((type) => String)
    jwtToken: string;
}
