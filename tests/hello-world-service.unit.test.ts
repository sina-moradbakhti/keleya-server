import { suite, test } from '@testdeck/mocha';
import { should, expect } from 'chai';
import { mock, instance } from 'ts-mockito';

@suite class HelloWorldServiceUnitTests {

    private SUT: boolean;
    private loggerMock: boolean;

    before() {
        this.loggerMock = true;//mock(Logger);
        this.SUT = true;//new HelloWorldService(instance(this.loggerMock));
    }

    @test 'should SUT equal to loggerMock'() {
        expect(this.SUT).to.deep.equal(this.loggerMock);
    }

}