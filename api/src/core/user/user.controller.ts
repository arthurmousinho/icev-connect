import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { TopicService } from "../topic/topic.service";

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly topicService: TopicService
    ) { }

    @Get('me')
    public async getProfile(@Req() req: any) {
        const data = await this.userService.getProfile(req.user.id);
        return { data }
    }

    @Get(':username')
    public async findByUsername(@Param('username') username: string) {
        const [userData, userFavoriteTopics] = await Promise.all([
            this.userService.findByUsername(username),
            this.topicService.findUserFavoriteTopics(username)
        ]);

        return {
            data: {
                ...userData,
                favoriteTopics: userFavoriteTopics
            }
        }
    }

}