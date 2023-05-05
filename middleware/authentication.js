const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
    //check header for authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid');
    }
    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        //attach user to job route
        req.user = {userId: payload.userId};
        next();
    } catch(err) {
        throw new UnauthenticatedError('Authentication invalid');
    }
}

module.exports = auth;