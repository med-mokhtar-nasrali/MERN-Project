import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    // Extract token from the 'Authorization' header
    const token = req.headers["authorization"]?.split(" ")[1];  // Expecting "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access. No token provided." });
    }

    try {
        // Verify the token using the secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info from the token to the request object
        req.user = verified;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        res.status(403).json({ message: "Invalid or expired token." });
    }
};

export default authenticateToken;
