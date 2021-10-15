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
const user_model_1 = require("./shared/models/user.model");
const responses_1 = require("./shared/globals/responses");
//const token_secret = require('crypto').randomBytes(64).toString('hex');
const app = (0, express_1.default)();
const port = 3000;
user_model_1.UserModel.sync();
function checkUserExist(req, res, isSignInCheck = false) {
    return __awaiter(this, void 0, void 0, function* () {
        let found = yield user_model_1.UserModel.findOne(isSignInCheck ?
            { where: { email: req.body.email, password: req.body.password } } :
            { where: { email: req.body.email } });
        if (found !== null) {
            if (!isSignInCheck) {
                res.status(responses_1.UserCreateAccountUserAlreadyExist.status)
                    .json(responses_1.UserCreateAccountUserAlreadyExist.output);
            }
            return found;
        }
        else {
            if (isSignInCheck) {
                res.status(responses_1.UserCreateAccountUserNotFound.status)
                    .json(responses_1.UserCreateAccountUserNotFound.output);
            }
            return null;
        }
    });
}
function checkRequiredFieldsForUpdate(req, res) {
    if (req.body.id === undefined || req.body.email === undefined) {
        res.status(responses_1.UserCreateAccountRequiredFields.status)
            .json(responses_1.UserCreateAccountRequiredFields.output);
        return false;
    }
    return true;
}
function checkRequiredFields(req, res) {
    if (req.body.email === undefined || req.body.password === undefined) {
        res.status(responses_1.UserCreateAccountRequiredFields.status)
            .json(responses_1.UserCreateAccountRequiredFields.output);
        return false;
    }
    return true;
}
function validateUser(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.UserModel.findOne({ where: { email: req.body.email, id: req.body.id } });
    });
}
app.use(body_parser_1.default.json()); // support json encoded bodies
app.use(body_parser_1.default.urlencoded({ extended: false })); // support encoded bodies
app.post('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!checkRequiredFields(req, res))
        return;
    let checkUser = yield checkUserExist(req, res);
    if (checkUser !== null)
        return;
    let user = yield user_model_1.UserModel.create({
        email: req.body.email,
        password: req.body.password,
        accepted_privacy_policy: 1,
        accepted_terms_and_conditions: 1
    });
    // Generate JWT Token
    var token = (0, jwt_functions_1.jwtGenerateToken)({ email: req.body.email });
    // Preparing output
    responses_1.UserCreateAccountRegisteredSuccessfully.output.result = {
        token: token,
        id: user.id
    };
    res.status(responses_1.UserCreateAccountRegisteredSuccessfully.status)
        .json(responses_1.UserCreateAccountRegisteredSuccessfully.output);
}));
app.patch('/api/users', middlewares_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!checkRequiredFieldsForUpdate(req, res))
        return;
    let checkUser = yield validateUser(req);
    if (checkUser === null) {
        res.status(responses_1.TheUserNotFound.status)
            .json(responses_1.TheUserNotFound.output);
        return;
    }
    // Checking allowed fields
    var clearInput = {};
    if (req.body.name !== undefined)
        clearInput.name = req.body.name;
    if (req.body.baby_birth_date !== undefined)
        clearInput.baby_birth_date = req.body.baby_birth_date;
    if (req.body.onboarding_done !== undefined)
        clearInput.onboarding_done = req.body.onboarding_done;
    // Checking allowed fields
    yield user_model_1.UserModel.update(clearInput, { where: { email: checkUser.email, id: checkUser.id } })
        .then(() => {
        // Generate JWT Token
        var token = (0, jwt_functions_1.jwtGenerateToken)({ email: checkUser.email });
        // Preparing output
        responses_1.UserUpdatedSuccessfully.output.result = {
            token: token
        };
        res.status(responses_1.UserUpdatedSuccessfully.status)
            .json(responses_1.UserUpdatedSuccessfully.output);
    }).catch((err) => {
        responses_1.UserUpdatingFailed.output.result = {
            error: err
        };
        res.status(responses_1.UserUpdatingFailed.status)
            .json(responses_1.UserUpdatingFailed.output);
    });
}));
app.post('/api/users/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!checkRequiredFields(req, res))
        return;
    let checkUser = yield checkUserExist(req, res, true);
    if (checkUser === null)
        return;
    // Generate JWT Token
    var token = (0, jwt_functions_1.jwtGenerateToken)({ email: req.body.email });
    // Preparing output
    responses_1.UserSignInToAccountRegisteredSuccessfully.output.result = {
        token: token,
        id: checkUser.id
    };
    res.status(responses_1.UserSignInToAccountRegisteredSuccessfully.status)
        .json(responses_1.UserSignInToAccountRegisteredSuccessfully.output);
}));
app.listen(port, () => {
    return console.log(`Keleya server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map