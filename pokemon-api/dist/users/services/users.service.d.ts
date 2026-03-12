import { Repository } from 'typeorm';
import { User } from '../models/users.entity';
import { JwtService } from '@nestjs/jwt';
export interface RegisterResponse {
    id: number;
    username: string;
    createdAt: Date;
}
export declare class UsersService {
    private readonly usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    register(username: string, password: string): Promise<RegisterResponse>;
    login(username: string, pass: string): Promise<{
        access_token: string;
    }>;
}
