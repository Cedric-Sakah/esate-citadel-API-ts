import Joi from 'joi';
import mongoose, { Types } from 'mongoose';

interface ApartmentDocument extends mongoose.Document {
  propertyId: Types.ObjectId;
  apartmentNumber: number;
  available: boolean;
}

const ApartmentSchema = new mongoose.Schema<ApartmentDocument>({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
    
  },
  apartmentNumber: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 500,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

const Apartment = mongoose.model<ApartmentDocument>('Apartment', ApartmentSchema);

function validateApartment(apartment: ApartmentDocument) {
  const schema = Joi.object().keys({
    propertyId: Joi.string().min(24).max(26).required(),
    apartmentNumber: Joi.number().min(1).max(500).required(),
    available: Joi.boolean().required(),
  });
  return schema.validate(apartment);
}

export { Apartment, validateApartment,ApartmentDocument };