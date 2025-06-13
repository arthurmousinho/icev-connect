import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TopicModule } from '../topic/topic.module';

@Module({
    imports: [
        DatabaseModule,
        TopicModule
    ],
    providers: [
        UserService
    ],
    controllers: [
        UserController
    ],
    exports: [
        UserService
    ]
})
export class UserModule {}