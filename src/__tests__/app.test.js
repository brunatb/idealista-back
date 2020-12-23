const app = require("../app");
const supertest = require("supertest");
const agent = supertest(app);
const db = require("../database/index");

afterAll(async () => {
    await db.close();
});
  
beforeAll(async () => {
  await db.query(`DELETE FROM "tasks";`);
});

describe('POST /tasks', () => {
    it('should return 201 and an object with the following attributes: id, name, isChecked and labels', async () => {
        const body = {
            name: 'Teste'
        }

        const result = await agent.post('/tasks').send(body);
        expect(result.status).toBe(201);
        expect(result.body).toMatchObject({
            id: expect.anything(),
            name: 'Teste',
            isChecked: false,
            labels: []
        })
    });

    it('should return 422 when passed invalid name', async () => {
        const body = {
            name: 1
        }

        const result = await agent.post('/tasks').send(body);
        expect(result.status).toBe(422);
    })
})