import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body('username') username: string, @Body('password') password: string) {
        return await this.usersService.register(username, password);
    }
    @Post('login')
    async login(@Body('username') username: string, @Body('password') password: string) {
        return await this.usersService.login(username, password);
    }
}
