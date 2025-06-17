import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import type { Prisma } from "generated/prisma";

@Injectable()
export class UserRepository {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async create(data: Prisma.UserCreateInput) {
        return await this.prismaService.user.create({ data });
    }

    public async findById(id: string) {
        return await this.prismaService.user.findUnique({
            where: { id }
        });
    }

    public async findByUsername(username: string) {
        return await this.prismaService.user.findUnique({
            where: { username }
        });
    }

    public async findByEmail(email: string) {
        return await this.prismaService.user.findUnique({
            where: { email }
        });
    }

}