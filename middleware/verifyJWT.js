const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({msg: "Invalid Token or Token is Missing"});
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({msg: "Forbidden"});
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
