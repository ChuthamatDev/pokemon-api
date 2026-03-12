import { ConfigService } from '@nestjs/config';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
export interface JwtPayload {
    sub: number;
    username: string;
}
export interface AuthenticatedRequest extends Request {
    user: JwtPayload;
}
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
