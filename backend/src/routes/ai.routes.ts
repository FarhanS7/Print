import { Router } from 'express';
import { generateAIArtworkController } from '../controllers/ai.controller.js';

const router = Router();

router.post('/generate', generateAIArtworkController);

export default router;
