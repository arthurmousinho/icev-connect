import {
    Controller,
    Get,
    Req,
    UseGuards,
    Res,
    Post,
    Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { LoginWithEmailAndPassswordDTO } from './dtos/login-with-email-password.dto';

@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService: AuthService) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    public async googleAuth() {
        // The passport Google strategy will handle the redirection
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    public async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        if (!req.user) {
            return;
        }

        const tokens = await this.authService.validateOAuthLogin(req.user);

        return res.redirect(
            `${process.env.FRONTEND_URL}/auth/callback?token=${tokens.accessToken}`
        );
    }

    @Post('login')
    public async loginWithEmailAndPassword(@Body() body: LoginWithEmailAndPassswordDTO) {
        return await this.authService.loginWithEmailAndPassword({
            email: body.email,
            password: body.password
        });
    }

}