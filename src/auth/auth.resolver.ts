import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './Auth.service';
import { LoginInput } from './inputs/login.input';

@Resolver()
export class AuthResolver {
    constructor(private readonly AuthService: AuthService) {}

    @Query(() => LoginDto)
    async login(@Args('input') input: LoginInput) {
        return this.AuthService.login(input);
    }
}
