import express from 'express';
import { db } from '../models/db.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// Dodaj nowe zamówienie
router.post('/', authenticateJWT, (req, res) => {
  const { totalPrice, orderDate } = req.body;

  if (!totalPrice || !orderDate) {
    return res.status(400).send('Total price and order date are required.');
  }

  db.run(
    `INSERT INTO Orders (UserID, TotalPrice, OrderDate) VALUES (?, ?, ?);`,
    [req.user.userId, totalPrice, orderDate],
    function (err) {
      if (err) {
        return res.status(500).send('Error creating order.');
      }
      res.status(201).send({ orderId: this.lastID });
    }
  );
});

// Pobierz zamówienia użytkownika
router.get('/user', authenticateJWT, (req, res) => {
  db.all(
    `SELECT * FROM Orders WHERE UserID = ? ORDER BY OrderDate DESC;`,
    [req.user.userId],
    (err, orders) => {
      if (err) {
        return res.status(500).send('Error fetching orders.');
      }
      res.status(200).send(orders);
    }
  );
});

// Usuń zamówienie użytkownika
router.delete('/:orderId', authenticateJWT, (req, res) => {
  db.run(
    `DELETE FROM Orders WHERE OrderID = ? AND UserID = ?;`,
    [req.params.orderId, req.user.userId],
    function (err) {
      if (err) {
        return res.status(500).send('Error deleting order.');
      }

      if (this.changes === 0) {
        return res.status(404).send('Order not found or you do not have permission to delete it.');
      }

      res.status(200).send('Order deleted successfully.');
    }
  );
});

// Zaktualizuj zamówienie użytkownika
router.put('/:orderId', authenticateJWT, (req, res) => {
  const { totalPrice, orderDate } = req.body;

  if (!totalPrice && !orderDate) {
    return res.status(400).send('At least one of total price or order date must be provided.');
  }

  const updates = [];
  const params = [];

  if (totalPrice) {
    updates.push('TotalPrice = ?');
    params.push(totalPrice);
  }
  if (orderDate) {
    updates.push('OrderDate = ?');
    params.push(orderDate);
  }

  params.push(req.params.orderId, req.user.userId);

  db.run(
    `UPDATE Orders SET ${updates.join(', ')} WHERE OrderID = ? AND UserID = ?;`,
    params,
    function (err) {
      if (err) {
        return res.status(500).send('Error updating order.');
      }

      if (this.changes === 0) {
        return res.status(404).send('Order not found or you do not have permission to update it.');
      }

      res.status(200).send('Order updated successfully.');
    }
  );
});

export default router;
