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
Object.defineProperty(exports, "__esModule", { value: true });
const api_mocha_data_mock_1 = require("./api.mocha.data.mock");
const chai_1 = require("chai");
const jwt_functions_1 = require("../src/shared/globals/jwt-functions");
describe('Authentication', function () {
    it('should return -1 when the value is not present', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let token = (0, jwt_functions_1.jwtGenerateToken)({ email: api_mocha_data_mock_1.MockData.email });
            let verified = yield (0, jwt_functions_1.jwtVerifyToken)(token);
            (0, chai_1.expect)(token).toEqual(verified);
        });
    });
});
//# sourceMappingURL=api.mocha.spec.js.map