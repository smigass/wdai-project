import express from 'express';
import { db } from './models/db.js';
import importProducts from './utils/importProducts.js';
import importCategories from './utils/importCategories.js';

import userRoutes from './routes/users.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import adminRoutes from './routes/admin.js';
import newsletterRoutes from './routes/newsletter.js';
import opinionsRoutes from './routes/opinions.js';
import cartRoutes from './routes/cart.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes);
app.use('/newsletter', newsletterRoutes);
app.use('/opinions', opinionsRoutes);
app.use('/cart', cartRoutes);

// Importowanie danych do bazy
importCategories();
importProducts();

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Start serwera
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
