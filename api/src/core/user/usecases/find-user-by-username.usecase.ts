import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../user.repository";

@Injectable()
export class FindUserByUsernameUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    public async execute(username: string) {
        const user = await this.userRepository.findByUsername(username);

        if (!user) {
            throw new NotFoundException('O usuário não foi encontrado.');
        }

        return {
            ...user,
            hashedPassword: undefined
        };
    }

}