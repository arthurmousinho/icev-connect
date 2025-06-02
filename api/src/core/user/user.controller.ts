import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { AuthGuard } from "@nestjs/passport";

@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    public async getProfile(@Req() req: any) {
        const data = await this.userService.getProfile(req.user.id);
        return { data }
    }

}