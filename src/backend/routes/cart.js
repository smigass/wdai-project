import express from 'express';
import { db } from '../models/db.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// Dodaj produkt do koszyka
router.post('/', authenticateJWT, (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).send('Product ID and quantity are required.');
  }

  db.run(
    `INSERT INTO Carts (UserID, ProductID, Quantity) VALUES (?, ?, ?);`,
    [req.user.userId, productId, quantity],
    function (err) {
      if (err) {
        return res.status(500).send('Error adding product to cart.');
      }
      res.status(201).send('Product added to cart.');
    }
  );
});

// Pobierz zawartość koszyka użytkownika
router.get('/', authenticateJWT, (req, res) => {
  db.all(
    `SELECT Products.Name, Products.Price, Carts.Quantity, (Products.Price * Carts.Quantity) as TotalPrice
     FROM Carts
     JOIN Products ON Carts.ProductID = Products.ProductID
     WHERE Carts.UserID = ?;`,
    [req.user.userId],
    (err, cart) => {
      if (err) {
        return res.status(500).send('Error fetching cart.');
      }
      res.status(200).send(cart);
    }
  );
});

// Usuń produkt z koszyka
router.delete('/:cartId', authenticateJWT, (req, res) => {
  db.run(
    `DELETE FROM Carts WHERE CartID = ? AND UserID = ?;`,
    [req.params.cartId, req.user.userId],
    function (err) {
      if (err) {
        return res.status(500).send('Error removing product from cart.');
      }

      if (this.changes === 0) {
        return res.status(404).send('Product not found in cart or you do not have permission to remove it.');
      }

      res.status(200).send('Product removed from cart successfully.');
    }
  );
});

// Zaktualizuj ilość produktu w koszyku
router.put('/:cartId', authenticateJWT, (req, res) => {
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).send('Quantity is required.');
  }

  db.run(
    `UPDATE Carts SET Quantity = ? WHERE CartID = ? AND UserID = ?;`,
    [quantity, req.params.cartId, req.user.userId],
    function (err) {
      if (err) {
        return res.status(500).send('Error updating product quantity in cart.');
      }

      if (this.changes === 0) {
        return res.status(404).send('Product not found in cart or you do not have permission to update it.');
      }

      res.status(200).send('Product quantity updated successfully.');
    }
  );
});

export default router;
