import express from 'express';
import { db } from '../models/db.js';

const router = express.Router();

// Pobierz wszystkie kategorie
router.get('/', (req, res) => {
  db.all(`SELECT * FROM Categories;`, [], (err, categories) => {
    if (err) {
      return res.status(500).send('Error fetching categories.');
    }
    res.status(200).send(categories);
  });
});

// Pobierz produkty w danej kategorii
router.get('/:categoryId/products', (req, res) => {
  const categoryId = req.params.categoryId;

  db.all(
    `SELECT * FROM Products WHERE CategoryID = ?;`,
    [categoryId],
    (err, products) => {
      if (err) {
        return res.status(500).send('Error fetching products by category.');
      }

      res.status(200).send(products);
    }
  );
});

export default router;
