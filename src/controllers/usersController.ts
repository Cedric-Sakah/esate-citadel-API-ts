import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User, validateUser } from '../models/user';

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().sort('name');
    res.send(users);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    const { email, name, userType, phone, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      res.status(400).send('User already exists.');
      return;
    }

    user = new User({ email, name, userType, phone, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    const token = jwt.sign(
      {
        _id: user.id,
        name: user.name,
        phone: user.phone,
        userType: user.userType,
      },
      'estateCitadel'
    );

    res.header('x-auth-token', token).send(user);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
// Update an existing user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    const { email, name, userType, phone, password } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { email, name, userType, phone, password },
      { new: true }
    );

    if (!user) {
      res.status(404).send('The user with the given ID was not found.');
      return;
    }

    res.send(user);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).send('The user with the given ID was not found.');
      return;
    }

    res.send(user);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
// Get a user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).send('The user with the given ID was not found.');
      return;
    }

    res.send(user);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};