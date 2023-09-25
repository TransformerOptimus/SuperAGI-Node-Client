const nock = require('nock');
const { validateApiKey } = require('../../../superagi_client/lib/Auth');
const { UnauthorizedException } = require('../../../superagi_client/Exceptions');

describe('validateApiKey', () => {
    const baseUrl = 'http://test.com';
    const apiKey = 'test-api-key';

    afterEach(() => {
        nock.cleanAll();
    });

    it('should validate the API key successfully', async () => {
        nock(baseUrl)
            .get('/api/api-keys/validate')
            .reply(200);

        await validateApiKey(baseUrl, apiKey);
    });

    it('should throw UnauthorizedException for 401 response', async () => {
        const errorData = { message: 'Unauthorized' };
        nock(baseUrl)
            .get('/api/api-keys/validate')
            .reply(401, errorData);

        await expect(validateApiKey(baseUrl, apiKey)).rejects.toThrow(UnauthorizedException);
    });
});