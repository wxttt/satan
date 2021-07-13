const request = require('supertest');
const mongoose = require('mongoose');

const { app, server } = require('../app');

describe('Test Character Get API', () => {
  test('It should response the GET method', (done) => {
    request(app)
      .get('/api/character')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

afterAll((done) => {
  mongoose.disconnect();
  server.close();
  done();
});
