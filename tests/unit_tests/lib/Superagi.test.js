const axios = require('axios');
const Superagi = require('../../../superagi_client/lib/Superagi');
const nock = require('nock');

describe('Superagi', () => {
    let superagi;
    beforeEach(() => {
        superagi = new Superagi('http://test.com', 'test_key');
    });

    it('should create an agent', async () => {
        const agentConfig = {
            name: 'test',
            description: 'test',
            iterationInterval: 1,
            model: 'test',
            maxIterations: 1,
            goal: ['goal1', 'goal2'],
            instruction: ['instruction1', 'instruction2'],
            agentWorkflow: 'workflow',
            constraints: ['constraint1', 'constraint2'],
            tools: [{ name: 'tool1' }, { name: 'tool2' }],
        };

        nock('http://test.com')
            .post('/api/v1/agent')
            .reply(200, { id: 1 });

        const response = await superagi.createAgent(agentConfig);
        expect(response).toEqual({ id: 1 });
    });

    it('should update an agent', async () => {
        const agentUpdateConfig = { name: 'test' };

        nock('http://test.com')
            .put('/api/v1/agent/1')
            .reply(200, { id: 1 });

        const response = await superagi.updateAgent(1, agentUpdateConfig);
        expect(response).toEqual({ id: 1 });
    });

    it('should pause an agent', async () => {
        nock('http://test.com')
            .post('/api/v1/agent/1/pause')
            .reply(200, { status: 'paused' });

        const response = await superagi.pauseAgent(1);
        expect(response).toEqual({ status: 'paused' });
    });

    it('should resume an agent', async () => {
        nock('http://test.com')
            .post('/api/v1/agent/1/resume')
            .reply(200, { status: 'resumed' });

        const response = await superagi.resumeAgent(1);
        expect(response).toEqual({ status: 'resumed' });
    });

    it('should create an agent run', async () => {
        const agentRun = { name: 'test' };

        nock('http://test.com')
            .post('/api/v1/agent/1/run')
            .reply(200, { id: 1 });

        const response = await superagi.createAgentRun(1, agentRun);
        expect(response).toEqual({ id: 1 });
    });

    it('should get agent run status', async () => {
        const agentRunFilter = { runIds: [1] };

        nock('http://test.com')
            .post('/api/v1/agent/1/run-status')
            .reply(200, { status: 'running' });

        const response = await superagi.getAgentRunStatus(1, agentRunFilter);
        expect(response).toEqual({ status: 'running' });
    });

    it('should get agent run resources', async () => {
        nock('http://test.com')
            .post('/api/v1/agent/resources/output')
            .reply(200, { resources: [] });

        const response = await superagi.getAgentRunResources([1]);
        expect(response).toEqual({ resources: [] });
    });

    afterEach(() => {
        nock.cleanAll();
    });
});
