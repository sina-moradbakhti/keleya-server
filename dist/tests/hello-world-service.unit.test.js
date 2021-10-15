"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("@testdeck/mocha");
const chai_1 = require("chai");
let HelloWorldServiceUnitTests = class HelloWorldServiceUnitTests {
    before() {
        this.loggerMock = true; //mock(Logger);
        this.SUT = true; //new HelloWorldService(instance(this.loggerMock));
    }
    'should SUT equal to loggerMock'() {
        (0, chai_1.expect)(this.SUT).to.deep.equal(this.loggerMock);
    }
};
__decorate([
    mocha_1.test
], HelloWorldServiceUnitTests.prototype, "should SUT equal to loggerMock", null);
HelloWorldServiceUnitTests = __decorate([
    mocha_1.suite
], HelloWorldServiceUnitTests);
//# sourceMappingURL=hello-world-service.unit.test.js.map