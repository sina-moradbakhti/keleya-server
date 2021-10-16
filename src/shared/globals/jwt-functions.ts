import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtCallbackResult } from '../models/jwt.res';

dotenv.config();

const EXPIRES = '1800s';

export function jwtGenerateToken(username): string {
    var token = jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: EXPIRES });
    return token;
}

export async function jwtVerifyToken(token): Promise<JwtCallbackResult> {
    var callback: JwtCallbackResult = {};
    try {
        var res = await jwt.verify(token, process.env.TOKEN_SECRET);
        callback.code = 200;
        callback.message = '';
        callback.fakeMessage = '';
        callback.result = res;
    } catch (er) {
        callback.code = 401;
        callback.message = er.message;
        callback.fakeMessage = 'Token is not valid!';
        if(er.message === 'jwt expired') callback.fakeMessage = 'Token expired!';
    }

    return callback;
}