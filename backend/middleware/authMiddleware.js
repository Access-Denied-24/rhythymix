import jwt from "jsonwebtoken";


const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    // console.log("Decoded User:", req.user)
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;
