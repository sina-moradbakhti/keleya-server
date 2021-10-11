"use strict";
exports.__esModule = true;
exports.authenticateToken = void 0;
var jwt_functions_1 = require("./jwt-functions");
var responses_1 = require("./responses");
var jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    var verification = (0, jwt_functions_1.jwtVerifyToken)(token);
    verification.then(function (result) {
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
