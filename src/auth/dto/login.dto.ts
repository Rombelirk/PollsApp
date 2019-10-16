import { ObjectType, Field } from 'type-graphql';
import { UserDto } from '../../user/dto/user.dto';
@ObjectType()
export class LoginDto extends UserDto {
    @Field((type) => String)
    jwtToken: string;
}
