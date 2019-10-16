import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './inputs/login.input';
import { User } from '../user/interfaces/user.interface';
import { UserDto } from '../user/dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async validateUser(input: LoginInput): Promise<UserDto | null> {
        const { login, password } = input;
        const user = await this.userService.findOneByLogin(login);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: LoginInput): Promise<LoginDto> {
        const validatedUser = await this.validateUser(user);

        if (validatedUser === null) {
            throw new Error('User not found');
        }

        const result = { ...validatedUser, jwtToken: this.jwtService.sign(validatedUser) };
        return result;
    }
}
