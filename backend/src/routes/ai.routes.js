import { Router } from 'express';
import { generateAIArtworkController } from '../controllers/ai.controller';
const router = Router();
router.post('/generate', generateAIArtworkController);
export default router;
//# sourceMappingURL=ai.routes.js.map