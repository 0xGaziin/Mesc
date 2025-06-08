import express from 'express';
import * as usersController from '../controllers/userController.js';

const router = express.Router();

export default router.post('/api/users/register', usersController.register); // - Registration route.