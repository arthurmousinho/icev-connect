import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';
import { compare } from 'bcrypt';
import type { LoginWithEmailAndPassswordDTO } from './dtos/login-with-email-password.dto';

@Injectable()
export class AuthService {

    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) { }

    public async validateOAuthLogin(user: any) {
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

        const accessToken = this.signToken({
            userId: userFound.id,
            email: userFound.email,
        });

        return {
            accessToken,
            user: userFound,
        };
    }

    public async loginWithEmailAndPassword(data: LoginWithEmailAndPassswordDTO) {
        const { email, password } = data;

        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!user || !user.hashedPassword) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const isPasswordValid = await compare(password, user.hashedPassword);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const token = this.signToken({
            userId: user.id,
            email: user.email
        });

        return { accessToken: token };
    }

    private signToken(payload: { userId: string, email: string }) {
        return this.jwtService.sign({
            sub: payload.userId,
            email: payload.email
        });
    }

}