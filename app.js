import express from 'express';
import indexRouter from './routes/indexRouter.js';
import './config/passport.js'; //loads config file
import passport from 'passport'; //loads framework to get initialize function

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use('/', indexRouter);

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`App listening on port ${PORT}`);
});
