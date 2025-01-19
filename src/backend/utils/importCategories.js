import { db } from '../models/db.js';

const importCategories = () => {
  const categories = [
    { id: 1, name: 'Sport and Fitness' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Electronics' },
    { id: 4, name: 'Toys and Games' },
    { id: 5, name: 'Home Appliances' },
    { id: 6, name: 'Stationery' },
    { id: 7, name: 'Fashion' },
  ];

  db.serialize(() => {
    const stmt = db.prepare(`INSERT OR IGNORE INTO Categories (CategoryID, Name) VALUES (?, ?);`);
    categories.forEach((category) => {
      stmt.run(category.id, category.name);
    });
    stmt.finalize(() => {
      console.log('Categories imported successfully.');
    });
  });
};

export default importCategories;
