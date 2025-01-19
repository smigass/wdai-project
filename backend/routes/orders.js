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

//Dodanie szczegółów zamówienia
router.post('/details', authenticateJWT, (req, res) => {
  const { orderId, productId, quantity } = req.body;

  if (!orderId || !productId || !quantity) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `INSERT INTO OrderDetails (OrderID, ProductID, Quantity) VALUES (?, ?, ?)`;

  db.run(query, [orderId, productId, quantity], function (err) {
      if (err) {
          return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).send('Order detail added successfully');
  });
});

//Pobranie szczegółów zamówienia
router.get('/details/:orderId', authenticateJWT, (req, res) => {
  const { orderId } = req.params;

  const query = `
      SELECT DISTINCT p.Name, p.Price, od.Quantity 
      FROM OrderDetails od
      JOIN Products p ON od.ProductID = p.ProductID
      WHERE od.OrderID = ?;
  `;

  db.all(query, [orderId], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: 'Database error' });
      }

      if (rows.length === 0) {
          return res.status(404).json({ message: 'No order details found' });
      }

      res.status(200).json(rows);
  });
});



export default router;
