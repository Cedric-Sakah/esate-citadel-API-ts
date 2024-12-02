import express, { Router } from 'express';
import mongoose from 'mongoose';
import { getAllUsers, createUser, updateUser, deleteUser, getUserById } from '../controllers/usersController';


const router: Router = express.Router();

// Route to get all users (only accessible by owners)
router.get('/', getAllUsers);

// Route to create a new user
router.post('/', createUser);

// Route to update a user (requires customer authentication)
router.put('/:id', updateUser);

// Route to delete a user (requires customer authentication)
router.delete('/:id',  deleteUser);

// Route to get a user by ID (requires customer authentication)
router.get('/:id', getUserById);

export default router;
