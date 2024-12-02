import { Request, Response, NextFunction } from 'express';
import { Property, validateProperty, PropertyDocument } from '../models/property';
import formidable, { Files } from 'formidable';

import fs from 'fs';

// Get all properties
export const getAllProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const properties = await Property.find().sort('createdAt');
    res.send(properties);
  } catch (err) {
    res.status(500).send('Error fetching properties.');
  }
};

// Create a new property
export const createProperty = (req: Request, res: Response, next: NextFunction): void => {
  const form = formidable({ keepExtensions: true }); 
 console.log(req.body)
  form.parse(req, async (err, fields: any, files: formidable.Files) => {
    if (err) {
      return res.status(400).json({ message: 'Image could not be uploaded' });
    }
console.log(fields)
    const body: Property = {
      name: fields.name,
      description: fields.description,
      location: fields.location,
      ownerId: fields.ownerId,
      landlordName: fields.landlordName,
      date: new Date(fields.date),
    };
    const { error } = validateProperty(body);
    if (error) return res.status(400).send(error.details[0].message);

    let property = new Property(body);

    if (files.image) {
      const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
      property.image = {
        data: fs.readFileSync(imageFile.filepath),
        contentType: imageFile.mimetype,
      };
    }

    try {
      property = await property.save();
      res.status(200).send(property);
    } catch (err) {
      res.status(400).send('Error saving property.');
    }
  });
};


// Update an existing property
export const updateProperty = (req: Request, res: Response): void => {
  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields: any, files: Files) => {
    if (err) {
      return res.status(400).json({
        message: 'Photo could not be uploaded',
      });
    }

    const body: Property= {
      name: fields.name,
      description: fields.description,
      location: fields.location,
      ownerId: fields.ownerId,
      landlordName: fields.landlordName,
      date: new Date(fields.date),
    };

    const { error } = validateProperty(body);

    if (error) return res.status(400).send(error.details[0].message);

    try {
      let property = await Property.findById(req.params.id);

      if (!property) {
        return res.status(404).send('The property with the given ID was not found.');
      }

      Object.assign(property, body);

      if (files.image) {
        const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
        property.image = {
          data: fs.readFileSync(imageFile.filepath),
          contentType: imageFile.mimetype,
        };
      }

      await property.save();
      res.status(200).send(property);
    } catch (err) {
      res.status(400).send('Error updating property.');
    }
  });
};

// Delete a property
export const deleteProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      res.status(404).send('The property with the given ID was not found.');
      return;
    }

    res.send(property);
  } catch (err) {
    res.status(500).send('Error deleting property.');
  }
};

// Get property by ID
export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      res.status(404).send('The property with the given ID was not found.');
      return;
    }

    res.send(property);
  } catch (err) {
    res.status(500).send('Error fetching property.');
  }
};
