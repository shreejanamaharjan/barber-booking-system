const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: 'Auth Failed: No token provided',
        success: false
      });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: 'Auth Failed: Invalid token',
          success: false
        });
      }

      req.body.userId = decoded.id;
      next();
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Auth Failed: An error occurred',
      success: false
    });
  }
};