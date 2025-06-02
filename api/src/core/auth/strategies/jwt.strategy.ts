import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/core/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
            userId: user.id,
            email: user.email,
            role: user.role
        };
    }

}