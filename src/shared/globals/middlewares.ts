import { jwtVerifyToken } from './jwt-functions';
import { JwtAuthenticanFailed } from './responses';
const jwt = require('jsonwebtoken');

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    var verification = jwtVerifyToken(token);
    verification.then((result) => {
        if (result.code === 200) {
            req.user = result.result;
            next()
        } else {
            JwtAuthenticanFailed.output.message = result.fakeMessage;
            return res.status(JwtAuthenticanFailed.status).json(JwtAuthenticanFailed.output);
        }
    })
}