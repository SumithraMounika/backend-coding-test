'use strict';

const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const logger = require('../Utils/logger');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


module.exports = (db) => {
    

    app.get('/health', (req, res) => res.send('Healthy'));

    app.post('/rides', jsonParser, (req, res) => {
        
        const startLatitude = Number(req.body.start_lat);
        const startLongitude = Number(req.body.start_long);
        const endLatitude = Number(req.body.end_lat);
        const endLongitude = Number(req.body.end_long);
        const riderName = req.body.rider_name;
        const driverName = req.body.driver_name;
        const driverVehicle = req.body.driver_vehicle;

        if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
            });
        }

        if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
            });
        }

        if (typeof riderName !== 'string' || riderName.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string'
            });
        }

        if (typeof driverName !== 'string' || driverName.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string'
            });
        }

        if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string'
            });
        }

        var values = [req.body.start_lat, req.body.start_long, req.body.end_lat, req.body.end_long, req.body.rider_name, req.body.driver_name, req.body.driver_vehicle];
       try{ 
            var results = await new repository(db).insertRides(values).then((data) => {
                    return new repository(db).selectRidesById(data.data);
                }).catch((err) => {
                    res.status(500).send(err);
                });
                 res.status(200).send(results);
        } catch(e){
            return res.status(500).send({
                error_code: library.SERVER_ERROR,
                message: e.message
            });
        }        
        logger.info("Server sent the rider information");
    });

    app.get('/rides/:offset/:limit', (req, res) => {
        var offset = Number(req.params.offset),
            limit = Number(req.params.limit);
        db.all('SELECT * FROM Rides ORDER BY rideId ASC LIMIT ? OFFSET ?',[limit, offset], function (err, rows) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }

            if (rows.length === 0) {
                return res.send({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                    
                });
            }

            res.send(rows);
            logger.info("Server sent the rides");
        });
    });

    app.get('/rides/:id', (req, res) => {
        db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, function (err, rows) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }

            if (rows.length === 0) {
                return res.send({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                });
            }

            res.send(rows);
        });
        logger.info("Server sent particular ride info");
    });

    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    return app;
};
