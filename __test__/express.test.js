// Testing API and server

const supertest = require('supertest');
const app = require('../src/server/app.js');
const request = supertest(app);

describe('server', () => {
    it('Test express endpoint', async () => {
        const res = await request.get('/getData');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('pass!');
    });
});
