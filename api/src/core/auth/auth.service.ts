import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';
import type { JwtPayload } from './types/jwt.type';

@Injectable()
export class AuthService {

    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) { }

    async validateOAuthLogin(user: any) {
        const { email, name, avatarUrl, username } = user;

        let userFound = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!userFound) {
            userFound = await this.prismaService.user.create({
                data: {
                    email,
                    name,
                    username,
                    avatarUrl,
                },
            });
        }

        const accessTokenPayload: JwtPayload = {
            sub: userFound.id,
            email: userFound.email,
        }

        const accessToken = this.jwtService.sign(accessTokenPayload);

        return {
            accessToken,
            user: userFound,
        };
    }

}