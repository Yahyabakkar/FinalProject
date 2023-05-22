import Admin from '../models/adminModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new admin
export const registerAdmin = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create a new admin
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      email,
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login admin
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
export function getAdmin(req, res) {
  // Assuming the admin ID is available in req.params.id
  const adminId = req.params.id;

  // Fetch the admin information from the database
  Admin.findById(adminId)
    .then((admin) => {
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      // Return the admin information
      res.status(200).json(admin);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error fetching admin information', error: error.message });
    });
}

export function getAllAdmins(req, res) {
  Admin.find({})
    .then((admins) => {
      res.status(200).json(admins);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error fetching admins', error: error.message });
    });
}