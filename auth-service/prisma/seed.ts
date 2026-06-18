import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';




const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
} as any);


async function main() {
    // Support both `ADMIN_EMAIL` and `ADMIN-EMAIL` env var names
    const adminEmail = process.env['ADMIN_EMAIL'] ?? process.env['ADMIN-EMAIL'];
    const adminPassword = process.env['ADMIN_PASSWORD'] ?? process.env['ADMIN-PASSWORD'];

    if (!adminEmail) {
        throw new Error('Missing environment variable: ADMIN_EMAIL (or ADMIN-EMAIL)');
    }
    if (!adminPassword) {
        throw new Error('Missing environment variable: ADMIN_PASSWORD (or ADMIN-PASSWORD)');
    }

    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                role: 'ADMIN',
            },
        });
        console.log('Admin user created successfully');
    } else {
        console.log('Admin user already exists');
    }
}

main()
.catch(console.error)
.finally(async () => {
    await prisma.$disconnect();
});
