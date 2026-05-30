import jwt from 'jsonwebtoken';

// //Session basierte Authentifaciton von von Passport
// function localAuth(req, res, next) {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         res.status(401).json({ msg: 'You are not authorized' });
//     }
// }

function jwtAuth(req, res, next) {
    const authHeader = req.header.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'no authorization header token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(decoded);
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export { jwtAuth, localAuth };
