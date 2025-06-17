import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FindUserByUsernameUseCase } from './usecases/find-user-by-username.usecase';
import { GetUserProfileUseCase } from './usecases/get-user-profile.usecase';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {

    constructor(
        private readonly getUserProfileUseCase: GetUserProfileUseCase,
        private readonly findUserByUsernameUseCase: FindUserByUsernameUseCase
    ) { }

    @Get('me')
    public async getProfile(@Req() req: any) {
        const data = await this.getUserProfileUseCase.execute(req.user.id)
        return { data }
    }

    @Get(':username')
    public async findByUsername(@Param('username') username: string) {
        const data = await this.findUserByUsernameUseCase.execute(username)
        return { data }
    }

}