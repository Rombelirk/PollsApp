import { InputType, Field } from 'type-graphql';
@InputType()
export class UserLoginInput {
    @Field()
    readonly login!: string;
    @Field()
    readonly password!: string;
}
