import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
    handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
        const res = context.switchToHttp().getResponse();

        if (err || !user) {
            console.log(err) // null
            console.log(info) // undefined

            const message = encodeURIComponent(
                err?.message || info?.message || 'Erro na autenticação.'
            );

            res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=${message}`);
            res.end();
            return null;
        }

        return user;
    }

}