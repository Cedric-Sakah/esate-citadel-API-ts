import express from 'express';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import * as apartmentController from '../controllers/apartmentController'; 

const router = express.Router();

// Define routes
router.get('/', apartmentController.getAllApartments);
router.post('/', apartmentController.createApartment);
router.put('/:id', apartmentController.updateApartment);
router.delete('/:id', apartmentController.deleteApartment);
router.get('/:id', apartmentController.getApartmentById);

export default router;
