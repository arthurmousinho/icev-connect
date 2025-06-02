import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "./strategies/google.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { DatabaseModule } from "src/infra/database/database.module";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRATION },
        }),
        UserModule
    ],
    providers: [
        AuthService,
        GoogleStrategy,
        JwtStrategy
    ],
    controllers: [
        AuthController
    ],
    exports: [],
})
export class AuthModule { }