import jwt from 'jsonwebtoken';
import { prisma } from '../data/prisma.js';

// //Session basierte Authentifaciton von von Passport
// function localAuth(req, res, next) {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         res.status(401).json({ msg: 'You are not authorized' });
//     }
// }

async function jwtAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log(req);
        return res.status(401).json({ message: 'no authorization header token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(decoded);
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
        });

        if (!user) {
            return res.status(401).json({
                message: 'User not found',
            });
        }
        req.user = user;
        console.log(user);
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export { jwtAuth };
