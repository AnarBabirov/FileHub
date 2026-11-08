import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).send("Can't access this endpoint!");
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default AuthMiddleware;
