const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./database/db');
const companyRoutes = require('./routes/companies');
const clientRoutes = require('./routes/clients');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users'); 
const orderRoutes = require('./routes/orders');
const orderLaunchRoutes = require('./routes/ordersLaunch');

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use('/companies', companyRoutes);
app.use('/clients', clientRoutes); 
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/orderslaunch', orderLaunchRoutes);

connectDB();

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
