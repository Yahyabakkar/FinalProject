import Profile from '../models/profileModel.js';

// Controller function to create a new profile
const createProfile = async (req, res) => {
  try {
    const { name, about, experience, education, picture } = req.body;
    const id = req.user.id
    const newProfile = new Profile({
      name,
      about,
      experience,
      education,
      picture,
      userId:id,
    });
    
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(500).json({ error ,message: error.message });
  }
};

// Controller function to get all profiles
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
};
//get profile by userid 
const getByUserId = async (req, res) => {
const id=req.user.id 
  try {
    const profiles = await Profile.findOne({userId : id});
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
};

// Controller function to get a profile by ID
const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Controller function to update a profile by ID
const updateProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProfile = req.body;
    const profile = await Profile.findByIdAndUpdate(id, updatedProfile, {
      new: true,
    });
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Controller function to delete a profile by ID
const deleteProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByIdAndDelete(id);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete profile' });
  }
};

export { createProfile, getAllProfiles, getProfileById, updateProfileById,getByUserId, deleteProfileById };
