import express from 'express';
import { postFeedback } from '../controllers/extrasController.js';
import { protect } from '../middleware/authMiddleware.js';
const extraRouter = express.Router();

extraRouter.post('/help/feedback', protect, postFeedback);

export default extraRouter;