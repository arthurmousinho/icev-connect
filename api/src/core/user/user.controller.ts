import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get('me')
    public async getProfile(@Req() req: any) {
        const data = await this.userService.getProfile(req.user.id);
        return { data }
    }

    @Get(':username')
    public async findByUsername(@Param('username') username: string) {
        const data = await this.userService.findByUsername(username);
        return { data }
    }

}