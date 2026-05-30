import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';

import { prisma } from '../data/prisma.js';

const customFields = {
    usernameField: 'email',
    passwordField: 'password',
};

passport.use(
    new LocalStrategy(customFields, async (username, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: username,
                },
            });
            if (!user) {
                return done(null, false, { message: 'incorrect username' });
            }

            const match = await bcrypt.compare(password, user.passwordHash);

            if (!match) {
                return done(null, false, { message: 'incorrect password' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        async (payload, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        id: payload.id,
                    },
                });
                if (!user) {
                    return done(null, false);
                }

                return done(null, user);
            } catch (err) {
                return done(err, false);
            }
        }
    )
);
