import express from 'express';
import indexRouter from './routes/indexRouter.js';
import './config/passport.js'; //loads config file
import passport from 'passport'; //loads framework to get initialize function
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: 'http://localhost:5173',
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());

// makes local variables visible in entire app
// app.use((req, res, next) => {
//     res.locals.currentUser = req.user;
//     next();
// });

app.use('/', indexRouter);

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`App listening on port ${PORT}`);
});
