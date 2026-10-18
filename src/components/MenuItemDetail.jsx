import React, { useState, useEffect } from 'react';
import { ChevronLeft, ShoppingBag, Check, Plus, Minus, ShieldCheck, Sparkles, ArrowRight, ZoomIn, X, Flame, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdminData } from '../context/AdminDataContext';
import flyerImg from '../assets/bake-levels-flyer.jpg';

// Pizza Bake Levels inspired by authentic Italian Pizza Kawkab flyer
export const BAKE_LEVELS = [
  {
    id: 1,
    title: '1. SOFT & EASY',
    subtitle: 'Light bake • Soft crust',
    description: 'Least cooked, chewy and tender.',
    crustImage: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&auto=format&fit=crop',
    badge: 'Light Bake'
  },
  {
    id: 2,
    title: '2. THE CLASSIC',
    subtitle: 'Our normal golden bake',
    description: 'The standard, balanced option.',
    isDefault: true,
    crustImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop',
    badge: 'Recommended Standard'
  },
  {
    id: 3,
    title: '3. CRISPY BUSINESS',
    subtitle: 'Extra golden • Extra crunch',
    description: 'Noticeably crisper than normal.',
    crustImage: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=300&auto=format&fit=crop',
    badge: 'Extra Crunch'
  },
  {
    id: 4,
    title: '4. WELL DONE, BOSS',
    subtitle: 'Dark edges • Serious crunch',
    description: 'Charred crust edges with a strong crunch.',
    crustImage: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=300&auto=format&fit=crop',
    badge: 'Dark Edges'
  },
  {
    id: 5,
    title: '5. SEND IT TO THE VOLCANO',
    hasFlame: true,
    subtitle: 'Extra charred • No complaints later!',
    description: 'The most burnt and crunchy level, at your own risk.',
    crustImage: 'https://images.unsplash.com/photo-1542834369-f10ebf06d3e0?w=300&auto=format&fit=crop',
    badge: 'Super Charred 🔥'
  }
];

