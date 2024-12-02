import Joi from 'joi';
import mongoose, { Schema } from 'mongoose';

// Define a User interface to represent the document structure
interface UserDocument extends mongoose.Document {
  name: string;
  userType: 'owner' | 'customer';
  email: string;
  phone: number;
  password: string;
}

// Create the Mongoose schema with type annotations
const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250,
  },
  userType: {
    type: String,
    enum: ['owner', 'customer'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 9,
    maxlength: 11,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 250,
  },
});

// Create the Mongoose model
const User = mongoose.model<UserDocument>('User', UserSchema);

// Validation function with type annotations
function validateUser(user: UserDocument): Joi.ValidationResult<UserDocument> {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(250).required(),
    userType: Joi.string().valid('owner', 'customer').required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
    phone: Joi.string().min(9).max(11).required(), // Treat phone as a string for flexibility
    password: Joi.string().min(6).max(250).required(),
  });
  return schema.validate(user);
}

export { User, validateUser };