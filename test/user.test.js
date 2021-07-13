const request = require('supertest');
const mongoose = require('mongoose');

const { app, server } = require('../app');

describe('Test user auth check', () => {
  test('It should auth fail', (done) => {
    request(app)
      .get('/api/user/profile')
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });
});

afterAll((done) => {
  mongoose.disconnect();
  server.close();
  done();
});