// Database of menu items with detailed prices, calories, ingredients, and allergens
const ITEM_DATABASE = {
  'chicken-tandoori': {
    name: 'CHICKEN TANDOORI / دجاج تندوري',
    price: 'AED19.00',
    numPrice: 19.00,
    calories: '680 Cal.',
    description: 'A local delicacy inspired by our customers. This pizza is not to be missed. Bursting with spices, tomatoes, mozzarella, mushroom and tandoori chicken. / طعام شهي محلي مستوحى من زبائننا، هذه البيتزا لا ينبغي تفويتها، مليئة بالتوابل والطماطم والموتزاريلا والفطر ودجاج التندوري.',
    ingredients: 'Hand-tossed dough, spiced tomato sauce, marinated tandoori chicken breast, fresh mozzarella, sliced mushrooms, bell peppers, fresh cilantro, signature Kawkab spice blend.',
    allergens: 'Wheat, Milk, Mustard, Soy',
    category: 'Pizzas',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop',
    tag: 'LOCAL DELICACY & BEST SELLER'
  },
  'chicken-tandoori-': {
    name: 'CHICKEN TANDOORI / دجاج تندوري',
    price: 'AED19.00',
    numPrice: 19.00,
    calories: '680 Cal.',
    description: 'A local delicacy inspired by our customers. This pizza is not to be missed. Bursting with spices, tomatoes, mozzarella, mushroom and tandoori chicken. / طعام شهي محلي مستوحى من زبائننا، هذه البيتزا لا ينبغي تفويتها، مليئة بالتوابل والطماطم والموتزاريلا والفطر ودجاج التندوري.',
    ingredients: 'Hand-tossed dough, spiced tomato sauce, marinated tandoori chicken breast, fresh mozzarella, sliced mushrooms, bell peppers, fresh cilantro, signature Kawkab spice blend.',
    allergens: 'Wheat, Milk, Mustard, Soy',
    category: 'Pizzas',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop',
    tag: 'LOCAL DELICACY & BEST SELLER'
  },
  'calzone': {
    name: 'Calzone',
    price: 'AED17.00',
    numPrice: 17.00,
    calories: '580 Cal.',
    description: 'Pizza Sandwich - The king of sandwiches! Contains tomato, mozzarella, Salami, Chicken, Mushroom and capsicum / ساندوتش بيتزا - ملك السندويشات! يحتوي على طماطم وجبن موزاربلا، سلامي، دجاج، مشروم وفلفل',
    ingredients: 'Prepared fresh in our scratch kitchen using premium ingredients, signature spices, and fresh herbs.',
    allergens: 'Wheat, Milk, Eggs',
    category: 'Pizzas',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=1000&auto=format&fit=crop',
    tag: 'KING OF SANDWICHES'
  },
  'pickle-fries': {
    name: 'Pickle Fries',
    price: 'AED11.95',
    numPrice: 11.95,
    calories: '580 Cal.',
    description: 'Hand Breaded and Fried Crisp. Served with Spicy Ranch dipping sauce.',
    ingredients: 'Crispy battered dill pickle spears, house blend seasoned flour, spicy ranch dipping sauce, fresh parsley garnish.',
    allergens: 'Wheat, Milk, Eggs, Soy',
    category: 'New Menu – Bites',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=1000&auto=format&fit=crop',
    tag: 'NEW & TRENDING'
  },
  'asian-chicken-nachos': {
    name: 'Asian Chicken Nachos',
    price: 'AED15.95',
    numPrice: 15.95,
    calories: '1120 Cal.',
    description: 'Wonton Chips, Melted Cheese, Thai Peanut Sauce, Green Onion, Sesame and Wasabi Cream.',
    ingredients: 'Crispy wonton chips, tender grilled chicken, cheddar & jack cheese blend, peanut sauce, wasabi aioli, sesame seeds.',
    allergens: 'Wheat, Milk, Peanuts, Soy, Sesame',
    category: 'New Menu – Bites',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=1000&auto=format&fit=crop',
    tag: 'GUEST FAVORITE'
  },
  'spicy-jambalaya-arancini': {
    name: 'Spicy Jambalaya Arancini',
    price: 'AED13.95',
    numPrice: 13.95,
    calories: '740 Cal.',
    description: 'Spicy Creole Rice Fried Crisp with Andouille Sausage, Peppers and Onions.',
    ingredients: 'Arborio rice, Cajun spices, andouille sausage, bell peppers, onions, parmesan cheese, creole dipping tomato sauce.',
    allergens: 'Wheat, Milk, Eggs',
    category: 'New Menu – Bites',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=1000&auto=format&fit=crop',
    tag: 'SPICY SELECT'
  },
  'classic-italian-pizza': {
    name: 'Classic Italian Wood-Fired Pizza',
    price: 'AED 38.00',
    numPrice: 38.00,
    calories: '860 Cal.',
    description: 'Hand-stretched artisanal dough topped with authentic San Marzano tomato sauce, fresh buffalo mozzarella, aromatic sweet basil leaves, and extra-virgin olive oil — baked to blistered perfection in our 450°C wood-fired oven.',
    ingredients: 'Fermented artisan flour, San Marzano D.O.P. tomatoes, fresh buffalo mozzarella, sweet basil, Sicilian extra-virgin olive oil, sea salt.',
    allergens: 'Wheat, Milk',
    category: 'Pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop',
    tag: 'SIGNATURE WOOD-FIRED'
  },
  'classic-strawberry-cheesecake': {
    name: 'Specialty Strawberry Cheesecake & Sundae',
    price: 'AED 34.00',
    numPrice: 34.00,
    calories: '830 Cal.',
    description: 'Velvety smooth cream cheese baked over our legendary buttery graham crust, crowned with glazed fresh strawberries, rich Belgian chocolate swirls, and freshly whipped sweet cream.',
    ingredients: 'Real Philadelphia cream cheese, hand-pressed graham cracker crust, fresh farm strawberries, strawberry glaze, pure vanilla bean, Belgian chocolate, fresh whipped cream.',
    allergens: 'Wheat, Milk, Eggs',
    category: 'Specialty Desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop',
    tag: 'SIGNATURE DESSERT'
  },
  'classic-italian-lasagna': {
    name: 'Classic Italian Lasagna',
    price: 'AED 38.00',
    numPrice: 38.00,
    calories: '850 Cal.',
    description: 'Layers of delicate pasta, rich slow-cooked meat sauce, creamy ricotta, and bubbling melted mozzarella — baked to golden, bubbling perfection.',
    ingredients: 'Fresh pasta sheets, slow-braised ground beef & pork ragù, whole-milk ricotta, fresh mozzarella, aged parmesan, San Marzano tomatoes, fresh basil, Italian herbs.',
    allergens: 'Wheat, Milk, Eggs',
    category: 'New Menu – Bites',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=1000&auto=format&fit=crop',
    tag: 'ITALIAN CLASSIC'
  },
  'aesthetic-penne-pasta': {
    name: 'Aesthetic Penne & Pasta',
    price: 'AED 34.00',
    numPrice: 34.00,
    calories: '720 Cal.',
    description: 'Fresh penne tossed in a creamy tomato-basil sauce, garnished with parmesan and fresh herbs — a beautiful, deceptively simple Italian classic.',
    ingredients: 'Al dente penne, house-made tomato basil sauce, fresh garlic, aged parmesan, extra-virgin olive oil, fresh basil, sea salt.',
    allergens: 'Wheat, Milk',
    category: 'New Menu – Bites',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1000&auto=format&fit=crop',
    tag: 'PASTA PERFECTION'
  },
  'ultimate-double-cheese-pizza': {
    name: 'Ultimate Double Cheese Pizza',
    price: 'AED 90.00',
    numPrice: 90,
    calories: '940 Cal.',
    description: 'A wood-fired crust loaded with a blend of mozzarella, provolone, and cheddar — pulled fresh for that legendary cheese-stretch in every slice.',
    ingredients: 'Hand-tossed dough, signature tomato sauce, whole-milk mozzarella, aged provolone, sharp cheddar, fresh garlic, Italian herbs, extra-virgin olive oil.',
    allergens: 'Wheat, Milk',
    category: 'New Menu – Bites',
    image: 'https://images.unsplash.com/photo-1616141215340-34b0e7c661c8?q=80&w=1000&auto=format&fit=crop',
    tag: 'SIGNATURE PIZZA'
  },
  'bbq-pork-belly-buns': {
    name: 'BBQ Pork Belly Buns',
    price: 'AED14.50',
    numPrice: 14.50,
    calories: '890 Cal.',
    description: 'Tender Pork Served on Warm, Soft Rolls with Cole Slaw, Crispy Onions and Pickles.',
    ingredients: 'Slow-braised pork belly, house BBQ glaze, steamed bao buns, crunchy coleslaw, crispy onion straws, dill pickles.',
    allergens: 'Wheat, Soy, Sesame',
    category: 'New Menu – Bites',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=1000&auto=format&fit=crop',
    tag: 'CHEF RECOMMENDATION'
  },
  'baked-brie-with-truffle-honey-butter': {
    name: 'Baked Brie with Truffle-Honey Butter',
    price: 'AED14.95',
    numPrice: 14.95,
    calories: '920 Cal.',
    description: 'Warm Bread with Brie Cheese Drizzled with Truffle-Honey Butter and Housemade Orange Marmalade.',
    ingredients: 'Imported French brie cheese, white truffle honey butter, orange marmalade, toasted artisan baguette slices.',
    allergens: 'Wheat, Milk',
    category: 'New Menu – Bites',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=1000&auto=format&fit=crop',
    tag: 'ARTISAN SPECIAL'
  },
  'parmesan-truffle-fries': {
    name: 'Parmesan Truffle Fries',
    price: 'AED11.50',
    numPrice: 11.50,
    calories: '680 Cal.',
    description: 'Served with Truffle Aioli and fresh grated parmesan.',
    ingredients: 'Hand-cut russet potatoes, white truffle oil, aged parmesan cheese, sea salt, truffle garlic aioli.',
    allergens: 'Milk, Eggs',
    category: 'New Menu – Bites',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=1000&auto=format&fit=crop',
    tag: 'CLASSIC BITE'
  },
  'fresh-strawberry-cheesecake': {
    name: 'super supreme pizza',
    price: 'AED10.50',
    numPrice: 10.50,
    calories: '1010 Cal.',
    description: 'Our original legendary Italian pizza kawkabtopped with glazed fresh strawberries. Most popular for Over 26 Years!',
    ingredients: 'Cream cheese, sugar, farm fresh eggs, graham cracker crust, sour cream topping, fresh California strawberries, strawberry glaze.',
    allergens: 'Wheat, Milk, Eggs',
    category: 'Cheesecakes & Specialty Desserts',
    image: 'http://olo-images-live.imgix.net/67/67d96b906aca40d3ae37c5bfbecb6aae.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=e81f52f6a700a0e3643b50bcf3d33dd5',
    tag: '#1 LEGENDARY FAVORITE'
  }
};

