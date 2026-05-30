import bcrypt from 'bcrypt';
import * as userQueries from '../data/userQueries.js';

async function startPage(req, res) {
    res.send('start page');
}

async function signUp(req, res) {
    const { email, password, name } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    try {
        await userQueries.createUser(email, passwordHash, name);
        res.status(201).send('user created');
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

export { signUp, startPage };
