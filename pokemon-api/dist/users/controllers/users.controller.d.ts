import { UsersService } from '../services/users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(username: string, password: string): Promise<import("../services/users.service").RegisterResponse>;
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
}