export default function MenuItemDetail() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const { addToCart } = useCart();

  // Order Customization States
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showAddedModal, setShowAddedModal] = useState(false);
  const [showFlyerModal, setShowFlyerModal] = useState(false);
  const [selectedBakeLevel, setSelectedBakeLevel] = useState(BAKE_LEVELS[1]); // Default to "2. THE CLASSIC"

  const { data: adminData, getVariations } = useAdminData();
  const [variations, setVariations] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [loadingVariations, setLoadingVariations] = useState(false);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  // Extract category and item slug from path (e.g. /menu/pizzas/calzone or /menu/pizzas/chicken-tandoori-)
  const pathParts = currentPath.split('/').filter(Boolean);
  const categorySlug = pathParts[1] || 'bites';
  const rawItemSlug = pathParts[2] || 'pickle-fries';
  const itemSlug = rawItemSlug.replace(/-+$/, '').toLowerCase();

  const locationState = window.history.state || {};
  const dbItem = ITEM_DATABASE[itemSlug] || ITEM_DATABASE[rawItemSlug] || {};

  // Resolve item properties with fallbacks
  const itemName = dbItem.name || locationState.name || itemSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const itemPrice = dbItem.price || locationState.price || 'AED17.00';
  const baseNumPrice = dbItem.numPrice || (itemPrice ? parseFloat(itemPrice.replace(/[^0-9.-]+/g, "")) : 17.00);
  const itemCalories = dbItem.calories || '580 Cal.';
  const itemDescription = dbItem.description || locationState.description || 'Pizza Sandwich - The king of sandwiches! Contains tomato, mozzarella, Salami, Chicken, Mushroom and capsicum / ساندوتش بيتزا - ملك السندويشات! يحتوي على طماطم وجبن موزاربلا، سلامي، دجاج، مشروم وفلفل';
  const itemIngredients = dbItem.ingredients || 'Prepared fresh in our scratch kitchen using premium ingredients, signature spices, and fresh herbs.';
  const itemAllergens = dbItem.allergens || 'Wheat, Milk, Eggs';
  const itemCategory = dbItem.category || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const itemImage = dbItem.image || locationState.image || 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=1000&auto=format&fit=crop';
  const itemTag = dbItem.tag || 'KING OF SANDWICHES';

  const isPizzaItem =
    categorySlug.toLowerCase().includes('pizza') ||
    itemSlug.includes('pizza') ||
    itemSlug.includes('tandoori') ||
    itemSlug.includes('calzone') ||
    itemName.toLowerCase().includes('pizza') ||
    itemName.toLowerCase().includes('tandoori') ||
    itemName.toLowerCase().includes('calzone');

  // Fetch or resolve variations
  useEffect(() => {
    const fetchVariations = async () => {
      setLoadingVariations(true);
      let resolvedId = locationState.id;

      // Try finding ID from admin data if locationState.id is not passed directly
      if (!resolvedId && adminData && adminData.menuItems) {
        Object.values(adminData.menuItems).flat().forEach(i => {
          const iSlug = (i.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
          if (iSlug === itemSlug || (i.name || '').toLowerCase().includes('tandoori') || (i.name || '').toLowerCase().includes('calzone')) {
            resolvedId = i.id || i._id;
          }
        });
      }

      let activeVariations = [];
      if (resolvedId) {
        try {
          const fetched = await getVariations(resolvedId);
          if (Array.isArray(fetched) && fetched.length > 0) {
            activeVariations = fetched.filter(v => v.active !== false);
          }
        } catch (err) {
          console.warn('Could not fetch variations from API:', err);
        }
      }

      // Default fallback size variations for Pizzas, Chicken Tandoori, Calzone, etc.
      if (activeVariations.length === 0) {
        if (
          isPizzaItem ||
          itemSlug.includes('calzone') ||
          categorySlug === 'pizzas' ||
          itemName.toLowerCase().includes('calzone') ||
          itemName.toLowerCase().includes('tandoori')
        ) {
          activeVariations = [
            { id: 'var-sm', name: 'Small (8")', price: 'AED19.00', numPrice: 19.00 },
            { id: 'var-md', name: 'Medium (10")', price: 'AED24.00', numPrice: 24.00 },
            { id: 'var-lg', name: 'Large (12")', price: 'AED29.00', numPrice: 29.00 }
          ];
        }
      }

      setVariations(activeVariations);
      if (activeVariations.length > 0) {
        setSelectedVariation(activeVariations[0]);
      }
      setLoadingVariations(false);
    };

    fetchVariations();
  }, [locationState.id, itemSlug, categorySlug, itemName, isPizzaItem, adminData, getVariations]);

  // Calculate dynamic total price
  const currentNumPrice = selectedVariation ? selectedVariation.numPrice : baseNumPrice;
  const singleItemPrice = currentNumPrice;
  const totalPrice = (singleItemPrice * quantity).toFixed(2);

  const handleBack = (e) => {
    e.preventDefault();
    window.history.pushState(null, '', '/BrowseMenu');
    window.dispatchEvent(new Event('popstate'));
  };

  const handleStartOrder = () => {
    const bakeNote = isPizzaItem ? `Bake Level: ${selectedBakeLevel.title} (${selectedBakeLevel.subtitle})` : '';
    const fullNotes = [
      bakeNote,
      specialInstructions ? `Note: "${specialInstructions}"` : ''
    ].filter(Boolean).join(' | ');

    addToCart({
      id: locationState.id, // For tracking
      category: itemCategory,
      calories: itemCalories,
      ingredients: itemIngredients,
      allergens: itemAllergens,
      variationId: selectedVariation ? (selectedVariation._id || selectedVariation.id) : null,
      variationName: selectedVariation ? selectedVariation.name : null,
      bakeLevel: isPizzaItem ? selectedBakeLevel.title : null,
      bakeLevelSub: isPizzaItem ? selectedBakeLevel.subtitle : null,
      name: itemName,
      price: `AED${singleItemPrice.toFixed(2)}`,
      numPrice: singleItemPrice,
      img: itemImage,
      desc: itemDescription,
      quantity: quantity,
      specialInstructions: fullNotes
    });

    setShowAddedModal(true);
  };

  const navigateTo = (path) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <div className="bg-[var(--theme-light)] font-sans text-[#1F2937] min-h-screen pt-24 pb-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,800;1,600&family=Inter:wght@400;500;600;700;800&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Top Breadcrumb & Navigation */}
        <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
          <a
            href="/BrowseMenu"
            onClick={handleBack}
            className="text-[var(--theme-primary)] hover:opacity-80 flex items-center gap-1.5 text-sm md:text-base font-bold tracking-wider uppercase transition-all group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to {itemCategory}
          </a>
          <span className="hidden md:inline-flex items-center gap-2 text-xs font-bold text-gray-500 tracking-widest uppercase">
            <Sparkles size={14} className="text-[var(--theme-accent)]" />
            Scratch Made Daily • Dine In &amp; Takeout
          </span>
        </div>

        {/* Product Showcase Grid */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">

          {/* Left Column: High Res Image with Tag Badge */}
          <div className="lg:col-span-7 relative bg-gray-900 overflow-hidden min-h-[400px] lg:min-h-[600px] flex items-center justify-center">
            <img
              src={itemImage}
              alt={itemName}
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-6 left-6 z-10">
              <span className="bg-[var(--theme-accent)] text-white text-xs font-extrabold tracking-[0.2em] uppercase px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                <Sparkles size={14} /> {itemTag}
              </span>
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 md:p-8 text-white">
              <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase opacity-90">
                <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-emerald-400" /> Made Fresh to Order</span>
                <span>•</span>
                <span>{itemCalories}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Customization & Details */}
          <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between bg-white">
            <div>
              {/* Category & Title */}
              <div className="text-xs font-extrabold tracking-[0.2em] uppercase text-gray-400 mb-2">
                {itemCategory}
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-[var(--theme-primary)] mb-4 leading-tight">
                {itemName}
              </h1>

              {/* Price & Calories Badge */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <span className="font-serif text-3xl font-extrabold text-[var(--theme-accent)]">
                  AED{singleItemPrice.toFixed(2)}
                </span>
                <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-md">
                  {itemCalories}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed font-normal">
                {itemDescription}
              </p>

              {/* Ingredients & Allergens Box */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-8 space-y-2">
                <div className="text-xs">
                  <span className="font-bold text-gray-700 uppercase tracking-wider">Ingredients:</span>{' '}
                  <span className="text-gray-600">{itemIngredients}</span>
                </div>
                <div className="text-xs pt-2 border-t border-gray-200">
                  <span className="font-bold text-[var(--theme-accent)] uppercase tracking-wider">Allergens:</span>{' '}
                  <span className="text-gray-700 font-medium">{itemAllergens}</span>
                </div>
              </div>

              {/* Customization Options */}
              {loadingVariations ? (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-500 animate-pulse">Loading size options...</div>
              ) : variations.length > 0 ? (
                <div className="mb-8">
                  <h3 className="text-xs font-extrabold tracking-[0.15em] uppercase text-[var(--theme-primary)] mb-4 flex items-center gap-2">
                    <span>✨ Choose Your Size</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {variations.map((v) => (
                      <label
                        key={v._id || v.id}
                        className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedVariation && (selectedVariation._id || selectedVariation.id) === (v._id || v.id) ? 'border-[var(--theme-accent)] bg-red-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <input
                            type="radio"
                            name="variation"
                            className="sr-only"
                            checked={selectedVariation && (selectedVariation._id || selectedVariation.id) === (v._id || v.id)}
                            onChange={() => setSelectedVariation(v)}
                          />
                          <span className="font-bold text-gray-800">{v.name}</span>
                          {selectedVariation && (selectedVariation._id || selectedVariation.id) === (v._id || v.id) && (
                            <Check size={16} className="text-[var(--theme-accent)]" />
                          )}
                        </div>
                        <span className="text-sm font-semibold text-gray-600">AED{v.numPrice.toFixed(2)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Crust Bake Level Summary Pill (Scrolls to visual bake customizer below) */}
              {isPizzaItem && (
                <div className="mb-6 p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-300 shadow-sm flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-0.5">
                      <Sparkles size={12} className="text-amber-600" />
                      <span>CRUST BAKE LEVEL:</span>
                    </div>
                    <div className="font-serif font-black text-sm sm:text-base text-[var(--theme-primary)] flex items-center gap-1.5 truncate">
                      <span>{selectedBakeLevel.title}</span>
                      {selectedBakeLevel.hasFlame && <span>🔥</span>}
                      {selectedBakeLevel.isDefault && (
                        <span className="text-[9px] bg-amber-400 text-black font-black px-1.5 py-0.5 rounded uppercase">Default</span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--theme-accent)] font-bold italic truncate">
                      {selectedBakeLevel.subtitle}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('bake-level-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="shrink-0 bg-white border border-amber-400 hover:bg-amber-100 text-[var(--theme-accent)] font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1"
                  >
                    <span>Customize</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}

              {/* Special Instructions Input */}
              <div className="mb-8">
                <label className="block text-xs font-extrabold tracking-[0.15em] uppercase text-gray-700 mb-2">
                  Special Instructions
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Add special instructions for the kitchen (e.g. sauce on the side, allergies, extra napkins)..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-transparent text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Bottom Action Section: Quantity + Start Order Button */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">

                {/* Quantity Selector */}
                <div className="flex items-center justify-between border-2 border-gray-300 rounded-xl p-1.5 bg-gray-50 shrink-0">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-40 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-bold text-lg text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* START AN ORDER BUTTON */}
                <button
                  onClick={handleStartOrder}
                  className="flex-1 bg-[var(--theme-accent)] hover:opacity-90 text-white py-4 px-6 rounded-xl font-bold tracking-[0.15em] uppercase text-sm shadow-lg hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={20} />
                  <span>Start an Order • Add to Bag (AED{totalPrice})</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* DEDICATED PIZZA CRUST CUSTOMIZER: HOW CRISPY DO YOU LIKE IT? */}
        {/* Left Side: Authentic Flyer Image | Right Section: 2 or 3 items in one line */}
        {/* ============================================================ */}
        {isPizzaItem && (
          <section id="bake-level-section" className="mt-12 bg-white rounded-3xl shadow-2xl border-2 border-[#d4af37]/60 overflow-hidden p-6 sm:p-10 relative scroll-mt-28">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 pb-6 border-b border-[#d4af37]/30">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black tracking-[0.2em] uppercase mb-3 shadow-xs">
                <Sparkles size={14} className="text-amber-700" />
                <span>WOOD-FIRED 450°C STONE OVEN CUSTOMIZER</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[var(--theme-primary)] tracking-tight uppercase">
                HOW CRISPY DO YOU LIKE IT?
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2 text-[#b8860b] font-black tracking-[0.25em] text-xs sm:text-sm uppercase">
                <span>⤚</span>
                <span>CHOOSE YOUR BAKE LEVEL</span>
                <span>⤙</span>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mt-3 max-w-xl mx-auto font-medium">
                Every pizza at Italian Pizza Kawkab is made to order. Select your crust bake from soft and tender to extra volcano charred!
              </p>
            </div>

            {/* Grid Layout: Left Side (Image) + Right Section (2 or 3 items per line) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

              {/* LEFT SIDE: Authentic Flyer Image Showcase */}
              <div className="lg:col-span-4 flex flex-col justify-between bg-gradient-to-b from-[#0c182a] to-[#050a12] rounded-2xl p-4 sm:p-5 border-2 border-[#d4af37] shadow-xl text-white relative overflow-hidden group">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="uppercase tracking-widest text-[10px] bg-amber-400 text-black px-2.5 py-0.5 rounded font-black shadow-xs">
                    Authentic Menu Flyer
                  </span>
                  <span className="text-[11px] text-amber-300/80 font-medium">Italian Pizza Kawkab</span>
                </div>

                {/* Clickable Image Container */}
                <div
                  onClick={() => setShowFlyerModal(true)}
                  className="relative rounded-xl overflow-hidden border border-white/20 shadow-lg bg-black cursor-pointer flex-1 min-h-[380px] max-h-[520px]"
                  title="Click to view full flyer"
                >
                  <img
                    src={flyerImg}
                    alt="Authentic How Crispy Do You Like It Flyer"
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50 pointer-events-none" />

                  {/* Zoom Badge on Hover */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-amber-400 text-black text-xs font-black px-4 py-2 rounded-xl shadow-xl flex items-center gap-1.5 uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <ZoomIn size={16} /> Click to View Fullscreen
                    </span>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-3 inset-x-3 text-center bg-black/80 backdrop-blur-md py-2 px-3 rounded-lg border border-white/10">
                    <p className="text-[11px] font-bold text-amber-300">Sharjah Authentic Table Menu</p>
                    <p className="text-[9px] text-gray-300">Serving Sharjah Since 1999</p>
                  </div>
                </div>

                {/* Left Card Footer Notice */}
                <div className="mt-4 pt-3 border-t border-white/10 text-center text-[11px] text-gray-300 italic">
                  "Please choose one. If no level is selected, we'll serve <strong className="text-amber-300">THE CLASSIC</strong>."
                </div>
              </div>

              {/* RIGHT SECTION: Interactive Bake Level Options (2 or 3 items in one line) */}
              <div className="lg:col-span-8 flex flex-col justify-between">

                {/* Responsive Grid: 2 or 3 items per line! */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4 mb-6">
                  {BAKE_LEVELS.map((level) => {
                    const isSelected = selectedBakeLevel.id === level.id;
                    return (
                      <div
                        key={level.id}
                        onClick={() => setSelectedBakeLevel(level)}
                        className={`rounded-2xl p-4 sm:p-5 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group ${isSelected
                            ? 'bg-amber-50/90 border-amber-500 ring-2 ring-amber-400 shadow-xl shadow-amber-500/10 scale-[1.02]'
                            : 'bg-white border-gray-200 hover:border-amber-400 hover:shadow-lg'
                          }`}
                      >
                        {/* Top: Crust Thumbnail + Radio Check Circle */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border-2 border-gray-200 shadow-sm">
                            <img
                              src={level.crustImage}
                              alt={level.title}
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            {isSelected && (
                              <div className="absolute inset-0 bg-amber-400/25 ring-2 ring-amber-500" />
                            )}
                          </div>

                          {/* Radio Checkmark Circle */}
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${isSelected
                                ? 'border-amber-500 bg-amber-500 text-white shadow-md'
                                : 'border-gray-300 bg-white group-hover:border-amber-400'
                              }`}
                          >
                            {isSelected && <Check size={14} strokeWidth={3} />}
                          </div>
                        </div>

                        {/* Title, Flame, & Subtitle */}
                        <div className="mb-3">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="font-serif font-black text-sm sm:text-base text-gray-900 uppercase tracking-tight">
                              {level.title}
                            </h3>
                            {level.hasFlame && <span className="text-base animate-pulse">🔥</span>}
                          </div>
                          <div className="text-xs text-[var(--theme-accent)] font-bold italic mt-0.5">
                            {level.subtitle}
                          </div>
                          <p className="text-[11px] sm:text-xs text-gray-600 mt-1 leading-snug font-medium">
                            {level.description}
                          </p>
                        </div>

                        {/* Bottom Tag Badge */}
                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px]">
                          <span className={`font-black px-2 py-0.5 rounded uppercase tracking-wider ${isSelected
                              ? 'bg-amber-400 text-black'
                              : level.isDefault
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : level.hasFlame
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-700'
                            }`}>
                            {level.badge}
                          </span>

                          {isSelected && (
                            <span className="text-amber-700 font-bold flex items-center gap-1 text-[11px]">
                              <CheckCircle2 size={13} className="text-emerald-600" />
                              Selected
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Bake Level Recap Bar */}
                <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 border-2 border-amber-400/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">
                      CURRENT CRUST SELECTION:
                    </span>
                    <div className="font-serif font-black text-base sm:text-lg text-[var(--theme-primary)] flex items-center justify-center sm:justify-start gap-2 mt-0.5">
                      <span>{selectedBakeLevel.title}</span>
                      {selectedBakeLevel.hasFlame && <span>🔥</span>}
                      <span className="text-xs font-normal text-gray-600">— {selectedBakeLevel.subtitle}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-[var(--theme-accent)] hover:opacity-90 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md transition-all shrink-0 flex items-center gap-1.5"
                  >
                    <span>Back to Order</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* Nutritional & Allergy Footer Notice */}
        <div className="mt-12 text-center text-xs text-gray-500 max-w-2xl mx-auto space-y-2 leading-relaxed">
          <p>
            2,000 calories a day is used for general nutrition advice, but calorie needs vary. Additional nutritional and allergen information available upon request.
          </p>
          <p className="font-semibold text-gray-600">
            *Dine-In, Curbside Pickup, and italian pizza Delivery available at participating restaurant locations.
          </p>
        </div>
      </main>

      {/* INSTANT CART CONFIRMATION MODAL */}
      {showAddedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-up">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-gray-100 text-center relative overflow-hidden">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Check size={36} strokeWidth={2.5} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[var(--theme-primary)] mb-2">
              Added to Your Bag!
            </h3>
            <p className="text-gray-600 text-sm mb-3 font-medium">
              You added <span className="font-bold text-gray-900">{quantity}x {itemName} {selectedVariation ? `(${selectedVariation.name})` : ''}</span> to your order for <span className="font-bold text-[var(--theme-accent)]">AED{totalPrice}</span>.
            </p>
            {isPizzaItem && selectedBakeLevel && (
              <div className="mb-6 inline-flex items-center gap-2 bg-[var(--theme-primary)] text-amber-300 px-4 py-2 rounded-xl text-xs font-bold border border-[#d4af37]/40 shadow-sm">
                <span>🔥 Crust Bake:</span>
                <span className="text-white">{selectedBakeLevel.title}</span>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowAddedModal(false);
                  navigateTo('/order');
                }}
                className="w-full bg-[var(--theme-accent)] hover:opacity-90 text-white py-4 rounded-xl font-bold tracking-widest uppercase text-xs shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <span>View Bag &amp; Checkout</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => {
                  setShowAddedModal(false);
                  navigateTo('/BrowseMenu');
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl font-bold tracking-wider uppercase text-xs transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
      {/* LIGHTBOX MODAL: FULLSCREEN FLYER PREVIEW */}
      {showFlyerModal && (
        <div
          onClick={() => setShowFlyerModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-up cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl border-2 border-[#d4af37] relative text-center max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
              <div className="text-left">
                <h3 className="font-serif font-black text-lg text-[var(--theme-primary)]">
                  HOW CRISPY DO YOU LIKE IT?
                </h3>
                <p className="text-[11px] text-[#b8860b] font-extrabold uppercase tracking-wider">
                  Authentic Italian Pizza Kawkab Sharjah Menu
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowFlyerModal(false)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-auto rounded-xl border border-gray-200">
              <img
                src={flyerImg}
                alt="Full Size Pizza Bake Level Flyer"
                className="w-full h-auto object-contain mx-auto"
              />
            </div>

            <div className="mt-3 text-xs text-gray-500 italic">
              Tap anywhere outside or the close button to return to your order.
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
