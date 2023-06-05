import express from 'express';
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfileById,
  deleteProfileById,
  getByUserId,
} from '../controllers/profileController.js';
import { verifyToken } from '../middleware/auth.js';

const profileRouter = express.Router();

// Create a new profile
profileRouter.post('/profiles',verifyToken, createProfile);

// Get all profiles
profileRouter.get('/profiles', getAllProfiles);

// Get a profile by ID
profileRouter.get('/profiles/:id', getProfileById);

profileRouter.get('/profilesById',verifyToken, getByUserId);

// Update a profile by ID
profileRouter.put('/profiles/:id', updateProfileById);

// Delete a profile by ID
profileRouter.delete('/profiles/:id', deleteProfileById);

export default profileRouter;
