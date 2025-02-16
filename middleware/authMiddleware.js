const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    // If no token is found, redirect to login
    if (!token) {
        return res.redirect('/login');
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user data to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Handle token verification errors (e.g., expired or invalid token)
        console.error('Token verification failed:', err.message);

        // Clear the invalid token cookie
        res.clearCookie('token');

        // Redirect to login page
        return res.redirect('/login');
    }
};

module.exports = authMiddleware;