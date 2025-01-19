import fs from 'fs';
import path from 'path';
import { db } from '../models/db.js';

const importProducts = () => {
  const productsFilePath = path.resolve('./src/Database/Products.ts');

  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading Products.ts:', err.message);
      return;
    }

    try {
      const productListMatch = data.match(/const ProductList: IProduct\[] = (\[.*\]);/s);

      if (!productListMatch) {
        throw new Error('ProductList array not found in Products.ts');
      }

      const productList = JSON.parse(productListMatch[1]);

      db.serialize(() => {
        const stmt = db.prepare(`
          INSERT INTO Products (Name, Description, Price, Image, InStock, CategoryID, OrdersCount)
          VALUES (?, ?, ?, ?, ?, ?, ?);
        `);

        productList.forEach((product) => {
          stmt.run(
            product.title,
            product.description || '',
            product.price,
            product.imgsrc || '',
            product.stock || 0,
            product.category_number || null,
            0
          );
        });

        stmt.finalize(() => {
          console.log('Products imported successfully.');
        });
      });
    } catch (error) {
      console.error('Error parsing ProductList:', error.message);
    }
  });
};

export default importProducts;
