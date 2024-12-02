import Joi from 'joi';
import mongoose, { Schema, Types } from 'mongoose';

// Interface for Property document
interface PropertyDocument extends mongoose.Document {
  name: string;
  description: string;
  location: string;
  ownerId: Types.ObjectId;
  image?: {
    data: Buffer;
    contentType: string;
  };
  date: Date;
}
interface Property {
  name: string;
  description: string;
  location: string;
  ownerId: Types.ObjectId;
  image?: {
    data: Buffer;
    contentType: string;
  };
  date: Date;
  landlordName: string;
}
// Property schema with type annotations
const PropertySchema = new mongoose.Schema<Property>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500,
  },
  location: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: {
    type: {
      data: Buffer,
      contentType: String,
    },
    optional: true, // Mark image as optional
  },
  date: {
    type: Date,
    default: Date.now,
  },
  landlordName: {
    type: String,
    required: true,
  }
});

// Mongoose model with generic type
const Property = mongoose.model<Property>('Property', PropertySchema);

function validateProperty(property: Property): Joi.ValidationResult {
  const schema = Joi.object({
    name: Joi.string().min(3).max(250).required(),
    description: Joi.string().min(5).max(500).required(),
    location: Joi.string().required(),
    ownerId: Joi.string().length(24).required(),
    date: Joi.date().required(),
    image: Joi.object({
      data: Joi.binary().required(),
      contentType: Joi.string().required(),
    }).optional(),
  });
  return schema.validate(property);
}

export { Property, validateProperty,PropertyDocument};