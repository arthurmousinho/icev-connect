import { hash } from "bcrypt";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    await prisma.user.create({
        data: {
            email: process.env.ADMIN_EMAIL ?? '',
            name: process.env.ADMIN_NAME ?? '',
            username: process.env.ADMIN_USERNAME ?? '',
            avatarUrl: 'https://avatar.vercel.sh/icevconnect',
            hashedPassword: await hash(process.env.ADMIN_PASSWORD ?? '', 10),
            provider: 'CREDENTIALS',
            role: 'ADMIN',
            isActive: true
        },
    });

    console.log('✅ Seed completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
