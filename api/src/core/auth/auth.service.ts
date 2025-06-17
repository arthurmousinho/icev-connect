import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { FindUserByEmailUseCase } from '../user/usecases/find-user-by-email.usecase';
import { FindOrCreateUserByEmailUseCase } from '../user/usecases/find-or-create-user-by-email.usecase';
import type { LoginWithEmailAndPassswordDTO } from './dtos/login-with-email-password.dto';
import type { UserRole } from 'generated/prisma';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
        private readonly findOrCreateUserByEmailUseCase: FindOrCreateUserByEmailUseCase
    ) { }

    public async validateOAuthLogin(user: any) {
        const { email, name, avatarUrl, username } = user;

        const userFound = await this.findOrCreateUserByEmailUseCase.execute({
            email,
            name,
            avatarUrl,
            username,
        });

        const accessToken = this.signToken({
            userId: userFound.id,
            email: userFound.email,
            role: userFound.role
        });

        return { accessToken };
    }

    public async loginWithEmailAndPassword(data: LoginWithEmailAndPassswordDTO) {
        const { email, password } = data;

        const user = await this.findUserByEmailUseCase.execute(email);

        if (!user.hashedPassword) {
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