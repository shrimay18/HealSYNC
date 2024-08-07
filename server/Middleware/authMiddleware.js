const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = verified.userId;
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
