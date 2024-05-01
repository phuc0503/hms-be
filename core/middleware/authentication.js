const { admin } = require('../config/firebase');

class Middleware {
    async decodeToken(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        try {

            const decodeValue = await admin.auth().verifyIdToken(token);
            if (decodeValue) {
                return next();
            }
            return res.json({ message: 'Unauthorize' });
        } catch (error) {
            return res.json({ message: 'Internal error' });
        }
    }
}

module.exports = new Middleware();