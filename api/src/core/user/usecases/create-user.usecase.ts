import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from "../user.repository";
import type { CreateUserDTO } from "../dtos/create-user.dto";

@Injectable()
export class CreateUserUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    public async execute(data: CreateUserDTO) {
        const userWithEmail = await this.userRepository.findByEmail(data.email);

        if (userWithEmail) {
            throw new ConflictException('Já existe um usuário com esse e-mail')
        }

        const userCreated = await this.userRepository.create({
            email: data.email,
            name: data.name,
            username: data.username,
            avatarUrl: data.avatarUrl,
        });

        return userCreated;
    }

}