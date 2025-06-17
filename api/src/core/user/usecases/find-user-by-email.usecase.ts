import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../user.repository";

@Injectable()
export class FindUserByEmailUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    public async execute(email: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new NotFoundException('Credenciais inválidas');
        }

        return user;
    }

}