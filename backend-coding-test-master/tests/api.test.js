'use strict'

const request = require('supertest')

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

const app = require('../src/app')(db)
const buildSchemas = require('../src/schemas')

describe('API tests', () => {
  before((done) => {
    db.serialize((err) => {
      if (err) {
        return done(err)
      }

      buildSchemas(db)

      done()
    })
  })

  describe('GET /health', () => {
    it('should return health', (done) => {
      request(app)
        .get('/health')
        .expect('Content-Type', /text/)
        .expect(200, done)
    })
  })

  describe('GET /rides/:id', () => {
    it('check ride with specific ride id', (done) => {
        request(app)
            .get('/rides/1')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
  })

  describe('POST /rides', () => {
    it('verify if rider name is empty', (done) => {
        request(app)
            .post('/rides')
            .send({"start_lat" : 80, "start_long" : 80, "end_lat" : 80, "end_long" : 80, "rider_name" : "", "driver_name" : "tom", "driver_vehicle" : "audi"})
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
})

describe('POST /rides', () => {
  it('verify if driver name is empty', (done) => {
      request(app)
          .post('/rides')
          .send({"start_lat" : 80, "start_long" : 80, "end_lat" : 80, "end_long" : 80, "rider_name" : "jerry", "driver_name" : "", "driver_vehicle" : "audi"})
          .expect('Content-Type', /json/)
          .expect(200, done);
  })
})

describe('POST /rides', () => {
  it('verify if driver vehicle is empty ', (done) => {
      request(app)
          .post('/rides')
          .send({"start_lat" : 80, "start_long" : 80, "end_lat" : 80, "end_long" : 80,"rider_name" : "jerry", "driver_name" : "tom", "driver_vehicle" : ""})
          .expect('Content-Type', /json/)
          .expect(200, done);
  })
})


describe('POST /rides', () => {
    it('verify start longitute value > 180', (done) => {
        request(app)
            .post('/rides')
            .send({"start_lat" : 90, "start_long" : 300, "end_lat" : 90, "end_long" : 90, "rider_name" : "jerry", "driver_name" : "tom", "driver_vehicle" : "audi"})
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
})

describe('POST /rides', () => {
  it('verify end longitute value > 180', (done) => {
      request(app)
          .post('/rides')
          .send({"start_lat" : 90, "start_long" : 180, "end_lat" : 90, "end_long" : 300, "rider_name" : "jerry", "driver_name" : "tom", "driver_vehicle" : "audi"})
          .expect('Content-Type', /json/)
          .expect(200, done);
  })
})

describe('POST /rides', () => {
    it('check start latitude value < -90', (done) => {
        request(app)
            .post('/rides')
            .send({"start_lat" : -100, "start_long" : 170, "end_lat" : 90, "end_long" : 170, "rider_name" : "jerry", "driver_name" : "driver name", "driver_vehicle" : "driver vehicle"})
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
})

describe('POST /rides', () => {
  it('check end latitude value < -90', (done) => {
      request(app)
          .post('/rides')
          .send({"start_lat" : 80, "start_long" : 170, "end_lat" : -100, "end_long" : 170, "rider_name" : "jerry", "driver_name" : "driver name", "driver_vehicle" : "driver vehicle"})
          .expect('Content-Type', /json/)
          .expect(200, done);
  })
})

describe('POST /rides', () => {
    it('should add a new rides in database', (done) => {
        request(app)
            .post('/rides')
            .send({"start_lat" : 90, "start_long" : 90, "end_lat" : 90, "end_long" : 90,"rider_name" : "jerry", "driver_name" : "tom", "driver_vehicle" : "audi"})
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
})

describe('GET /rides/:offset/:limit', () => {
  it('return rides with pagination', (done) => {
      request(app)
          .get('/rides/0/10')
          .expect('Content-Type', /json/)
          .expect(200, done);
  })
})

})
