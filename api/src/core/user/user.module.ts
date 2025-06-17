import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { FindUserByIdUseCase } from './usecases/find-user-by-id.usecase';
import { FindUserByEmailUseCase } from './usecases/find-user-by-email.usecase';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { GetUserProfileUseCase } from './usecases/get-user-profile.usecase';
import { FindOrCreateUserByEmailUseCase } from './usecases/find-or-create-user-by-email.usecase';
import { FindUserByUsernameUseCase } from './usecases/find-user-by-username.usecase';

@Module({
    imports: [
        DatabaseModule
    ],
    providers: [
        UserRepository,

        FindUserByIdUseCase,
        FindUserByEmailUseCase,
        FindUserByUsernameUseCase,
        CreateUserUseCase,
        GetUserProfileUseCase,
        FindOrCreateUserByEmailUseCase
    ],
    controllers: [
        UserController
    ],
    exports: [
        FindUserByIdUseCase,
        FindUserByEmailUseCase,
        FindUserByUsernameUseCase,
        CreateUserUseCase,
        FindOrCreateUserByEmailUseCase
    ]
})
export class UserModule {}