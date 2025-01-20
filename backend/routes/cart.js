import express from 'express';
import {db} from '../models/db.js';
import {authenticateJWT} from '../middleware/auth.js';

const router = express.Router();

// Dodaj produkt do koszyka
router.post('/', authenticateJWT, (req, res) => {
    const {productId, quantity} = req.body;

    if (!productId || !quantity) {
        return res.status(400).send('Product ID and quantity are required.');
    }

    db.run(
        `INSERT INTO Carts (UserID, ProductID, Quantity)
         VALUES (?, ?, ?);`,
        [req.user.userId, productId, quantity],
        function (err) {
            if (err) {
                console.log(err);
                return res.status(500).send('Error adding product to cart.');
            }
            res.status(201).send('Product added to cart.');
        }
    );
});

// Pobierz zawartość koszyka użytkownika
router.get('/', authenticateJWT, (req, res) => {
    db.all(
        `SELECT Products.Name, Products.Price, Products.ProductID, SUM(Quantity) as Quantity, (Products.Price * SUM(Quantity)) as TotalPrice
         FROM Carts
                  JOIN Products ON Carts.ProductID = Products.ProductID
         WHERE Carts.UserID = ?
         GROUP BY Products.Name`,
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
router.delete('/:pid', authenticateJWT, (req, res) => {
    db.run(
        `DELETE
         FROM Carts
         WHERE ProductID = ?
           AND UserID = ?;`,
        [req.params.pid, req.user.userId],
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
    const {quantity} = req.body;

    if (!quantity) {
        return res.status(400).send('Quantity is required.');
    }

    db.run(
        `UPDATE Carts
         SET Quantity = ?
         WHERE CartID = ?
           AND UserID = ?;`,
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

// Pobranie całkowitej ceny koszyka dla użytkownika
router.get('/total/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = `
        SELECT SUM(p.Price * c.Quantity) AS TotalPrice
        FROM Carts c
                 JOIN Products p ON c.ProductID = p.ProductID
        WHERE c.UserID = ?;
    `;

    db.get(query, [userId], (err, row) => {
        if (err) {
            console.error('Error fetching cart total:', err.message);
            return res.status(500).json({error: 'Internal Server Error'});
        }

        // Jeśli użytkownik nie ma produktów w koszyku, zwróć 0
        if (!row || row.TotalPrice === null) {
            return res.json({total: 0});
        }

        res.json({total: row.TotalPrice});
    });
});

export default router;
