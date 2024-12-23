import jwt from 'jsonwebtoken';

// Middleware to authenticate the token
export const authenticateToken = (req, res, next) => {
    // Extract token from the Authorization header (Bearer <token>)
    const token = req.headers.authorization?.split(' ')[1];

    // If no token is provided, return an error
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // Verify the token using JWT_SECRET from environment variables
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        // If the token is valid, attach the decoded information to the request
        req.user = decoded;

        // Continue to the next middleware or route handler
        next();
    });
};
