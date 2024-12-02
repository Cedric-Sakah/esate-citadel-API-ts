import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { User } from '../models/user';

// Validate function
const validateLogin = (data: { email: string; password: string }) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// Login function
export const login = async (req: Request, res: Response): Promise<void> => {
  // Validate the incoming request
  const { error } = validateLogin(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send('Invalid email or password.');
      return;
    }

    // Verify the password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      res.status(401).send('Unauthorized access');
      return;
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        userType: user.userType,
      },
      'estateCitadel' 
    );

    res.send(token);
  } catch (err) {
    res.status(500).send('An error occurred during login.');
  }
};

export default login;
