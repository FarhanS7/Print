import { Router } from 'express';
import { createDesignController, getUserDesignsController } from '../controllers/design.controller.js';

const router = Router();

router.post('/', createDesignController);
router.get('/', getUserDesignsController);

export default router;
