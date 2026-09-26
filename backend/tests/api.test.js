const request = require('supertest');
const app = require('../src/app');

describe('API Endpoints', () => {
  it('GET /health should return healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /health/db should return properly', async () => {
    const res = await request(app).get('/health/db');
    // It might be connected or disconnected depending on env, but we just check the structure
    expect(res.statusCode).toBeOneOf([200, 500]);
    expect(res.body).toHaveProperty('success');
  });

  it('GET /api/v1/dashboard should require role', async () => {
    const res = await request(app).get('/api/v1/dashboard');
    expect(res.statusCode).toEqual(403);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('GET /api/v1/dashboard should succeed with valid role', async () => {
    const res = await request(app).get('/api/v1/dashboard?role=gm');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('occupancy');
  });

  it('GET /api/v1/forecast should succeed with days=7', async () => {
    const res = await request(app).get('/api/v1/forecast?role=gm&days=7');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('POST /api/v1/simulate should succeed with valid occupancy', async () => {
    const res = await request(app)
      .post('/api/v1/simulate')
      .send({ occupancy: 0.95 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('goppar');
  });

  it('POST /api/v1/simulate should fail with occupancy below 0.60', async () => {
    const res = await request(app).post('/api/v1/simulate').send({ occupancy: 0.5 });
    expect(res.statusCode).toEqual(400);
  });

  it('POST /api/v1/simulate should fail with occupancy above 1.00', async () => {
    const res = await request(app).post('/api/v1/simulate').send({ occupancy: 1.1 });
    expect(res.statusCode).toEqual(400);
  });

  it('POST /api/v1/safe-envelope should succeed', async () => {
    const res = await request(app).post('/api/v1/safe-envelope').send({});
    expect(res.statusCode).toEqual(200);
  });

  it('POST /api/v1/parse-review should succeed', async () => {
    const res = await request(app).post('/api/v1/parse-review').send({});
    expect(res.statusCode).toEqual(200);
  });

  it('POST /api/v1/decision-council should succeed', async () => {
    const res = await request(app).post('/api/v1/decision-council').send({});
    expect(res.statusCode).toEqual(200);
  });

  it('POST /api/v1/generate-plan should succeed', async () => {
    const res = await request(app).post('/api/v1/generate-plan').send({});
    expect(res.statusCode).toEqual(200);
  });

  it('POST /api/v1/approve-plan should require gm or facilities_lead', async () => {
    const res = await request(app).post('/api/v1/approve-plan?role=staff').send({ decision: 'approved' });
    expect(res.statusCode).toEqual(403);
  });

  it('POST /api/v1/approve-plan should fail on invalid decision', async () => {
    const res = await request(app).post('/api/v1/approve-plan?role=gm').send({ decision: 'whatever' });
    expect(res.statusCode).toEqual(400);
  });

  it('POST /api/v1/approve-plan should succeed on valid decision', async () => {
    const res = await request(app).post('/api/v1/approve-plan?role=gm').send({ decision: 'approved' });
    expect(res.statusCode).toEqual(200);
  });

  it('POST /api/v1/schedule should succeed', async () => {
    const res = await request(app).post('/api/v1/schedule?role=gm').send({});
    expect(res.statusCode).toEqual(200);
  });

  it('POST /api/v1/tasks should fail with invalid status', async () => {
    const res = await request(app).post('/api/v1/tasks?role=staff').send({ status: 'unknown' });
    expect(res.statusCode).toEqual(400);
  });

  it('POST /api/v1/tasks should succeed with valid status', async () => {
    const res = await request(app).post('/api/v1/tasks?role=staff').send({ status: 'completed' });
    expect(res.statusCode).toEqual(200);
  });

  it('GET /api/v1/notifications should succeed', async () => {
    const res = await request(app).get('/api/v1/notifications?role=gm');
    expect(res.statusCode).toEqual(200);
  });

  it('Unknown route should return 404 JSON', async () => {
    const res = await request(app).get('/api/v1/unknown-route');
    expect(res.statusCode).toEqual(404);
    expect(res.body.success).toBe(false);
  });
});

// Polyfill for toBeOneOf
expect.extend({
  toBeOneOf(received, values) {
    const pass = values.includes(received);
    return {
      message: () => `expected ${received} to be one of ${values}`,
      pass,
    };
  },
});
