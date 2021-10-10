"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const jwt_functions_1 = require("./shared/globals/jwt-functions");
const middlewares_1 = require("./shared/globals/middlewares");
const responses_1 = require("./shared/globals/responses");
const db_initialize_1 = require("./shared/globals/db.initialize");
//const token_secret = require('crypto').randomBytes(64).toString('hex');
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json()); // support json encoded bodies
app.use(body_parser_1.default.urlencoded({ extended: false })); // support encoded bodies
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Keleya Server</h1>');
});
app.post('/api/users', (req, res) => {
    var token = (0, jwt_functions_1.jwtGenerateToken)({ email: req.body.email });
    res.json({ status: 200, token: token });
});
app.patch('/api/users', middlewares_1.authenticateToken, (req, res) => {
    res.json({
        status: 200,
        message: 'Success'
    });
});
app.post('/api/users/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection = yield (0, db_initialize_1.connect)();
    if (connection) {
        res.status(responses_1.DatabaseConnectionSuccess.status).json(responses_1.DatabaseConnectionSuccess.output);
    }
    else {
        res.status(responses_1.DatabaseConnectionfailed.status).json(responses_1.DatabaseConnectionfailed.output);
    }
}));
app.listen(port, () => {
    return console.log(`Keleya server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map