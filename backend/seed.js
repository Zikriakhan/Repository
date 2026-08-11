const mongoose = require('mongoose');
require('dotenv').config();
const MenuItem = require('./models/MenuItem');

const menuData = {
  bites: [
    {
      id: 'b1',
      name: "CLASSIC ITALIAN LASAGNA",
      price: "$16.95",
      numPrice: 16.95,
      rating: 4.9,
      calories: "820 Cal",
      desc: "Layers of slow-simmered meat sauce, creamy ricotta, and melted mozzarella baked to golden perfection.",
      image: "https://images.unsplash.com/photo-1560750133-c5d4ef4de911?q=80&w=600&auto=format&fit=crop",
      active: true
    },

    {
      id: 'b2',
      name: "AESTHETIC PENNE PASTA",
      price: "$14.50",
      numPrice: 14.50,
      rating: 4.8,
      calories: "690 Cal",
      desc: "Penne tossed in a rich tomato sauce, finished with fresh basil and shaved parmesan.",
      image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=600&auto=format&fit=crop",
      active: true
    },
    {
      id: 'b3',
      name: "ULTIMATE DOUBLE CHEESE PIZZA",
      price: "$15.95",
      numPrice: 15.95,
      rating: 4.9,
      calories: "940 Cal",
      desc: "A wood-fired crust loaded with a blend of mozzarella, provolone, and cheddar, pulled fresh for that signature cheese-stretch in every slice.",
      image: "https://images.unsplash.com/photo-1616141215340-34b0e7c661c8?q=80&w=600&auto=format&fit=crop",
      active: true
    },
    {
      id: 'b4',
      name: "ASIAN TENDERLOIN BOWL",
      price: "$18.95",
      numPrice: 18.95,
      rating: 5.0,
      calories: "880 Cal",
      desc: "Seared tenderloin steak tips, jasmine rice, wok-tossed baby bok choy, mushrooms, and teriyaki reduction.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
      active: true
    },
    {
      id: 'b5',
      name: "PICKLE FRIES",
      price: "$11.95",
      numPrice: 11.95,
      rating: 4.7,
      calories: "620 Cal",
      desc: "Hand Breaded and Fried Crisp. Served with Spicy Ranch.",
      image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=600&auto=format&fit=crop",
      active: true
    },
    {
      id: 'b6',
      name: "AVOCADO TOAST",
      price: "$12.95",
      numPrice: 12.95,
      rating: 4.6,
      calories: "480 Cal",
      desc: "With Tomato, Arugula and Red Onion Drizzled with Extra Virgin Olive Oil and Lemon.",
      image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?q=80&w=600&auto=format&fit=crop",
      active: true
    },
    {
      id: 'b7',
      name: "ASIAN CHICKEN NACHOS",
      price: "$15.95",
      numPrice: 15.95,
      rating: 4.9,
      calories: "940 Cal",
      desc: "Crispy wonton chips covered with spicy chicken, melted cheese, sweet soy, wasabi cream, and sesame.",
      image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=600&auto=format&fit=crop",
      active: true
    },
    { category: 'bites', name: 'NEW MENU BITE 1', price: '$12.95', numPrice: 12.95, rating: 4.5, calories: '500 Cal', desc: 'Delicious new bite for you to try.', image: '/menu-images/10.jpg', active: true },
    { category: 'bites', name: 'NEW MENU BITE 2', price: '$12.95', numPrice: 12.95, rating: 4.5, calories: '500 Cal', desc: 'Delicious new bite for you to try.', image: '/menu-images/11.jpg', active: true },
    { category: 'bites', name: 'NEW MENU BITE 3', price: '$12.95', numPrice: 12.95, rating: 4.5, calories: '500 Cal', desc: 'Delicious new bite for you to try.', image: '/menu-images/12.jpg', active: true },
    { category: 'bites', name: 'NEW MENU BITE 4', price: '$12.95', numPrice: 12.95, rating: 4.5, calories: '500 Cal', desc: 'Delicious new bite for you to try.', image: '/menu-images/13.jpg', active: true },
    { category: 'bites', name: 'NEW MENU BITE 5', price: '$12.95', numPrice: 12.95, rating: 4.5, calories: '500 Cal', desc: 'Delicious new bite for you to try.', image: '/menu-images/2.jpg', active: true }
  ],
  bowls: [
    {
      id: 'bw1',
      name: "CHICKEN KATSU BOWL",
      price: "$17.95",
      numPrice: 17.95,
      rating: 4.8,
      calories: "920 Cal",
      desc: "Crispy Chicken with Teriyaki Glaze, Edamame, Mushrooms, Cucumber and Sesame Seeds with Jasmine Rice.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop",
      active: true
    },
    {
      id: 'bw2',
      name: "PERUVIAN CHICKEN BOWL",
      price: "$17.25",
      numPrice: 17.25,
      rating: 4.7,
      calories: "870 Cal",
      desc: "Charbroiled Chicken with Black Beans, Plantains and Salsa, Served with White Rice.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
      active: true
    },
    {
      id: 'bw3',
      name: "TERIYAKI SALMON BOWL",
      price: "$19.95",
      numPrice: 19.95,
      rating: 4.9,
      calories: "760 Cal",
      desc: "Charbroiled and Served Over White Rice with Pineapple, Sauteed Vegetables and Sesame Seeds.",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600&auto=format&fit=crop",
      active: true
    },
    {
      id: 'bw4',
      name: "AHI TUNA POKE BOWL",
      price: "$19.50",
      numPrice: 19.50,
      rating: 5.0,
      calories: "640 Cal",
      desc: "Sushi Grade Ahi Tuna with Soy, Sesame and Garlic. Served Over White Rice with Edamame and Avocado.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
      active: true
    },
    { category: 'bowls', name: 'NEW MENU BOWL 1', price: '$18.95', numPrice: 18.95, rating: 4.5, calories: '800 Cal', desc: 'Delicious new bowl for you to try.', image: '/menu-images/3.jpg', active: true },
    { category: 'bowls', name: 'NEW MENU BOWL 2', price: '$18.95', numPrice: 18.95, rating: 4.5, calories: '800 Cal', desc: 'Delicious new bowl for you to try.', image: '/menu-images/4.jpg', active: true },
    { category: 'bowls', name: 'NEW MENU BOWL 3', price: '$18.95', numPrice: 18.95, rating: 4.5, calories: '800 Cal', desc: 'Delicious new bowl for you to try.', image: '/menu-images/7.jpg', active: true },
    { category: 'bowls', name: 'NEW MENU BOWL 4', price: '$18.95', numPrice: 18.95, rating: 4.5, calories: '800 Cal', desc: 'Delicious new bowl for you to try.', image: '/menu-images/8.jpg', active: true }
  ],
  desserts: [
    {
      id: 'd1',
      name: "LINDA'S FUDGE CAKE",
      price: "$10.95",
      numPrice: 10.95,
      rating: 5.0,
      calories: "1,140 Cal",
      desc: "Layers of rich chocolate fudge cake filled and frosted with dark chocolate fudge frosting.",
      image: "https://i.pinimg.com/1200x/6d/31/89/6d3189d24742473a6b3187fc48dffdd6.jpg",
      active: true
    },
    {
      id: 'd2',
      name: "PEACH PERFECT DESSERT",
      price: "$9.95",
      numPrice: 9.95,
      rating: 4.9,
      calories: "780 Cal",
      desc: "Fresh peaches baked with sweet brown sugar crumble, served warm with vanilla ice cream.",
      image: "https://i.pinimg.com/1200x/ad/95/ef/ad95efdad4e3505d17b2f7d9fd4a4376.jpg",
      active: true
    },
    {
      id: 'd3',
      name: "FRESH STRAWBERRY CHEESECAKE",
      price: "$10.50",
      numPrice: 10.50,
      rating: 5.0,
      calories: "1,000 Cal",
      desc: "Our original legendary cheesecake topped with glazed fresh strawberries. Most popular for over 40 years!",
      image: "https://i.pinimg.com/736x/b7/92/68/b79268951fcbbf5bcb51e6c4551fcab6.jpg",
      active: true
    },
    {
      id: 'd4',
      name: "GODIVA® BROWNIE SUNDAE",
      price: "$11.95",
      numPrice: 11.95,
      rating: 4.9,
      calories: "1,220 Cal",
      desc: "Warm Godiva® chocolate brownie topped with Godiva chocolate ice cream, whipped cream, and hot fudge.",
      image: "https://i.pinimg.com/1200x/1d/86/96/1d869628e9fab876d713d9f844a7eeac.jpg",
      active: true
    },
    {
      id: 'd5',
      name: "GODIVA® BROWNIE SUNDAE",
      price: "$11.95",
      numPrice: 11.95,
      rating: 4.9,
      calories: "1,220 Cal",
      desc: "Warm Godiva® chocolate brownie topped with Godiva chocolate ice cream, whipped cream, and hot fudge.",
      image: "https://i.pinimg.com/1200x/6d/31/89/6d3189d24742473a6b3187fc48dffdd6.jpg",
      active: true
    },
    {
      id: 'd6',
      name: "GODIVA® BROWNIE SUNDAE",
      price: "$11.95",
      numPrice: 11.95,
      rating: 4.9,
      calories: "1,220 Cal",
      desc: "Warm Godiva® chocolate brownie topped with Godiva chocolate ice cream, whipped cream, and hot fudge.",
      image: "https://i.pinimg.com/736x/69/fb/11/69fb112cb6a67f935af157512d6b9625.jpg",
      active: true
    },
    { category: 'desserts', name: 'NEW MENU DESSERT 1', price: '$9.95', numPrice: 9.95, rating: 4.5, calories: '1000 Cal', desc: 'Delicious new dessert for you to try.', image: '/menu-images/9.jpg', active: true },
    { category: 'desserts', name: 'NEW MENU DESSERT 2', price: '$9.95', numPrice: 9.95, rating: 4.5, calories: '1000 Cal', desc: 'Delicious new dessert for you to try.', image: '/menu-images/f.jpg', active: true },
    { category: 'desserts', name: 'NEW MENU DESSERT 3', price: '$9.95', numPrice: 9.95, rating: 4.5, calories: '1000 Cal', desc: 'Delicious new dessert for you to try.', image: '/menu-images/image1.jpg', active: true },
    { category: 'desserts', name: 'NEW MENU DESSERT 4', price: '$9.95', numPrice: 9.95, rating: 4.5, calories: '1000 Cal', desc: 'Delicious new dessert for you to try.', image: '/menu-images/s.jpg', active: true }
  ]
};

async function seedDatabase() {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cheesecake';
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items.');

    // Prepare data
    const formattedData = [];

    for (const [category, items] of Object.entries(menuData)) {
      for (const item of items) {
        formattedData.push({
          category,
          name: item.name,
          price: item.price,
          numPrice: item.numPrice,
          rating: item.rating,
          calories: item.calories,
          desc: item.desc,
          image: item.image,
          active: item.active
        });
      }
    }

    // Insert new items
    const inserted = await MenuItem.insertMany(formattedData);
    console.log(`Successfully seeded ${inserted.length} menu items!`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
