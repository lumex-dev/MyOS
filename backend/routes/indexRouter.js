import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import * as indexController from '../controllers/indexController.js';
import { jwtAuth } from '../controllers/authMiddleware.js';

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
                // role: user.role,
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
            user, //xyz ist das gut hier? - ja, damit kannst du im Frontend die Userdaten direkt nach dem Login nutzen, ohne nochmal einen Request an /me schicken zu müssen
        });
    })(req, res, next);
});

indexRouter.get('/me', jwtAuth, (req, res) => {
    // console.log(req);
    res.json({
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
    });
});

// indexRouter.post('/logout', (req, res, next) => {
//     req.logout((err) => {
//         if (err) {
//             return next(err);
//         }
//         res.redirect('/');
//     });
// });
export default indexRouter;
