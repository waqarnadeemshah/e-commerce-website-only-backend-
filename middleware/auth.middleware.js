const jwt = require('jsonwebtoken');
exports.verifytoken = (req, res, next) => {
    try {
        const header = req.headers['authorization'];
        const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null
        if (!token) {
            return res.status(404).json({ msg: 'Access token required' })
        }
        const decode = jwt.verify(token, process.env.ACCESSTOKEN)
        req.user = decode;
        next()
    }
    catch (err) {
        return res.status(404).json({ msg: 'Invalid or expired token' });
    }
}
exports.verifyAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(401).json({ msg: 'Access denied: Admins only' });
  }
  next();
};