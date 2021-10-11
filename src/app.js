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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var jwt_functions_1 = require("./shared/globals/jwt-functions");
var middlewares_1 = require("./shared/globals/middlewares");
var user_model_1 = require("./shared/models/user.model");
var responses_1 = require("./shared/globals/responses");
//const token_secret = require('crypto').randomBytes(64).toString('hex');
var app = (0, express_1["default"])();
var port = 3000;
var db = require('./shared/models/user.seq.model');
user_model_1.UserModel.sync();
function checkUserExist(req, res, isSignInCheck) {
    if (isSignInCheck === void 0) { isSignInCheck = false; }
    return __awaiter(this, void 0, void 0, function () {
        var found;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_model_1.UserModel.findOne(isSignInCheck ?
                        { where: { email: req.body.email, password: req.body.password } } :
                        { where: { email: req.body.email } })];
                case 1:
                    found = _a.sent();
                    if (found !== null) {
                        if (!isSignInCheck) {
                            res.status(responses_1.UserCreateAccountUserAlreadyExist.status)
                                .json(responses_1.UserCreateAccountUserAlreadyExist.output);
                        }
                        return [2 /*return*/, found];
                    }
                    else {
                        if (isSignInCheck) {
                            res.status(responses_1.UserCreateAccountUserNotFound.status)
                                .json(responses_1.UserCreateAccountUserNotFound.output);
                        }
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_model_1.UserModel.findOne({ where: { email: req.body.email, id: req.body.id } })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
app.use(body_parser_1["default"].json()); // support json encoded bodies
app.use(body_parser_1["default"].urlencoded({ extended: false })); // support encoded bodies
app.post('/api/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var checkUser, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!checkRequiredFields(req, res))
                    return [2 /*return*/];
                return [4 /*yield*/, checkUserExist(req, res)];
            case 1:
                checkUser = _a.sent();
                if (checkUser !== null)
                    return [2 /*return*/];
                return [4 /*yield*/, user_model_1.UserModel.create({
                        email: req.body.email,
                        password: req.body.password,
                        accepted_privacy_policy: 1,
                        accepted_terms_and_conditions: 1
                    })];
            case 2:
                user = _a.sent();
                token = (0, jwt_functions_1.jwtGenerateToken)({ email: req.body.email });
                // Preparing output
                responses_1.UserCreateAccountRegisteredSuccessfully.output.result = {
                    token: token,
                    id: user.id
                };
                res.status(responses_1.UserCreateAccountRegisteredSuccessfully.status)
                    .json(responses_1.UserCreateAccountRegisteredSuccessfully.output);
                return [2 /*return*/];
        }
    });
}); });
app.patch('/api/users', middlewares_1.authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var checkUser, clearInput;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!checkRequiredFieldsForUpdate(req, res))
                    return [2 /*return*/];
                return [4 /*yield*/, validateUser(req)];
            case 1:
                checkUser = _a.sent();
                if (checkUser === null) {
                    res.status(responses_1.TheUserNotFound.status)
                        .json(responses_1.TheUserNotFound.output);
                    return [2 /*return*/];
                }
                clearInput = {};
                if (req.body.name !== undefined)
                    clearInput.name = req.body.name;
                if (req.body.baby_birth_date !== undefined)
                    clearInput.baby_birth_date = req.body.baby_birth_date;
                if (req.body.onboarding_done !== undefined)
                    clearInput.onboarding_done = req.body.onboarding_done;
                // Checking allowed fields
                return [4 /*yield*/, user_model_1.UserModel.update(clearInput, { where: { email: checkUser.email, id: checkUser.id } })
                        .then(function () {
                        // Generate JWT Token
                        var token = (0, jwt_functions_1.jwtGenerateToken)({ email: checkUser.email });
                        // Preparing output
                        responses_1.UserUpdatedSuccessfully.output.result = {
                            token: token
                        };
                        res.status(responses_1.UserUpdatedSuccessfully.status)
                            .json(responses_1.UserUpdatedSuccessfully.output);
                    })["catch"](function (err) {
                        responses_1.UserUpdatingFailed.output.result = {
                            error: err
                        };
                        res.status(responses_1.UserUpdatingFailed.status)
                            .json(responses_1.UserUpdatingFailed.output);
                    })];
            case 2:
                // Checking allowed fields
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.post('/api/users/auth', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var checkUser, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!checkRequiredFields(req, res))
                    return [2 /*return*/];
                return [4 /*yield*/, checkUserExist(req, res, true)];
            case 1:
                checkUser = _a.sent();
                if (checkUser === null)
                    return [2 /*return*/];
                token = (0, jwt_functions_1.jwtGenerateToken)({ email: req.body.email });
                // Preparing output
                responses_1.UserSignInToAccountRegisteredSuccessfully.output.result = {
                    token: token,
                    id: checkUser.id
                };
                res.status(responses_1.UserSignInToAccountRegisteredSuccessfully.status)
                    .json(responses_1.UserSignInToAccountRegisteredSuccessfully.output);
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    return console.log("Keleya server is listening on " + port);
});
