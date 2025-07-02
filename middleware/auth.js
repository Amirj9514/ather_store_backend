const jwt = require("jsonwebtoken");
const {error , success} = require('../Utils/response');

const SECRET = process.env.JWT_SECRET || "mysecret";

// ✅ Token with no expiration
const createToken = (payload) => {
  return jwt.sign(payload, SECRET); // ⛔ No expiresIn here
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return error(res, "No token provided", 403);

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return error(res, "Invalid token", 403, err);

    req.user = decoded;
    next();
  });
};

module.exports = {
  createToken,
  verifyToken,
};
