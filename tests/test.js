const axios = require('axios');
const { testCases } = require('./data/testJson');
const { describe, expect, it } = require('@jest/globals');

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3000/api/execute/';

describe('Tests', () => {
    for (const testCase of testCases) {
        it(testCase.name, async () => {
            try {
                const response = await axios.post(ENDPOINT, testCase.reqObject);

                if (response.data.output && typeof response.data.output === 'object') {
                    expect(response.data.output.score).toBeDefined();
                    expect(response.data.output.rationale.positives).toBeDefined();
                    expect(response.data.output.rationale.negatives).toBeDefined();
                    expect(response.data.output.points).toBeDefined();
                } else {
                    expect(response.data.output).toBe(testCase.expectedResponse.val);
                }
                expect(response.status).toBe(testCase.expectedResponse.status);
                expect(response.data.error).toBe(testCase.expectedResponse.error);
            } catch (error) {
                if (error.response) {
                    expect(error.response.data.output).toBe(testCase.expectedResponse.val);
                    expect(error.response.status).toBe(testCase.expectedResponse.status);
                    expect(error.response.data.error).toBe(testCase.expectedResponse.error);
                } else {
                    throw error;
                }
            }
        }, 15000);
    }
});
