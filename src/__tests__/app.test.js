const app = require("../app");
const supertest = require("supertest");
const agent = supertest(app);
const db = require("../database/index");

afterAll(async () => {
    await deleteFromDb();
    await db.close();
});
  
beforeAll(async () => {
  await deleteFromDb() 
});

async function deleteFromDb() {
    await db.query(`DELETE FROM "tasks";`);
}

async function insertDb() {
    const tasksInsertionQuery = `INSERT INTO "tasks" (name) values ('teste'), ('teste1'), ('teste2'), ('teste3') RETURNING *;`;
    const tasks = await db.query(tasksInsertionQuery);
    return tasks;
}

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
        await deleteFromDb();
    })
})

describe('GET /tasks', () => {
    it('should return 200 and an array with length equals 4', async () => {
        await insertDb();
        const result = await agent.get('/tasks');

        expect(result.status).toBe(200);
        expect(result.body.length).toBe(4);
        await deleteFromDb();
    })
})

describe('PUT /tasks/:id', () => {
    it('should return 200 and an object with the following attributes: id, name, isChecked', async () =>{
        const tasks = await insertDb();
        const body = {
            isChecked: true,
        }

        const result = await agent.put(`/tasks/${tasks[0][0].id}`).send(body);

        expect(result.status).toBe(200);
        expect(result.body).toMatchObject({
            id: tasks[0][0].id,
            name: 'teste',
            isChecked: true,
        })

        await deleteFromDb();
    })

    it('should return 422 when passed invalid params', async () =>{
        const tasks = await insertDb();
        const body = {
            isChecked: 1,
        }

        const result = await agent.put(`/tasks/${tasks[0][0].id}`).send(body);

        expect(result.status).toBe(422);

        await deleteFromDb();
    })

    it('should return 404 when id is not found', async () =>{
        const tasks = await insertDb();
        const body = {
            isChecked: true,
        }

        const result = await agent.put(`/tasks/1`).send(body);

        expect(result.status).toBe(404);

        await deleteFromDb();
    })
})

describe('DELETE /tasks/:id', () => {
    it('should return 200', async () => {
        const tasks = await insertDb();
     
        const result = await agent.delete(`/tasks/${tasks[0][0].id}`);

        expect(result.status).toBe(200);
    })

    it('should return 404 when id is not found', async () => {
        const tasks = await insertDb();

        const result = await agent.delete(`/tasks/1`);

        expect(result.status).toBe(404);
    })
})