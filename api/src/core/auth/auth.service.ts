import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import type { LoginWithEmailAndPassswordDTO } from './dtos/login-with-email-password.dto';
import type { UserRole } from 'generated/prisma';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    public async validateOAuthLogin(user: any) {
        const { email, name, avatarUrl, username } = user;

        let userFound = await this.userService.findByEmail(email);

        if (!userFound) {
            userFound = await this.userService.create({
                email,
                name,
                username,
                avatarUrl,
            });
        }

        const accessToken = this.signToken({
            userId: userFound.id,
            email: userFound.email,
            role: userFound.role
        });

        return { accessToken };
    }

    public async loginWithEmailAndPassword(data: LoginWithEmailAndPassswordDTO) {
        const { email, password } = data;

        const user = await this.userService.findByEmail(email);

        if (!user || !user.hashedPassword) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const isPasswordValid = await compare(password, user.hashedPassword);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const accessToken = this.signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        return { accessToken };
    }

    private signToken(payload: { userId: string, email: string, role: UserRole }) {
        return this.jwtService.sign({
            sub: payload.userId,
            email: payload.email,
            role: payload.role
        });
    }

}