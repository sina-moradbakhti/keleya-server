"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jwt_functions_1 = require("./jwt-functions");
const responses_1 = require("./responses");
const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    var verification = (0, jwt_functions_1.jwtVerifyToken)(token);
    verification.then((result) => {
        if (result.code === 200) {
            req.user = result.result;
            next();
        }
        else {
            responses_1.JwtAuthenticanFailed.output.message = result.fakeMessage;
            return res.status(responses_1.JwtAuthenticanFailed.status).json(responses_1.JwtAuthenticanFailed.output);
        }
    });
}
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=middlewares.js.map