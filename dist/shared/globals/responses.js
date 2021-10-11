"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheUserNotFound = exports.UserUpdatingFailed = exports.UserUpdatedSuccessfully = exports.UserSignInToAccountRegisteredSuccessfully = exports.UserSignInToAccountRequiredFields = exports.UserCreateAccountRequiredFields = exports.UserCreateAccountUserNotFound = exports.UserCreateAccountUserAlreadyExist = exports.UserCreateAccountRegisteredSuccessfully = exports.JwtAuthenticanFailed = exports.DatabaseConnectionSuccess = exports.DatabaseConnectionfailed = void 0;
exports.DatabaseConnectionfailed = {
    status: 503,
    output: {
        status: 503,
        message: 'Server Error #503db123'
    }
};
exports.DatabaseConnectionSuccess = {
    status: 200,
    output: {
        status: 200,
        message: 'Db Connected Successfully.'
    }
};
exports.JwtAuthenticanFailed = {
    status: 403,
    output: {
        status: 403,
        message: 'Authentication Failed!'
    }
};
exports.UserCreateAccountRegisteredSuccessfully = {
    status: 200,
    output: {
        status: 200,
        message: 'The user registered successfully.',
        result: {}
    }
};
exports.UserCreateAccountUserAlreadyExist = {
    status: 403,
    output: {
        status: 403,
        message: 'The user already registered.'
    }
};
exports.UserCreateAccountUserNotFound = {
    status: 403,
    output: {
        status: 403,
        message: 'The user not found.'
    }
};
exports.UserCreateAccountRequiredFields = {
    status: 403,
    output: {
        status: 403,
        message: 'Please send all required fields.'
    }
};
exports.UserSignInToAccountRequiredFields = {
    status: 403,
    output: {
        status: 403,
        message: 'Please send all required fields.'
    }
};
exports.UserSignInToAccountRegisteredSuccessfully = {
    status: 200,
    output: {
        status: 200,
        message: 'The user signed in successfully.',
        result: {}
    }
};
exports.UserUpdatedSuccessfully = {
    status: 200,
    output: {
        status: 200,
        message: 'The user updated successfully.',
        result: {}
    }
};
exports.UserUpdatingFailed = {
    status: 403,
    output: {
        status: 403,
        message: 'The user updating was failed.',
        result: {}
    }
};
exports.TheUserNotFound = {
    status: 403,
    output: {
        status: 403,
        message: 'The user not found.'
    }
};
//# sourceMappingURL=responses.js.map