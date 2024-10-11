const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController');

// Define your routes
router.get('/health',exampleController.healthCheck)
router.get('/', exampleController.getExamples);
router.post('/', exampleController.createExample);

module.exports =router
// Add more routes as needed
