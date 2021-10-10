"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthenticanFailed = exports.DatabaseConnectionSuccess = exports.DatabaseConnectionfailed = void 0;
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
//# sourceMappingURL=responses.js.map