import express from 'express';
const router = express.Router();
import { registerViewController, registerUserController, loginViewController, loginUserController } from '../controllers/user.controller.js';

router.get('/register', registerViewController);
router.post('/register', registerUserController);

router.get('/login', loginViewController);
router.post('/login', loginUserController);

export default router;