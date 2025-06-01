import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/infra/database/prisma.service';
import type { JwtPayload } from '../types/jwt.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly prismaService: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    public async validate(payload: JwtPayload) {
        const user = await this.prismaService.user.findUnique({
            where: { id: payload.sub },
        });

        if (!user) {
            throw new UnauthorizedException('Usuário não encontrado ou não autorizado');
        }

        if (user.status !== 'ACTIVE') {
            throw new UnauthorizedException('Usuário inativo');
        }

        return {
            userId: user.id,
            email: user.email,
            role: user.role
        };
    }

}