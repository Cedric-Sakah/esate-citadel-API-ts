import Joi from 'joi';
import mongoose, { Schema, Types } from 'mongoose';

// Interface for Rental document
interface RentalDocument extends mongoose.Document {
  userId: Types.ObjectId;
  apartmentId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  fee: number;
}

// Rental schema with type annotations
const RentalSchema = new mongoose.Schema<RentalDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  apartmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Apartment',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
});

// Mongoose model with generic type
const Rental = mongoose.model<RentalDocument>('Rental', RentalSchema);

function validateRental(rental: RentalDocument): Joi.ValidationResult<RentalDocument> {
    const schema = Joi.object().keys({
      userId: Joi.string().required().length(24), // Ensure 24-character length for ObjectId
      apartmentId: Joi.string().required().length(24), // Ensure 24-character length for ObjectId
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      fee: Joi.number().required(),
    });
    return schema.validate(rental);
  }

export { Rental, validateRental };