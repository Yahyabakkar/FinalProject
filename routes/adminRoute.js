import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminController.js';
import { getAdmin } from '../controllers/adminController.js';
import { getAllAdmins } from '../controllers/adminController.js';

const router = express.Router();

// Register a new admin
router.post('/admin/register', registerAdmin);

// Login admin
router.post('/admin/login', loginAdmin);
router.get('/admin/:id', getAdmin);
router.get('/admin', getAllAdmins);

export default router;
