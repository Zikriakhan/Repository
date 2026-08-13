const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection middleware for Serverless & standalone
let isConnected = false;
const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      isConnected = true;
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Import routes
const menuRoutes = require('./routes/menuRoutes');
const careerRoutes = require('./routes/careerRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const orderRoutes = require('./routes/orderRoutes');
const themeRoutes = require('./routes/themeRoutes');
const promoRoutes = require('./routes/promoRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const variationRoutes = require('./routes/variationRoutes');

// Routes (mounted on both /api/* and /* for Vercel serverless and local compatibility)
app.use('/api/menu', menuRoutes);
app.use('/menu', menuRoutes);

app.use('/api/careers', careerRoutes);
app.use('/careers', careerRoutes);

app.use('/api/rewards', rewardRoutes);
app.use('/rewards', rewardRoutes);

app.use('/api/orders', orderRoutes);
app.use('/orders', orderRoutes);

app.use('/api/themes', themeRoutes);
app.use('/themes', themeRoutes);

app.use('/api/promos', promoRoutes);
app.use('/promos', promoRoutes);

app.use('/api/upload', uploadRoutes);
app.use('/upload', uploadRoutes);

app.use('/api/categories', categoryRoutes);
app.use('/categories', categoryRoutes);

app.use('/api/variations', variationRoutes);
app.use('/variations', variationRoutes);

// Serve static files from the uploads directory
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB & start listener if run directly
if (require.main === module) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

module.exports = app;
