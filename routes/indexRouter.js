import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import * as indexController from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/', indexController.startPage);
indexRouter.post('/signup', indexController.signUp);

indexRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                message: info?.message || 'Login failed',
            });
        }
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '23h',
            }
        );
        console.log('login successful');
        return res.json({
            message: 'Login successful',
            token,
        });
    })(req, res, next);
});

export default indexRouter;
