import express from 'express';
import { db } from '../models/db.js';
import { authenticateJWT, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// Sprawdź, czy użytkownik jest zapisany do newslettera
router.get('/check', authenticateJWT, (req, res) => {
  db.get(
    `SELECT * FROM Newsletter WHERE UserID = ?;`,
    [req.user.userId],
    (err, row) => {
      if (err) {
        return res.status(500).send('Error checking subscription.');
      }
      if (row) {
        return res.status(200).send({ subscribed: true });
      }
      res.status(200).send({ subscribed: false });
    }
  );
});

// Zapisz użytkownika do newslettera
router.post('/', authenticateJWT, (req, res) => {
  db.run(
    `INSERT OR IGNORE INTO Newsletter (UserID) VALUES (?);`,
    [req.user.userId],
    (err) => {
      if (err) {
        return res.status(500).send('Error subscribing to newsletter.');
      }
      res.status(200).send('Subscribed to newsletter successfully.');
    }
  );
});

// Pobierz wszystkich subskrybentów newslettera (tylko admin)
router.get('/', authenticateJWT, authorizeAdmin, (req, res) => {
  db.all(
    `SELECT Users.UserID, Users.Email FROM Newsletter
     JOIN Users ON Newsletter.UserID = Users.UserID;`,
    [],
    (err, subscribers) => {
      if (err) {
        return res.status(500).send('Error fetching newsletter subscribers.');
      }
      res.status(200).send(subscribers);
    }
  );
});

// Usuń użytkownika z newslettera
router.delete('/', authenticateJWT, (req, res) => {
  db.run(
    `DELETE FROM Newsletter WHERE UserID = ?;`,
    [req.user.userId],
    function (err) {
      if (err) {
        return res.status(500).send('Error unsubscribing from newsletter.');
      }

      if (this.changes === 0) {
        return res.status(404).send('You are not subscribed to the newsletter.');
      }

      res.status(200).send('Unsubscribed from newsletter successfully.');
    }
  );
});

export default router;
