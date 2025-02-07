import express from 'express'
const router = express.Router();
import { healthCheck } from '../controllers/exampleController.js';
import {generateIpoGmp} from '../controllers/ipoController.js';


// Define your routes
router.get('/health',healthCheck)
router.get('/generate-gmp',generateIpoGmp)


export default router
// Add more routes as needed
