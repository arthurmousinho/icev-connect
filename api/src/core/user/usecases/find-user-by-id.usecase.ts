import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../user.repository";

@Injectable()
export class FindUserByIdUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    public async execute(id: string) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundException('O usuário não foi encontrado.');
        }

        return {
            ...user,
            hashedPassword: undefined
        };
    }

}