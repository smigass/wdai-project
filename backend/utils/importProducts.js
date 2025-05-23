import {db} from '../models/db.js';
import * as data from '../Database/productList.json' with {type: "json"}

const importProducts = async () => {
    let productList = data.default
    db.all(
        `SELECT * FROM Products;`,
        [],
        (err, products) => {
            if (err) {
                console.log('Error fetching products.');
                return;
            }
            if (products.length > 0) {
                console.log('Products alreadydasdsadas imported.');
            }
        }
    )
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
}


export default importProducts;
