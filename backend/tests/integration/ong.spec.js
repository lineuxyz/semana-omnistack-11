const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  })
  
  it('should be able to create new ONG', async () => {
    const response = await request(app).post('/ongs').send({
        name: "Luisa salva animais",
        email: "apad@apad.com.br",
        whatsapp: 1111111111,
        city: "Iracemapolis",
        uf: "SP"
      });

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
    });
  })