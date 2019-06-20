const jwt = require('jsonwebtoken');

// Setting the middleware equal to a function
// Middleware is just a fucntion that recieves these three arguments
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_placeholder_TODO_make_longer");
    next();
  } catch (error) {
    res.status(401).json({message: 'Auth Failed'});
  }
};
