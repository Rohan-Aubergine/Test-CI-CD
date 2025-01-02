import express from 'express'
const router = express.Router();

import {generateIpoGmp} from '../controllers/ipoController.js';


// Define your routes
// router.get('/health',exampleController.healthCheck)
// router.get('/', exampleController.getExamples);
// router.post('/', exampleController.createExample);
router.get('/generate-gmp',generateIpoGmp)
// router.get('/last-day',ipoController.findHighGmpIposEndingToday)


export default router
// Add more routes as needed
