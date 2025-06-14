import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import type { CreateUserDTO } from "./dtos/create-user.dto";
import type { FindMethodOptions } from "src/shared/types/find-method-options.type";

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

    public async findByUsername(
        username: string,
        options: FindMethodOptions = {
            throwError: true
        }
    ) {
        const user = await this.prismaService.user.findUnique({
            where: { username },
            select: {
                id: true,
                name: true,
                username: true,
                avatarUrl: true,
            }
        });

        if (!user && options?.throwError) {
            throw new NotFoundException('Usuário não encontrado');
        }

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
            ...user,
            hashedPassword: undefined
        };
    }

}