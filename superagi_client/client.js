const { validateApiKey } = require('./lib/auth');
const Superagi = require('./lib/superagi');
const { AgentConfig, AgentUpdateConfig, AgentRun, AgentRunFilter } = require('./types');

class Client {
    constructor({
                    apiKey,
                    url = "https://app.superagi.com",
                    superagi = null,
                    ...kwargs
                } = {}) {
        if (typeof apiKey !== 'string') throw new TypeError('apiKey is a mandatory field and it should be a string');
        if (typeof url !== 'string') throw new TypeError('url is an optional field and it should be a string');
        if (superagi !== null && !(superagi instanceof Superagi)) throw new TypeError('superagi is an optional field ' +
            'and it should be an instance of Superagi');

        this.apiKey = apiKey;
        this.url = url;
        this.superagi = superagi;

        validateApiKey(this.url, this.apiKey)

        if (this.superagi === null) {
            this.superagi = new Superagi(this.url, this.apiKey);
        }
    }

    async createAgent(agentConfig) {
        if (!(agentConfig instanceof AgentConfig)) {
            throw new TypeError('agentConfig is a mandatory field and it should be an instance of AgentConfig');
        }
        return await this.superagi.createAgent(agentConfig);
    }

    async updateAgent(agentId, agentUpdateConfig) {
        if (!Number.isInteger(agentId)) {
            throw new TypeError('agentId is a mandatory field and it should be an integer');
        }
        if (!(agentUpdateConfig instanceof AgentUpdateConfig)) {
            throw new TypeError('agentUpdateConfig is a mandatory field and ' +
                'it should be an instance of AgentUpdateConfig');
        }
        return await this.superagi.updateAgent(agentId, agentUpdateConfig);
    }

    async pauseAgent(agentId, agentRunIds = null) {
        if (!Number.isInteger(agentId)) {
            throw new TypeError('agentId is a mandatory field and it should be an integer');
        }
        if (agentRunIds !== null && (!Array.isArray(agentRunIds)
            || !agentRunIds.every(item => Number.isInteger(item)))) {
            throw new TypeError('agentRunIds is an optional field and it should be an array of integers');
        }
        return await this.superagi.pauseAgent(agentId, agentRunIds);
    }

    async resumeAgent(agentId, agentRunIds = null) {
        if (!Number.isInteger(agentId)) {
            throw new TypeError('agentId is a mandatory field and it should be an integer');
        }
        if (agentRunIds !== null && (!Array.isArray(agentRunIds)
            || !agentRunIds.every(item => Number.isInteger(item)))) {
            throw new TypeError('agentRunIds is an optional field and it should be an array of integers');
        }
        return await this.superagi.resumeAgent(agentId, agentRunIds);
    }

    async createAgentRun(agentId, agentRun = null) {
        if (!Number.isInteger(agentId)) {
            throw new TypeError('agentId is a mandatory field and it should be an integer');
        }
        if (agentRun !== null && !(agentRun instanceof AgentRun)) {
            throw new TypeError('agentRun is an optional field and it should be an instance of AgentRun');
        }
        return await this.superagi.createAgentRun(agentId, agentRun);
    }

    async getAgentRunStatus(agentId, agentRunFilter = null) {
        if (!Number.isInteger(agentId)) {
            throw new TypeError('agentId is a mandatory field and it should be an integer');
        }
        if (agentRunFilter !== null && !(agentRunFilter instanceof AgentRunFilter)) {
            throw new TypeError('agentRunFilter is an optional field and it should be an instance of AgentRunFilter');
        }
        return await this.superagi.getAgentRunStatus(agentId, agentRunFilter);
    }

    async getAgentRunResources(agentRunIds) {
        if (agentRunIds !== null && (!Array.isArray(agentRunIds)
            || !agentRunIds.every(item => Number.isInteger(item)))) {
            throw new TypeError('agentRunIds is a mandatory field and it should be an array of integers');
        }
        return await this.superagi.getAgentRunResources(agentRunIds);
    }
}

module.exports = {Client: Client};