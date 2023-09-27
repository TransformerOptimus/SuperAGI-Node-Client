const { validateApiKey } = require('./lib/Auth');
const Superagi = require('./lib/Superagi');
const { AgentConfig, AgentUpdateConfig, AgentRun, AgentRunFilter } = require('./Types');

class Client {
    /**
     * Initialize the Client.
     *
     * @param {Object} options - The options for the client.
     * @param {string} options.apiKey - The API key for authentication.
     * @param {string} [options.url="https://app.superagi.com"] - The URL of the Superagi service.
     * @param {Superagi} [options.superagi=null] - An instance of the Superagi class.
     * @param {Object} options.kwargs - Additional keyword arguments.
     */
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

    /**
     * Create a new agent.
     *
     * @param {AgentConfig} agentConfig - The configuration for the new agent.
     * @returns {Promise<Object>} A promise that resolves to an object containing the ID of the newly created agent.
     */
    async createAgent(agentConfig) {
        if (!(agentConfig instanceof AgentConfig)) {
            throw new TypeError('agentConfig is a mandatory field and it should be an instance of AgentConfig');
        }
        return await this.superagi.createAgent(agentConfig);
    }

    /**
     * Update an existing agent.
     *
     * @param {number} agentId - The ID of the agent to update.
     * @param {AgentUpdateConfig} agentUpdateConfig - The new configuration for the agent.
     * @returns {Promise<Object>} A promise that resolves to an object containing the ID of the updated agent.
     */
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

    /**
     * Pause an agent.
     *
     * @param {number} agentId - The ID of the agent to pause.
     * @param {Array<number>} [agentRunIds=null] - The IDs of the agent runs to pause.
     * @returns {Promise<Object>} A promise that resolves to an object indicating whether the operation was successful.
     */
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

    /**
     * Resume an agent.
     *
     * @param {number} agentId - The ID of the agent to resume.
     * @param {Array<number>} agentRunIds - The IDs of the agent runs to resume.
     * @returns {Promise<Object>} A promise that resolves to an object indicating whether the operation was successful.
     */
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

    /**
     * Create a new agent run.
     *
     * @param {number} agentId - The ID of the agent to run.
     * @param {AgentRun} [agentRun=null] - The configuration for the new agent run.
     * @returns {Promise<Object>} A promise that resolves to an object containing the ID of the newly created agent run.
     */
    async createAgentRun(agentId, agentRun = null) {
        if (!Number.isInteger(agentId)) {
            throw new TypeError('agentId is a mandatory field and it should be an integer');
        }
        if (agentRun !== null && !(agentRun instanceof AgentRun)) {
            throw new TypeError('agentRun is an optional field and it should be an instance of AgentRun');
        }
        return await this.superagi.createAgentRun(agentId, agentRun);
    }

    /**
     * Get the status of an agent run.
     *
     * @param {number} agentId - The ID of the agent.
     * @param {AgentRunFilter} [agentRunFilter=null] - The filter to apply to the agent runs.
     * @returns {Promise<Array<Object>>} A promise that resolves to a list of objects containing the run IDs
     * and their statuses.
     */
    async getAgentRunStatus(agentId, agentRunFilter = null) {
        if (!Number.isInteger(agentId)) {
            throw new TypeError('agentId is a mandatory field and it should be an integer');
        }
        if (agentRunFilter !== null && !(agentRunFilter instanceof AgentRunFilter)) {
            throw new TypeError('agentRunFilter is an optional field and it should be an instance of AgentRunFilter');
        }
        return await this.superagi.getAgentRunStatus(agentId, agentRunFilter);
    }

    /**
     * Get the resources of an agent run.
     *
     * @param {Array<number>} agentRunIds - The IDs of the agent runs.
     * @returns {Promise<Object>} A promise that resolves to an object containing the run IDs and their
     * associated resources.
     */
    async getAgentRunResources(agentRunIds) {
        if (agentRunIds !== null && (!Array.isArray(agentRunIds)
            || !agentRunIds.every(item => Number.isInteger(item)))) {
            throw new TypeError('agentRunIds is a mandatory field and it should be an array of integers');
        }
        return await this.superagi.getAgentRunResources(agentRunIds);
    }agentRunIds
}

module.exports = {Client: Client};