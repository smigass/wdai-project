import express from 'express';
import {db} from '../models/db.js';
import {authenticateJWT} from '../middleware/auth.js';

const router = express.Router();

// Pobierz wszystkie produkty z opcjonalnym filtrowaniem
router.get('/', (req, res) => {
    const {category, price_min, price_max, in_stock} = req.query;

    let query = `SELECT *
                 FROM Products`;
    const conditions = [];
    const params = [];

    if (category) {
        conditions.push('CategoryID = ?');
        params.push(category);
    }
    if (price_min) {
        conditions.push('Price >= ?');
        params.push(price_min);
    }
    if (price_max) {
        conditions.push('Price <= ?');
        params.push(price_max);
    }
    if (in_stock === 'true') {
        conditions.push('InStock > 0');
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    db.all(query, params, (err, products) => {
        if (err) {
            return res.status(500).send('Error fetching products.');
        }
        res.status(200).send(products);
    });
});

// Pobierz bestsellery (najlepiej sprzedające się produkty)
router.get('/bestsellers', (req, res) => {
    db.all(
        `SELECT *
         FROM Products
         ORDER BY OrdersCount DESC LIMIT 10;`,
        [],
        (err, products) => {
            if (err) {
                return res.status(500).send('Error fetching bestsellers.');
            }
            res.status(200).send(products);
        }
    );
});

router.get('/search', (req, res) => {
    const {query, category} = req.query;
    console.log(query, category);
    console.log(req.params)
    if (!category || category === '-1') {
        db.all(`SELECT *
                FROM Products
                WHERE Name LIKE ?;`, [`%${query}%`], (err, products) => {
            if (err) {
                return res.status(500).send('Error fetching products.');
            }
            res.status(200).send(products);
        });
    } else {
        db.all(`SELECT *
                FROM Products
                WHERE Name LIKE ?
                  AND CategoryID = ?;`, [`%${query}%`, category], (err, products) => {
            if (err) {
                return res.status(500).send('Error fetching products.');
            }
            res.status(200).send(products);
        });
    }
})


// Pobierz informacje o produkcie
router.get('/:id', (req, res) => {
    db.get(`SELECT *
            FROM Products
            WHERE ProductID = ?;`, [req.params.id], (err, product) => {
        if (err) {
            return res.status(500).send('Error fetching product.');
        }

        if (!product) {
            return res.status(404).send('Product not found.');
        }

        res.status(200).send(product);
    });
});

// Dodaj nowy produkt (tylko admin)
router.post('/', authenticateJWT, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied. Admins only.');
    }

    const {name, description, price, image, inStock, categoryId} = req.body;

    if (!name || !price || !categoryId) {
        return res.status(400).send('Name, price, and category ID are required.');
    }

    db.run(
        `INSERT INTO Products (Name, Description, Price, Image, InStock, CategoryID)
         VALUES (?, ?, ?, ?, ?, ?);`,
        [name, description || '', price, image || '', inStock || 0, categoryId],
        function (err) {
            if (err) {
                return res.status(500).send('Error adding product.');
            }
            res.status(201).send({productId: this.lastID});
        }
    );
});


// Usuń produkt (tylko admin)
router.delete('/:id', authenticateJWT, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied. Admins only.');
    }

    db.run(`DELETE
            FROM Products
            WHERE ProductID = ?;`, [req.params.id], function (err) {
        if (err) {
            return res.status(500).send('Error deleting product.');
        }

        if (this.changes === 0) {
            return res.status(404).send('Product not found.');
        }

        res.status(200).send('Product deleted successfully.');
    });
});

// Pobierz produkty z danej kategorii
router.get('/category/:categoryId', (req, res) => {
    const {categoryId} = req.params;

    db.all(`SELECT *
            FROM Products
            WHERE CategoryID = ?;`, [categoryId], (err, products) => {
        if (err) {
            return res.status(500).send('Error fetching products by category.');
        }
        res.status(200).send(products);
    });
});



export default router;
