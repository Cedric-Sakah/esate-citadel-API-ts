import { Request, Response } from 'express';
import { Apartment, validateApartment, ApartmentDocument } from '../models/apartment';

// Get all apartments
export const getAllApartments = async (req: Request, res: Response): Promise<void> => {
  try {
    const apartments = await Apartment.find().sort({ available: -1 }); 
    res.send(apartments);
  } catch (err) {
    res.status(500).send('Error fetching apartments.');
  }
};

// Create a new apartment
export const createApartment = async (req: Request, res: Response): Promise<void> => {
  const { error } = validateApartment(req.body); 
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const { propertyId, apartmentNumber, available } = req.body as Partial<ApartmentDocument>;

  try {
    let apartment = new Apartment({ propertyId, apartmentNumber, available });
    apartment = await apartment.save();
    res.send(apartment);
  } catch (err) {
    res.status(500).send('Error creating apartment.');
  }
};

// Update an existing apartment
export const updateApartment = async (req: Request, res: Response): Promise<void> => {
  const { error } = validateApartment(req.body); 
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const { propertyId, apartmentNumber, available } = req.body as Partial<ApartmentDocument>;

  try {
    const apartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      { propertyId, apartmentNumber, available },
      { new: true }
    );

    if (!apartment) {
      res.status(404).send('The apartment with the given ID was not found.');
      return;
    }

    res.send(apartment);
  } catch (err) {
    res.status(500).send('Error updating apartment.');
  }
};

// Delete an apartment
export const deleteApartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const apartment = await Apartment.findByIdAndDelete(req.params.id);

    if (!apartment) {
      res.status(404).send('The apartment with the given ID was not found.');
      return;
    }

    res.send(apartment);
  } catch (err) {
    res.status(500).send('Error deleting apartment.');
  }
};

// Get apartment by ID
export const getApartmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) {
      res.status(404).send('The apartment with the given ID was not found.');
      return;
    }

    res.send(apartment);
  } catch (err) {
    res.status(500).send('Error fetching apartment.');
  }
};
