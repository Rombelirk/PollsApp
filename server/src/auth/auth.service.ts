import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './inputs/login.input';
import { User } from '../user/interfaces/user.interface';
import { UserDto } from '../user/dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async validateUser(input: LoginInput): Promise<User> {
        const { login, password } = input;
        const user = await this.userService.findOneByLogin(login);
        if (user && user.password === password) {
            return user;
        }
        throw new Error('User not found');
    }

    async login(user: LoginInput): Promise<LoginDto> {
        const validatedUser = await this.validateUser(user);
        const result = { user: validatedUser, jwtToken: this.jwtService.sign(validatedUser.toJSON()) };
        return result;
    }
}
