import { prisma } from './prisma.js';

async function createUser(email, passwordHash, name) {
    console.log('query creating user');
    console.log('create user data:', {
        email,
        passwordHash,
        name,
    });
    await prisma.user.create({
        data: {
            email,
            passwordHash,
            name,
            role: 'USER',
        },
    });
    console.log('query user created');
}

export { createUser };
