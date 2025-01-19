import express from 'express';
import { db } from '../models/db.js';
import { authenticateJWT, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// Pobierz listę wszystkich użytkowników (tylko admin)
router.get('/users', authenticateJWT, authorizeAdmin, (req, res) => {
  db.all(`SELECT * FROM Users;`, [], (err, users) => {
    if (err) {
      return res.status(500).send('Error fetching users.');
    }
    res.status(200).send(users);
  });
});

// Pobierz najpopularniejsze produkty (bestsellery) (tylko admin)
router.get('/stats/bestsellers', authenticateJWT, authorizeAdmin, (req, res) => {
  db.all(
    `SELECT Name, OrdersCount FROM Products ORDER BY OrdersCount DESC LIMIT 10;`,
    [],
    (err, products) => {
      if (err) {
        return res.status(500).send('Error fetching bestsellers.');
      }
      res.status(200).send(products);
    }
  );
});

// Pobierz całkowitą liczbę zamówień (tylko admin)
router.get('/stats/orders', authenticateJWT, authorizeAdmin, (req, res) => {
  db.get(`SELECT COUNT(*) as OrderCount FROM Orders;`, [], (err, result) => {
    if (err) {
      return res.status(500).send('Error fetching order count.');
    }
    res.status(200).send(result);
  });
});

// Pobierz użytkowników z liczbą zamówień (tylko admin)
router.get('/stats/users-orders', authenticateJWT, authorizeAdmin, (req, res) => {
  db.all(
    `SELECT Users.UserID, Users.Email, COUNT(Orders.OrderID) as OrderCount
     FROM Users
     LEFT JOIN Orders ON Users.UserID = Orders.UserID
     GROUP BY Users.UserID;`,
    [],
    (err, users) => {
      if (err) {
        return res.status(500).send('Error fetching users with orders.');
      }
      res.status(200).send(users);
    }
  );
});

export default router;
