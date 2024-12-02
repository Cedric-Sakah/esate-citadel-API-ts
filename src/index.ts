import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/Users'
import propertyRoutes from './routes/Properties';
import loginRoutes from './routes/Login';
import apartmentRoutes from './routes/Apartments';



const app: Express = express();
const port = 3000;

//app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/estate-citadel-ts')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

  app.use('/api/users', userRoutes);
  app.use('/api/properties', propertyRoutes);
  app.use('/api/login', loginRoutes);
  app.use('/api/apartments', apartmentRoutes);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});