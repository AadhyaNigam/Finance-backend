const authorize = (roles = []) => {
    return (req, res, next) => {
        const userRole = req.headers['x-role']; // Mock Role-based access
        if (!roles.includes(userRole)) {
            return res.status(403).json({ 
                error: "Access Denied", 
                message: `Required roles: ${roles.join(', ')}` 
            });
        }
        next();
    };
};

module.exports = authorize;
