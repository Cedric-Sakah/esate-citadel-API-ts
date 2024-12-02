import express, { Router } from 'express';
import * as propertiesController from '../controllers/propertiesController';


const router: Router = express.Router();

router.get('/', propertiesController.getAllProperties);
router.post('/',  propertiesController.createProperty);
router.put('/:id', propertiesController.updateProperty);
router.delete('/:id', propertiesController.deleteProperty);
router.get('/:id',propertiesController.getPropertyById);

export default router;
