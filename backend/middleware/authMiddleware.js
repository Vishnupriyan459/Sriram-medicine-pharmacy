
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/auth');

function authenticate(req, res, next) {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    try {
        
            const decodedToken = jwt.verify(token, secretKey,(error, decodedToken) => {
                if (error) {
                    console.error('JWT verification error:', error);
                    // Handle error
                } else {
                    console.log('Decoded token:', decodedToken);
                    req.userId = decodedToken.userId;
                    next();
                }
            });
            
        
        
         

        
        
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authenticate;
