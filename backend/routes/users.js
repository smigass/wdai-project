import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../models/db.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();
const SECRET_KEY = 'your_secret_key';

// Rejestracja użytkownika
router.post('/register', async (req, res) => {
    const { email, password, firstName, lastName, address, phone } = req.body;

    if (!email || !password || !firstName || !lastName) {
        return res.status(400).send('All required fields must be provided.');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            `INSERT INTO Users (Email, Password, FirstName, LastName, Address, Phone) VALUES (?, ?, ?, ?, ?, ?);`,
            [email, hashedPassword, firstName, lastName, address || '', phone || ''],
            function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(409).send('Email already exists.');
                    }
                    return res.status(500).send('Error registering user: ' + err.message);
                }
                res.status(201).send({ userId: this.lastID });
            }
        );
    } catch (error) {
        res.status(500).send('Error hashing password: ' + error.message);
    }
});


// Logowanie użytkownika
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  db.get(`SELECT * FROM Users WHERE Email = ?;`, [email], async (err, user) => {
    if (!user || !(await bcrypt.compare(password, user.Password))) {
      return res.status(401).send('Invalid email or password.');
    }

    const role = user.Role || 'user';

    const token = jwt.sign(
      { userId: user.UserID, email: user.Email, role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).send({ token });
  });
});

// Informacje o użytkowniku
router.get('/:id', authenticateJWT, (req, res) => {
  const userId = req.params.id;

  if (req.user.userId !== parseInt(userId, 10)) {
    return res.status(403).send('You can only access your own information.');
  }

  db.get(`SELECT * FROM Users WHERE UserID = ?;`, [userId], (err, user) => {
    if (err) {
      return res.status(500).send('Error retrieving user.');
    }

    if (!user) {
      return res.status(404).send('User not found.');
    }

    res.status(200).send(user);
  });
});

// Resetowanie hasła
router.post('/reset-password', authenticateJWT, async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).send('New password is required.');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  db.run(
    `UPDATE Users SET Password = ? WHERE UserID = ?;`,
    [hashedPassword, req.user.userId],
    function (err) {
      if (err) {
        return res.status(500).send('Error resetting password.');
      }

      res.status(200).send('Password reset successfully.');
    }
  );
});



export default router;
