const mongoose = require('mongoose');
require('dotenv').config();
const MenuItem = require('./models/MenuItem');

const newItems = [
  { category: 'bites', name: 'NEW MENU BITE 1', price: '$12.95', numPrice: 12.95, rating: 4.5, calories: '500 Cal', desc: 'Delicious new bite for you to try.', image: '/menu-images/10.jpg', active: true },
  { category: 'bites', name: 'NEW MENU BITE 2', price: '$12.95', numPrice: 12.95, rating: 4.5, calories: '500 Cal', desc: 'Delicious new bite for you to try.', image: '/menu-images/11.jpg', active: true },
  { category: 'bites', name: 'NEW MENU BITE 3', price: '$12.95', numPrice: 12.95, rating: 4.5, calories: '500 Cal', desc: 'Delicious new bite for you to try.', image: '/menu-images/12.jpg', active: true },
  { category: 'bites', name: 'NEW MENU BITE 4', price: '$12.95', numPrice: 12.95, rating: 4.5, calories: '500 Cal', desc: 'Delicious new bite for you to try.', image: '/menu-images/13.jpg', active: true },
  { category: 'bites', name: 'NEW MENU BITE 5', price: '$12.95', numPrice: 12.95, rating: 4.5, calories: '500 Cal', desc: 'Delicious new bite for you to try.', image: '/menu-images/2.jpg', active: true },
  { category: 'bowls', name: 'NEW MENU BOWL 1', price: '$18.95', numPrice: 18.95, rating: 4.5, calories: '800 Cal', desc: 'Delicious new bowl for you to try.', image: '/menu-images/3.jpg', active: true },
  { category: 'bowls', name: 'NEW MENU BOWL 2', price: '$18.95', numPrice: 18.95, rating: 4.5, calories: '800 Cal', desc: 'Delicious new bowl for you to try.', image: '/menu-images/4.jpg', active: true },
  { category: 'bowls', name: 'NEW MENU BOWL 3', price: '$18.95', numPrice: 18.95, rating: 4.5, calories: '800 Cal', desc: 'Delicious new bowl for you to try.', image: '/menu-images/7.jpg', active: true },
  { category: 'bowls', name: 'NEW MENU BOWL 4', price: '$18.95', numPrice: 18.95, rating: 4.5, calories: '800 Cal', desc: 'Delicious new bowl for you to try.', image: '/menu-images/8.jpg', active: true },
  { category: 'desserts', name: 'NEW MENU DESSERT 1', price: '$9.95', numPrice: 9.95, rating: 4.5, calories: '1000 Cal', desc: 'Delicious new dessert for you to try.', image: '/menu-images/9.jpg', active: true },
  { category: 'desserts', name: 'NEW MENU DESSERT 2', price: '$9.95', numPrice: 9.95, rating: 4.5, calories: '1000 Cal', desc: 'Delicious new dessert for you to try.', image: '/menu-images/f.jpg', active: true },
  { category: 'desserts', name: 'NEW MENU DESSERT 3', price: '$9.95', numPrice: 9.95, rating: 4.5, calories: '1000 Cal', desc: 'Delicious new dessert for you to try.', image: '/menu-images/image1.jpg', active: true },
  { category: 'desserts', name: 'NEW MENU DESSERT 4', price: '$9.95', numPrice: 9.95, rating: 4.5, calories: '1000 Cal', desc: 'Delicious new dessert for you to try.', image: '/menu-images/s.jpg', active: true }
];

async function addItems() {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cheesecake';
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    const inserted = await MenuItem.insertMany(newItems);
    console.log(`Successfully added ${inserted.length} new menu items!`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding to database:', error);
    process.exit(1);
  }
}

addItems();
