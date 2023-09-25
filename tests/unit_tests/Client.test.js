const { Client } = require('../../superagi_client/Client');
const { AgentConfig, AgentUpdateConfig, AgentRun, AgentRunFilter } = require('../../superagi_client/Types');
const Superagi = require('../../superagi_client/lib/Superagi');

jest.mock('../../superagi_client/lib/Superagi');

let client;

beforeEach(() => {
    client = new Client({ apiKey: "test_key", url: "http://mockurl.com" });
});

test('createAgent', async () => {
    const agentConfig = new AgentConfig({
        name: "test",
        description: "test",
        iterationInterval: 1,
        model: "test",
        maxIterations: 1,
        goal: ["goal1", "goal2"],
        instruction: ["instruction1", "instruction2"],
        agentWorkflow: "workflow",
        constraints: ["constraint1", "constraint2"],
        tools: [{ name: "tool1" }, { name: "tool2" }]
    });

    Superagi.prototype.createAgent.mockResolvedValue({ id: 1 });

    const response = await client.createAgent(agentConfig);

    expect(response).toEqual({ id: 1 });
});

test('updateAgent', async () => {
    const agentUpdateConfig = new AgentUpdateConfig({ name: "test" });

    Superagi.prototype.updateAgent.mockResolvedValue({ id: 1 });

    const response = await client.updateAgent(1, agentUpdateConfig);

    expect(response).toEqual({ id: 1 });
});

test('pauseAgent', async () => {
    Superagi.prototype.pauseAgent.mockResolvedValue({ status: "paused" });

    const response = await client.pauseAgent(1);

    expect(response).toEqual({ status: "paused" });
});

test('resumeAgent', async () => {
    Superagi.prototype.resumeAgent.mockResolvedValue({ status: "resumed" });

    const response = await client.resumeAgent(1);

    expect(response).toEqual({ status: "resumed" });
});

test('createAgentRun', async () => {
    const agentRun = new AgentRun({ name: "test" });

    Superagi.prototype.createAgentRun.mockResolvedValue({ id: 1 });

    const response = await client.createAgentRun(1, agentRun);

    expect(response).toEqual({ id: 1 });
});

test('getAgentRunStatus', async () => {
    const agentRunFilter = new AgentRunFilter({ runIds: [1] });

    Superagi.prototype.getAgentRunStatus.mockResolvedValue({ status: "running" });

    const response = await client.getAgentRunStatus(1, agentRunFilter);

    expect(response).toEqual({ status: "running" });
});

test('getAgentRunResources', async () => {
    Superagi.prototype.getAgentRunResources.mockResolvedValue({ resources: [] });

    const response = await client.getAgentRunResources([1]);

    expect(response).toEqual({ resources: [] });
});