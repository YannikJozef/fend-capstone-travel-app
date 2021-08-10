// Testing API and server

const supertest = require('supertest');
import app from '../src/server/index.js';
const server = supertest(app);

describe('server', () => {
    it('Test express endpoint', async () => {
        const res = await server.get('/all');
        return res;
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined;
    });
});