import bcrypt from 'bcrypt';
import * as userQueries from '../data/userQueries.js';

async function startPage(req, res) {
    res.send('start page');
}

async function signUp(req, res) {
    const { email, password, name } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    try {
        console.log(email, name);

        await userQueries.createUser(email, passwordHash, name);
        res.status(201).json({ message: 'user created' });
        console.log('user created backend');
    } catch (err) {
        console.error('ERROR in signUp:', err); // ← HINZUFÜGEN!

        if (err.code === 'P2002') {
            return res.status(400).json({
                message: 'Email already registered - Unique constraint failed',
            });
        }

        return res.status(500).json({ message: 'Internal server error' });
        // send(err);
    }
}

export { signUp, startPage };
