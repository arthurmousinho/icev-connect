import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UserService } from 'src/core/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer token
                (req: Request) => req?.cookies?.icev_connect_token, // Cookie token
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    public async validate(payload: { sub: string }) {
        const user = await this.userService.findById(payload.sub);

        if (!user) {
            throw new UnauthorizedException('Usuário não encontrado ou não autorizado');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('Usuário inativo');
        }

        return {
            id: user.id,
            role: user.role,
        };
    }

}