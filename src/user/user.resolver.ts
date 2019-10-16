import { Resolver, Query, Mutation, Args, Parent, ResolveProperty } from '@nestjs/graphql';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UserLoginInput } from './inputs/user-login.input';
import { GqlAuthGuard } from '../gql-auth-guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/curretnt-user';

@Resolver(() => UserDto)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query((returns) => UserDto)
    @UseGuards(GqlAuthGuard)
    async getSelfInfo(@CurrentUser() user: UserDto) {
        return this.userService.findById(user._id);
    }

    @Query(() => [UserDto])
    @UseGuards(GqlAuthGuard)
    async getAllUsers() {
        return this.userService.findAll();
    }

    // @ResolveProperty()
    // async friends(@Parent() user: UserDto) {
    //     return [{ _id: "sdfsdf", login: "f", name: "f" }]
    // }

    @Mutation(() => UserDto)
    async createUser(@Args('input') input: UserLoginInput) {
        return this.userService.create(input);
    }
}
