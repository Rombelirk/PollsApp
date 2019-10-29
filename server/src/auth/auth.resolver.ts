import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './Auth.service';
import { LoginInput } from './inputs/login.input';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query(() => LoginDto)
    async login(@Args('input') input: LoginInput) {
        return this.authService.login(input);
    }
}
