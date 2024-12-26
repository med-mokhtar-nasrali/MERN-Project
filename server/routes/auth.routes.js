import express from 'express';
import { registerUser, loginUser, updateUser, verifyToken, logoutUser, getAllUsers, getAllUsersAdmin } from '../controllers/authController.js';
import  authenticateToken  from '../middlewares/authMiddleware.js'; // Assuming you have authentication middleware

const router = express.Router();

// Register a new user
router.post('/register', registerUser);
// Login a user
router.post('/login', loginUser);
// Update user data (protected route)
router.put('/users/:id', authenticateToken, updateUser);
// Get all users 
router.get('/users', authenticateToken,getAllUsers);

router.get('/admin', authenticateToken,getAllUsersAdmin);
// Verify a token (protected route)
router.get('/verify', authenticateToken, verifyToken);
// Logout a user (client-side action)
router.post('/logout', logoutUser);

export default router;
