import { prisma } from './prisma.js';

async function createUser(email, passwordHash, name) {
    console.log('query creating user');
    await prisma.user.create({
        data: {
            email,
            passwordHash,
            name,
        },
    });
    console.log('query user created');
}

export { createUser };
