const axios = require('axios');
const { httpStatusCodeToException } = require('../exceptions');
const humps = require('humps')

class Superagi {
    constructor(baseUrl, apiKey) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    async createAgent(agentConfig) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/api/v1/agent`,
                humps.decamelizeKeys(agentConfig),
                { headers: { "X-api-key": this.apiKey } }
            );
            return humps.camelizeKeys(response.data);
        } catch (error) {
            if (error.response) {
                httpStatusCodeToException(error.response.status, error.response.data);
            }
            throw new Error(`${error.response.status.toString()} => ${error.response.data}`);
        }
    }

    async updateAgent(agentId, agentUpdateConfig) {
        try {
            const response = await axios.put(
                `${this.baseUrl}/api/v1/agent/${agentId}`,
                humps.decamelizeKeys(agentUpdateConfig),
                { headers: { "X-api-key": this.apiKey } }
            );
            return humps.camelizeKeys(response.data);
        } catch (error) {
            if (error.response) {
                httpStatusCodeToException(error.response.status, error.response.data);
            }
            throw new Error(`${error.response.status.toString()} => ${error.response.data}`);
        }
    }

    async pauseAgent(agentId, agentRunIds = null) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/api/v1/agent/${agentId}/pause`,
                agentRunIds ? { run_ids: agentRunIds } : {},
                { headers: { "X-api-key": this.apiKey } }
            );
            return humps.camelizeKeys(response.data);
        } catch (error) {
            if (error.response) {
                httpStatusCodeToException(error.response.status, error.response.data);
            }
            throw new Error(`${error.response.status.toString()} => ${error.response.data}`);
        }
    }

    async resumeAgent(agentId, agentRunIds = null) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/api/v1/agent/${agentId}/resume`,
                agentRunIds ? { run_ids: agentRunIds } : {},
                { headers: { "X-api-key": this.apiKey } }
            );
            return humps.camelizeKeys(response.data);
        } catch (error) {
            if (error.response) {
                httpStatusCodeToException(error.response.status, error.response.data);
            }
            throw new Error(`${error.response.status.toString()} => ${error.response.data}`);
        }
    }

    async createAgentRun(agentId, agentRun = null) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/api/v1/agent/${agentId}/run`,
                humps.decamelizeKeys(agentRun) || {},
                { headers: { "X-api-key": this.apiKey } }
            );
            return humps.camelizeKeys(response.data);
        } catch (error) {
            if (error.response) {
                httpStatusCodeToException(error.response.status, error.response.data);
            }
            throw new Error(`${error.response.status.toString()} => ${error.response.data}`);
        }
    }

    async getAgentRunStatus(agentId, agentRunFilter = null) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/api/v1/agent/${agentId}/run-status`,
                humps.decamelizeKeys(agentRunFilter) || {},
                { headers: { "X-api-key": this.apiKey } }
            );
            return humps.camelizeKeys(response.data);
        } catch (error) {
            if (error.response) {
                httpStatusCodeToException(error.response.status, error.response.data);
            }
            throw new Error(`${error.response.status.toString()} => ${error.response.data}`);
        }
    }

    async getAgentRunResources(agentRunIds) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/api/v1/agent/resources/output`,
                { run_ids: agentRunIds },
                { headers: { "X-api-key": this.apiKey } }
            );
            return humps.camelizeKeys(response.data);
        } catch (error) {
            if (error.response) {
                httpStatusCodeToException(error.response.status, error.response.data);
            }
            throw new Error(`${error.response.status.toString()} => ${error.response.data}`);
        }
    }
}

module.exports = Superagi;