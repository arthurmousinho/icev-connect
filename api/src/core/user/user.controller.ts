import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get('profile')
    public async getProfile(@Req() req: any) {
        const data = await this.userService.getProfile(req.user.id);
        return { data }
    }

}