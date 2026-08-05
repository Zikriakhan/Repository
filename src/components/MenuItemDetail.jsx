import React, { useState, useEffect } from 'react';
import { ChevronLeft, ShoppingBag, Check, Plus, Minus, Info, Heart, Share2, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Database of menu items with detailed prices, calories, ingredients, and allergens
const ITEM_DATABASE = {
  'pickle-fries': {
    name: 'Pickle Fries',
    price: '$11.95',
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
    price: '$15.95',
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
    price: '$13.95',
    numPrice: 13.95,
    calories: '740 Cal.',
    description: 'Spicy Creole Rice Fried Crisp with Andouille Sausage, Peppers and Onions.',
    ingredients: 'Arborio rice, Cajun spices, andouille sausage, bell peppers, onions, parmesan cheese, creole dipping tomato sauce.',
    allergens: 'Wheat, Milk, Eggs',
    category: 'New Menu – Bites',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=1000&auto=format&fit=crop',
    tag: 'SPICY SELECT'
  },
  'classic-italian-lasagna': {
    name: 'Classic Italian Lasagna',
    price: '$16.95',
    numPrice: 16.95,
    calories: '850 Cal.',
    description: 'Layers of slow-simmered meat sauce, creamy ricotta, and melted mozzarella baked to golden perfection.',
    ingredients: 'Fresh pasta sheets, slow-braised ground beef & pork ragù, whole-milk ricotta, fresh mozzarella, aged parmesan, San Marzano tomatoes, fresh basil, Italian herbs.',
    allergens: 'Wheat, Milk, Eggs',
    category: 'New Menu – Bites',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=1000&auto=format&fit=crop',
    tag: 'ITALIAN CLASSIC'
  },
  'aesthetic-penne-pasta': {
    name: 'Aesthetic Penne Pasta',
    price: '$14.50',
    numPrice: 14.50,
    calories: '720 Cal.',
    description: 'Penne tossed in a rich tomato sauce, finished with fresh basil and shaved parmesan.',
    ingredients: 'Al dente penne, house-made tomato basil sauce, fresh garlic, aged parmesan, extra-virgin olive oil, fresh basil, sea salt.',
    allergens: 'Wheat, Milk',
    category: 'New Menu – Bites',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1000&auto=format&fit=crop',
    tag: 'PASTA PERFECTION'
  },
  'ultimate-double-cheese-pizza': {
    name: 'Ultimate Double Cheese Pizza',
    price: '$15.95',
    numPrice: 15.95,
    calories: '940 Cal.',
    description: 'A wood-fired crust loaded with a blend of mozzarella, provolone, and cheddar, pulled fresh for that signature cheese-stretch in every slice.',
    ingredients: 'Hand-tossed dough, signature tomato sauce, whole-milk mozzarella, aged provolone, sharp cheddar, fresh garlic, Italian herbs, extra-virgin olive oil.',
    allergens: 'Wheat, Milk',
    category: 'New Menu – Bites',
    image: 'https://images.unsplash.com/photo-1616141215340-34b0e7c661c8?q=80&w=1000&auto=format&fit=crop',
    tag: 'SIGNATURE PIZZA'
  },
  'bbq-pork-belly-buns': {
    name: 'BBQ Pork Belly Buns',
    price: '$14.50',
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
    price: '$14.95',
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
    price: '$11.50',
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
    name: 'Fresh Strawberry Cheesecake',
    price: '$10.50',
    numPrice: 10.50,
    calories: '1010 Cal.',
    description: 'Our original legendary cheesecake topped with glazed fresh strawberries. Most popular for over 40 years!',
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
  const [extraDippingSauce, setExtraDippingSauce] = useState(false);
  const [makeItSpicy, setMakeItSpicy] = useState(false);
  const [extraCrispy, setExtraCrispy] = useState(false);
  const [showAddedModal, setShowAddedModal] = useState(false);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  // Extract category and item slug from path (e.g. /menu/bites/pickle-fries)
  const pathParts = currentPath.split('/').filter(Boolean);
  const categorySlug = pathParts[1] || 'bites';
  const itemSlug = pathParts[2] || 'pickle-fries';

  const locationState = window.history.state || {};
  const dbItem = ITEM_DATABASE[itemSlug] || {};

  // Resolve item properties with fallbacks
  const itemName = dbItem.name || locationState.name || itemSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const itemPrice = dbItem.price || locationState.price || '$11.95';
  const baseNumPrice = dbItem.numPrice || (itemPrice ? parseFloat(itemPrice.replace(/[^0-9.-]+/g, "")) : 11.95);
  const itemCalories = dbItem.calories || '580 Cal.';
  const itemDescription = dbItem.description || locationState.description || 'Hand Breaded and Fried Crisp. Served with our signature Housemade dipping sauce.';
  const itemIngredients = dbItem.ingredients || 'Prepared fresh in our scratch kitchen using premium ingredients, signature spices, and fresh herbs.';
  const itemAllergens = dbItem.allergens || 'Wheat, Milk, Eggs';
  const itemCategory = dbItem.category || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const itemImage = dbItem.image || locationState.image || 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=1000&auto=format&fit=crop';
  const itemTag = dbItem.tag || 'MADE FRESH FROM SCRATCH';

  // Calculate dynamic total price
  const optionsAddonPrice = extraDippingSauce ? 1.50 : 0;
  const singleItemPrice = baseNumPrice + optionsAddonPrice;
  const totalPrice = (singleItemPrice * quantity).toFixed(2);

  const handleBack = (e) => {
    e.preventDefault();
    window.history.pushState(null, '', '/BrowseMenu');
    window.dispatchEvent(new Event('popstate'));
  };

  const handleStartOrder = () => {
    // Collect selected customization notes
    const activeOptions = [];
    if (extraDippingSauce) activeOptions.push('Extra Dipping Sauce (+$1.50)');
    if (makeItSpicy) activeOptions.push('Make it Spicy / Extra Seasoning');
    if (extraCrispy) activeOptions.push('Cook Extra Crispy');

    const fullNotes = [
      activeOptions.length > 0 ? `Options: ${activeOptions.join(', ')}` : '',
      specialInstructions ? `Note: "${specialInstructions}"` : ''
    ].filter(Boolean).join(' | ');

    addToCart({
      name: itemName,
      price: `$${singleItemPrice.toFixed(2)}`,
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
                  ${singleItemPrice.toFixed(2)}
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
              <div className="mb-8">
                <h3 className="text-xs font-extrabold tracking-[0.15em] uppercase text-[var(--theme-primary)] mb-4 flex items-center gap-2">
                  <span>✨ Customize Your Order</span>
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-colors bg-white">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={extraDippingSauce}
                        onChange={(e) => setExtraDippingSauce(e.target.checked)}
                        className="w-4 h-4 text-[var(--theme-accent)] rounded focus:ring-2 focus:ring-[var(--theme-accent)]"
                      />
                      <span className="text-sm font-semibold text-gray-700">Extra Dipping Sauce</span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">+ $1.50</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-colors bg-white">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={makeItSpicy}
                        onChange={(e) => setMakeItSpicy(e.target.checked)}
                        className="w-4 h-4 text-[var(--theme-accent)] rounded focus:ring-2 focus:ring-[var(--theme-accent)]"
                      />
                      <span className="text-sm font-semibold text-gray-700">Make it Spicy / Extra Seasoning</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">FREE</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-colors bg-white">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={extraCrispy}
                        onChange={(e) => setExtraCrispy(e.target.checked)}
                        className="w-4 h-4 text-[var(--theme-accent)] rounded focus:ring-2 focus:ring-[var(--theme-accent)]"
                      />
                      <span className="text-sm font-semibold text-gray-700">Cook Extra Crispy</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">FREE</span>
                  </label>
                </div>
              </div>

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
                  <span>Start an Order • Add to Bag (${totalPrice})</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Nutritional & Allergy Footer Notice */}
        <div className="mt-12 text-center text-xs text-gray-500 max-w-2xl mx-auto space-y-2 leading-relaxed">
          <p>
            2,000 calories a day is used for general nutrition advice, but calorie needs vary. Additional nutritional and allergen information available upon request.
          </p>
          <p className="font-semibold text-gray-600">
            *Dine-In, Curbside Pickup, and DoorDash Delivery available at participating restaurant locations.
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
            <p className="text-gray-600 text-sm mb-6 font-medium">
              You added <span className="font-bold text-gray-900">{quantity}x {itemName}</span> to your order for <span className="font-bold text-[var(--theme-accent)]">${totalPrice}</span>.
            </p>

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
    </div>
  );
}
