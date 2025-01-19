import express from 'express';
import { db } from '../models/db.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// Dodaj opinię o produkcie
router.post('/', authenticateJWT, (req, res) => {
  const { productId, rating, body } = req.body;

  if (!productId || !rating) {
    return res.status(400).send('Product ID and rating are required.');
  }

  db.run(
    `INSERT INTO Opinions (UserID, ProductID, Rating, Body) VALUES (?, ?, ?, ?);`,
    [req.user.userId, productId, rating, body || ''],
    function (err) {
      if (err) {
        return res.status(500).send('Error adding opinion.');
      }
      res.status(201).send({ opinionId: this.lastID });
    }
  );
});

// Pobierz opinie o produkcie
router.get('/:productId', (req, res) => {
  db.all(
    `SELECT Opinions.OpinionID, Opinions.Rating, Opinions.Body, Users.FirstName, Users.LastName
     FROM Opinions
     JOIN Users ON Opinions.UserID = Users.UserID
     WHERE ProductID = ?;`,
    [req.params.productId],
    (err, opinions) => {
      if (err) {
        return res.status(500).send('Error fetching opinions.');
      }
      res.status(200).send(opinions);
    }
  );
});

// Edytuj opinię
router.put('/:opinionId', authenticateJWT, (req, res) => {
  const { rating, body } = req.body;

  if (!rating && !body) {
    return res.status(400).send('At least one of rating or body must be provided.');
  }

  const updates = [];
  const params = [];

  if (rating) {
    updates.push('Rating = ?');
    params.push(rating);
  }
  if (body) {
    updates.push('Body = ?');
    params.push(body);
  }

  params.push(req.params.opinionId, req.user.userId);

  db.run(
    `UPDATE Opinions SET ${updates.join(', ')} WHERE OpinionID = ? AND UserID = ?;`,
    params,
    function (err) {
      if (err) {
        return res.status(500).send('Error updating opinion.');
      }

      if (this.changes === 0) {
        return res.status(404).send('Opinion not found or you do not have permission to edit it.');
      }

      res.status(200).send('Opinion updated successfully.');
    }
  );
});

// Usuń opinię
router.delete('/:opinionId', authenticateJWT, (req, res) => {
  db.run(
    `DELETE FROM Opinions WHERE OpinionID = ? AND UserID = ?;`,
    [req.params.opinionId, req.user.userId],
    function (err) {
      if (err) {
        return res.status(500).send('Error deleting opinion.');
      }

      if (this.changes === 0) {
        return res.status(404).send('Opinion not found or you do not have permission to delete it.');
      }

      res.status(200).send('Opinion deleted successfully.');
    }
  );
});

export default router;
