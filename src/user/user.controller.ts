import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/authDto';
import { LoginResponseDto } from './dto/loginResponseDto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('users')
    async createUser(@Body() authDto: AuthDto): Promise<UserEntity> {
        return await this.userService.createUser(authDto)
    }

    @Post('users/login')
    async login(@Body() authDto: AuthDto): Promise<LoginResponseDto> {
        return await this.userService.login(authDto)
    }
}
