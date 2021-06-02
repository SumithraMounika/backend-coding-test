// OBJECT DEFINITIONS

/**
 * @swagger
 *
 * definitions:
 *   Ride:
 *     type: object
 *     required:
 *       - rideID
 *       - startLat
 *       - startLong
 *       - endLat
 *       - endLong
 *       - riderName
 *       - driverName
 *       - driverVehicle
 *     properties:
 *       rideID:
 *         type: integer
 *         format: int64
 *       startLat:
 *         type: integer
 *         format: int64
 *       startLong:
 *         type: integer
 *         format: int64
 *       endLat:
 *         type: integer
 *         format: int64
 *       endLong:
 *         type: integer
 *         format: int64
 *       riderName:
 *         type: string
 *       driverName:
 *         type: string
 *       driverVehicle:
 *         type: string
 *       created:
 *         type: string
 */

// API DEFINITIONS

/**
 * @swagger
 * 
 * tags:
 *  - name: "health"
 *    description: "Operations related to service health"
 *  - name: "rides"
 *    description: "Operations related to active rides"
 */

/**
 * @swagger
 *
 * /health:
 *   get:
 *     tags:
 *       - "health"
 *     description: Show the current service status of the API
 *     responses:
 *       200:
 *         description: Healthy
 *       500:
 *         description: Problem Detected
 */

 /**
 * @swagger
 *
 * /rides:
 *   get:
 *     tags:
 *       - "rides"
 *     description: Show all active rides
 *     responses:
 *       200:
 *         description: Return all active rides
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Ride'
 *       500:
 *         description: Problem Detected
 */

/**
 * @swagger
 *
 * /rides:
 *   post:
 *     tags:
 *       - "rides"
 *     description: Create a new ride
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "Ride object to be added"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Ride"
 *   responses:
 *       200:
 *         description: Return all active rides
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Ride'
 *       500:
 *         description: Problem Detected
 */

 /**
 * @swagger
 *
 * /rides/{id}:
 *   get:
 *     tags:
 *       - "rides"
 *     description: Get ride based on ride ID
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Ride ID"
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Return current ride
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Ride'
 *       500:
 *         description: Problem Detected
 */