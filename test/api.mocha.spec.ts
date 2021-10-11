import { MockData } from './api.mocha.data.mock';
import { expect } from 'chai';
import { jwtGenerateToken, jwtVerifyToken } from '../src/shared/globals/jwt-functions';

describe('Authentication', function () {
  it('should return -1 when the value is not present', async function () {
    let token = jwtGenerateToken({ email: MockData.email });
    let verified = await jwtVerifyToken(token);

    expect(token).toEqual(verified);
  });
});