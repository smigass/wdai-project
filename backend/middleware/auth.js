import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

// Middleware do uwierzytelniania JWT
export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, SECRET_KEY, (err, user) => {
          if (err) {
              return res.status(403).send("Invalid or expired token.");
          }

          req.user = user; // Przechowujemy dane użytkownika z tokenu
          next();
      });
  } else {
      res.status(401).send("Authorization token required.");
  }
};

// Middleware do autoryzacji administratora
export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Access denied. Admins only.');
  }
};
