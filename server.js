require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./src/config/db');


const adminRoutes = require('./src/routes/admin');
const searchRoutes = require('./src/routes/search');

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));


app.use('/api/admin', adminRoutes);
app.use('/api', searchRoutes);

app.get('/', (req, res) => res.send('Hotel Booking API'));


const PORT = process.env.PORT || 3000;
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel-booking').then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
    .catch(err => console.error('DB connection error', err));