const request = require('supertest');
const mongoose = require('mongoose');

const { app, server } = require('../app');

describe('Test an empty path', () => {
  test('It should return status 404', (done) => {
    request(app)
      .get('/does/not/exist')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

afterAll((done) => {
  mongoose.disconnect();
  server.close();
  done();
});
