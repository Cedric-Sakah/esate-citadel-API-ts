import express from 'express';
import mongoose from 'mongoose';
import { login } from '../controllers/logincontroller';

const router = express.Router();

// POST route for login
router.post('/', login);

export default router;
