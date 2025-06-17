import { Injectable } from '@nestjs/common';
import { FindOrCreateUserByEmailDTO } from '../dtos/find-or-create-user-by-email.dto';
import { UserRepository } from '../user.repository';

@Injectable()
export class FindOrCreateUserByEmailUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    public async execute(data: FindOrCreateUserByEmailDTO) {
        const userExists = await this.userRepository.findByEmail(data.email);

        if (userExists) {
            return userExists;
        }

        return this.userRepository.create({
            email: data.email,
            name: data.name,
            username: data.username,
            avatarUrl: data.avatarUrl,
        });
    }

}