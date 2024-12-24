import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        // Check if the password matches the confirmation password
        if (password !== confirmPassword) {
            console.log({ error: 'Passwords do not match' })
            return res.status(400).json({ confirmPassword: {message:'Passwords do not match' }});
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ email: {message:'Email already in use' }});

        // Create a new user
        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json(err );
        console.log(err)
    }
};

// Login a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ login:{message:'Invalid email or password'} });

        // Compare passwords
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) return res.status(400).json({ login:{message:'Invalid email or password'} });

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token , id: user._id});
    } catch (err) {
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
};
// Get all users
export const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();
        if (!users) return res.status(404).json({ error: 'No users found' });

        res.status(200).json( users );
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users', details: err.message });
    }
};
// Update user data
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Extract user ID from request params
        const { firstName, lastName, email, password, currentPassword } = req.body;

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Check if current password is provided and if it matches the stored password
        if (currentPassword) {
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ error: 'Current password is incorrect' });
            }
        }

        // Update fields if provided
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) {
            // Check if new email is already in use
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== id) {
                return res.status(400).json({ error: 'Email already in use' });
            }
            user.email = email;
        }
        if (password) {
            // Hash the new password
            user.password = await bcrypt.hash(password, 10);
        }

        // Save the updated user data
        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
        res.status(500).json({ error: 'Update failed', details: err.message });
    }
};

// Verify a token
export  const verifyToken = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Token is valid', decoded });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token', details: err.message });
    }
};

// Logout a user (client-side action)
export const logoutUser = (req, res) => {
    // Client should delete token on their end (e.g., remove from localStorage or cookies)
    res.status(200).json({ message: 'Logged out successfully' });
};

