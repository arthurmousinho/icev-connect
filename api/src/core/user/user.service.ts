import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import type { CreateUserDTO } from "./dtos/create-user.dto";

@Injectable()
export class UserService {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async findById(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: { id }
        });

        return user;
    }

    public async findByEmail(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: { email }
        });

        return user;
    }

    public async create(data: CreateUserDTO) {
        const userCreated = await this.prismaService.user.create({
            data: {
                email: data.email,
                name: data.name,
                username: data.username,
                avatarUrl: data.avatarUrl,
            },
        });

        return userCreated;
    }

    public async getProfile(id: string) {
        const user = await this.findById(id);

        if (!user) {
            throw new NotFoundException('O perfil deste usuário não foi encontrado.');
        }

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            avatarUrl: user.avatarUrl,
        };
    }

}