const axios = require('axios');
const { UnauthorizedException } = require('../Exceptions');

async function validateApiKey(baseUrl, apiKey) {
    try {
        await axios.get(`${baseUrl}/api/api-keys/validate`, { headers: { "X-API-Key": apiKey } });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new UnauthorizedException({additionalInfo: error.response.data});
        }
        throw new Error(`${error.response.status.toString()} => ${error.response.data}`);
    }
}

module.exports = { validateApiKey };