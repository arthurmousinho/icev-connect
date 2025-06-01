import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { DomainNotAllowedException } from '../exceptions/domain-not-allowed.exception';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile'],
        });
    }

    public async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ) {
        const email = profile.emails[0].value;
        const allowedDomains = ['somosicev.com', 'grupocev.com'];
        const emailDomain = email.split('@')[1];

        if (!allowedDomains.includes(emailDomain)) {
            return done(new DomainNotAllowedException(emailDomain), false);
        }

        const user = {
            email,
            name: profile.displayName,
            avatarUrl: profile.photos[0].value,
            username: email.split('@')[0],
        };

        return user;
    }

}