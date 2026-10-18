import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminDataContext = createContext();

export function useAdminData() {
  return useContext(AdminDataContext);
}

export const API_URL = import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname.includes('repository-nine-navy.vercel.app')
    ? '/api'
    : 'https://repository-nine-navy.vercel.app/api');

const STORAGE_KEY_ORDERS = 'cheesecake_admin_orders';
const STORAGE_KEY_CATEGORIES = 'cheesecake_admin_categories';
const STORAGE_KEY_PROMOS = 'cheesecake_admin_promos';

const DEFAULT_INITIAL_ORDERS = [
  {
    id: 'ORD-892101',
    _id: 'ORD-892101',
    customer: 'Sarah Jenkins',
    items: [
      { name: 'super supreme pizza', quantity: 2, unitPrice: 10.5, lineTotal: 21.0, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop' },
      { name: 'CHICKEN ALFREDO', quantity: 1, unitPrice: 37.0, lineTotal: 37.0, image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&auto=format&fit=crop' }
    ],
    total: 62.80,
    method: 'delivery',
    status: 'Delivered',
    date: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'ORD-892102',
    _id: 'ORD-892102',
    customer: 'David Miller',
    items: [
      { name: 'CLASSIC ITALIAN LASAGNA', quantity: 1, unitPrice: 16.95, lineTotal: 16.95, image: 'https://images.unsplash.com/photo-1560750133-c5d4ef4de911?w=600&auto=format&fit=crop' },
      { name: 'GODIVA® BROWNIE SUNDAE', quantity: 1, unitPrice: 11.95, lineTotal: 11.95, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop' }
    ],
    total: 31.28,
    method: 'pickup',
    status: 'Preparing',
    date: new Date(Date.now() - 3600000 * 1.5).toISOString()
  }
];

const getStoredOrders = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error loading stored orders:', e);
  }
  return DEFAULT_INITIAL_ORDERS;
};

export const DEFAULT_LASAGNA_ITEMS = [
  {
    id: 'las-1',
    _id: 'las-1',
    category: 'lasagna',
    name: 'CLASSIC ITALIAN LASAGNA',
    price: 'AED 16.95',
    numPrice: 16.95,
    rating: 4.9,
    calories: '820 Cal',
    desc: 'Layers of slow-simmered meat sauce, creamy ricotta, and melted mozzarella baked to golden perfection.',
    image: 'https://images.unsplash.com/photo-1560750133-c5d4ef4de911?q=80&w=600&auto=format&fit=crop',
    active: true
  },
  {
    id: 'las-2',
    _id: 'las-2',
    category: 'lasagna',
    name: 'LASAGNA AL FORNO BEEF / لازانيا الفورنو لحم',
    price: 'AED 36.00',
    numPrice: 36.00,
    rating: 5.0,
    calories: '850 Cal',
    desc: 'Italian goodness with minced beef and layers upon layers of cheese / سحر الطعمة الإيطالية مع اللحم المفروم وطبقات الجبن',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=600&auto=format&fit=crop',
    active: true
  },
  {
    id: 'las-3',
    _id: 'las-3',
    category: 'lasagna',
    name: 'LASAGNA AL FORNO CHICKEN / لازانيا الفورنو دجاج',
    price: 'AED 36.00',
    numPrice: 36.00,
    rating: 5.0,
    calories: '820 Cal',
    desc: 'Italian goodness with minced chicken and layers upon layers of cheese / سحر الطعمة الإيطالية مع اللحم المفروم وطبقات الجبن',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d62816e8?q=80&w=600&auto=format&fit=crop',
    active: true
  },
  {
    id: 'las-4',
    _id: 'las-4',
    category: 'lasagna',
    name: 'VEGETABLE LASAGNA / لازانيا الخضار',
    price: 'AED 32.00',
    numPrice: 32.00,
    rating: 5.0,
    calories: '680 Cal',
    desc: 'Fresh vegetables with layers of cheese makes for a delightful meal / خضار طازجة مع طبقات من الجبن مكونة وجبة لذيذة',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop',
    active: true
  },
  {
    id: 'las-5',
    _id: 'las-5',
    category: 'lasagna',
    name: 'MAC & CHEESE LASAGNA / لازانيا ماك اند تشيز',
    price: 'AED 36.00',
    numPrice: 36.00,
    rating: 4.9,
    calories: '890 Cal',
    desc: 'Layers on layers of macaroni topped with mozzarella cheese and a choice of beef, chicken or vegetarian option / طبقات من المعكرونة مغطاة بجبنة الموزاريلا',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=600&auto=format&fit=crop',
    active: true
  },
  {
    id: 'las-6',
    _id: 'las-6',
    category: 'lasagna',
    name: 'PASTA AL FORNO LASAGNA / مكرونة لازانيا الفورنو',
    price: 'AED 35.00',
    numPrice: 35.00,
    rating: 4.8,
    calories: '790 Cal',
    desc: 'Oven Baked Pasta Lasagna - Penne with mozzarella with minced beef or chicken or veg / لازانيا مطبوخة بالفرن - خليط من البيني وجبنة الموزاريلا مع اللحم المفروم أو الدجاج أو الخضار',
    image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?q=80&w=600&auto=format&fit=crop',
    active: true
  }
];

const DEFAULT_CATEGORIES = [
  { id: 'cat-11', _id: 'cat-11', name: 'Pizzas', slug: 'pizzas', icon: '🍕', desc: 'Wood-fired crispy dough pizzas', itemCount: 9, active: true },
  { id: 'cat-13', _id: 'cat-13', name: 'Lasagna', slug: 'lasagna', icon: '🥘', desc: 'Traditional slow-baked Italian lasagna', itemCount: 6, active: true },
  { id: 'cat-3', _id: 'cat-3', name: 'Desserts', slug: 'desserts', icon: '🍰', desc: 'World-famous cheesecakes and specialty desserts', itemCount: 10, active: true },
  { id: 'cat-4', _id: 'cat-4', name: 'Breakfast', slug: 'breakfast', icon: '🍳', desc: 'Fresh breakfast favorites served all day', itemCount: 6, active: true },
  { id: 'cat-7', _id: 'cat-7', name: 'Burgers', slug: 'burgers', icon: '🍔', desc: 'Juicy handcrafted beef and chicken burgers', itemCount: 5, active: true },
  { id: 'cat-8', _id: 'cat-8', name: 'Soups', slug: 'soups', icon: '🍲', desc: 'Rich and creamy comforting soups', itemCount: 5, active: true },
  { id: 'cat-10', _id: 'cat-10', name: 'Drinks', slug: 'drinks', icon: '🥤', desc: 'Refreshing beverages, shakes, and cold coffees', itemCount: 22, active: true },
  { id: 'cat-12', _id: 'cat-12', name: 'Salads', slug: 'salads', icon: '🥗', desc: 'Fresh garden salads with housemade dressings', itemCount: 5, active: true },
  { id: 'cat-1', _id: 'cat-1', name: 'Bites', slug: 'bites', icon: '🍢', desc: 'Handcrafted small bites and appetizers', itemCount: 5, active: true },
  { id: 'cat-2', _id: 'cat-2', name: 'Bowls', slug: 'bowls', icon: '🥗', desc: 'Nutrient-packed delicious bowls', itemCount: 2, active: true },
  { id: 'cat-5', _id: 'cat-5', name: 'Pastas', slug: 'pastas', icon: '🍝', desc: 'Handmade Italian style signature pastas', itemCount: 17, active: true },
  { id: 'cat-6', _id: 'cat-6', name: 'Sandwiches', slug: 'sandwiches', icon: '🥪', desc: 'Gourmet sandwiches and rolls', itemCount: 1, active: true },
  { id: 'cat-9', _id: 'cat-9', name: 'Appetizers', slug: 'appetizers', icon: '🥟', desc: 'Flavorful starters for sharing', itemCount: 17, active: true },
];

export const CATEGORY_ORDER_PRIORITY = [
  'pizzas',
  'pizza',
  'lasagna',
  'lasagnas',
  'desserts',
  'dessert',
  'breakfast',
  'burgers',
  'soups',
  'drinks',
  'salads',
  'pastas',
  'pasta',
  'bites',
  'bowls',
  'sandwiches',
  'appetizers'
];

export const sortAndDeduplicateCategories = (cats = []) => {
  const map = new Map();
  cats.forEach(c => {
    const slugKey = (c.slug || c.name || '').toLowerCase();
    if (slugKey && !map.has(slugKey)) {
      map.set(slugKey, c);
    }
  });

  // Always ensure Lasagna category is present
  if (!map.has('lasagna') && !map.has('lasagnas')) {
    map.set('lasagna', {
      id: 'cat-13',
      _id: 'cat-13',
      name: 'Lasagna',
      slug: 'lasagna',
      icon: '🥘',
      desc: 'Traditional slow-baked Italian lasagna',
      itemCount: 6,
      active: true
    });
  }

  const getPriority = (slug) => {
    if (slug === 'pizzas' || slug === 'pizza') return 0;
    if (slug === 'lasagna' || slug === 'lasagnas') return 1;
    if (slug === 'desserts' || slug === 'dessert') return 2;
    const idx = CATEGORY_ORDER_PRIORITY.indexOf(slug);
    return idx !== -1 ? idx : 999;
  };

  return Array.from(map.values()).sort((a, b) => {
    const slugA = (a.slug || a.name || '').toLowerCase();
    const slugB = (b.slug || b.name || '').toLowerCase();
    const priorityA = getPriority(slugA);
    const priorityB = getPriority(slugB);

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    return (a.name || '').localeCompare(b.name || '');
  });
};

const getStoredCategories = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return sortAndDeduplicateCategories(parsed);
    }
  } catch (e) {
    console.error('Error loading stored categories:', e);
  }
  return sortAndDeduplicateCategories(DEFAULT_CATEGORIES);
};

const safeFetchJson = async (res) => {
  if (!res || !res.ok) return null;
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) return null;
  try {
    return await res.json();
  } catch (err) {
    console.warn('Response is not valid JSON:', err.message);
    return null;
  }
};

export const DEFAULT_PROMOS = [
  {
    name: 'Hero',
    title: 'Welcome To <br />\n<span class="italic font-normal text-amber-400 relative inline-block">Italian Pizza Kawkab</span>',
    subtitle: 'Over 26 Years of Tradition • Serving Sharjah Since 1999',
    description: 'Italian Pizza Kawkab has been serving the Sharjah community since 1999, building a legacy of great taste, wood-fired authenticity, and unforgettable memories for more than 26 years.',
    videoUrl: 'https://res.cloudinary.com/um3irlrh/video/upload/v1792044052/Screen_Recording_10-15-2026_10-37-29_AM_yijxxi_audbr6.mp4',
    playlist: [
      {
        id: 1,
        label: 'Clip 1',
        name: 'Artisan Wood-Fired Oven',
        src: 'https://res.cloudinary.com/um3irlrh/video/upload/v1792044052/Screen_Recording_10-15-2026_10-37-29_AM_yijxxi_audbr6.mp4'
      }
    ]
  },
  {
    name: 'BrowniePromo',
    title: 'Authentic Wood-Fired Pizzas',
    subtitle: 'Crispy & Cheesy',
    description: 'Crafted with premium Italian flour and baked to perfection in our traditional stone oven.',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
    price: 35.00,
    buttonText: 'Order Pizza',
    buttonLink: '/menu'
  },
  {
    name: 'PizzaPromo',
    title: 'Specialty Desserts & Cheesecakes',
    subtitle: 'Sweet Indulgence',
    description: 'Rich, creamy and delightful desserts to end your meal on a sweet high note.',
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1200&auto=format&fit=crop',
    price: 24.00,
    buttonText: 'View Desserts',
    buttonLink: '/menu'
  },
  {
    name: 'FriedMacCheesePromo',
    title: 'Signature Appetizers & Bites',
    subtitle: 'Golden & Crunchy',
    description: 'Crispy bites and appetizers made fresh daily to jumpstart your appetite.',
    imageUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=1200&auto=format&fit=crop',
    price: 18.00,
    buttonText: 'Browse Bites',
    buttonLink: '/menu'
  },
  {
    name: 'FreshlyPrepared',
    title: 'Freshly Prepared Every Day',
    subtitle: 'Quality Ingredients',
    description: 'We source only fresh herbs, premium meats, and original Italian cheeses.',
    imageUrl: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=1200&auto=format&fit=crop'
  }
];

export const getStoredPromos = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PROMOS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error loading stored promos:', e);
  }
  return DEFAULT_PROMOS;
};

export function AdminDataProvider({ children }) {
  const [data, setData] = useState({
    categories: getStoredCategories(),
    menuItems: {
      pizzas: [], lasagna: DEFAULT_LASAGNA_ITEMS, desserts: [],
      bites: [], bowls: [], breakfast: [],
      pastas: [], sandwiches: [], burgers: [], soups: [],
      appetizers: [], drinks: [], salads: []
    },
    careers: [],
    rewards: [],
    orders: getStoredOrders(),
    applications: [],
    promos: getStoredPromos(),
    theme: null
  });
  const [loading, setLoading] = useState(true);

  // Fetch all data on load
  const fetchData = async () => {
    setLoading(true);
    try {
      const [menuRes, categoriesRes, careersRes, rewardsRes, promosRes, themesRes] = await Promise.all([
        fetch(`${API_URL}/menu`).catch(() => null),
        fetch(`${API_URL}/categories`).catch(() => null),
        fetch(`${API_URL}/careers`).catch(() => null),
        fetch(`${API_URL}/rewards`).catch(() => null),
        fetch(`${API_URL}/promos`).catch(() => null),
        fetch(`${API_URL}/themes`).catch(() => null)
      ]);

      const menuData = (await safeFetchJson(menuRes)) || [];
      const categoriesData = (await safeFetchJson(categoriesRes)) || [];
      const careers = (await safeFetchJson(careersRes)) || [];
      const rewards = (await safeFetchJson(rewardsRes)) || [];
      const promos = (await safeFetchJson(promosRes)) || [];
      const themes = (await safeFetchJson(themesRes)) || [];
      const activeTheme = Array.isArray(themes) && themes.length > 0 ? (themes.find(t => t.active) || themes[0]) : null;

      let remoteOrders = [];
      try {
        const ordersRes = await fetch(`${API_URL}/orders`);
        remoteOrders = (await safeFetchJson(ordersRes)) || [];
      } catch (err) {
        console.warn('Backend API orders endpoint unavailable, maintaining local orders:', err.message);
      }

      // Merge backend categories with local categories stored in localStorage
      const localCats = getStoredCategories();
      let activeCategories = [];

      if (Array.isArray(categoriesData) && categoriesData.length > 0) {
        activeCategories = categoriesData.map(c => ({ ...c, id: c._id || c.id }));
      } else {
        activeCategories = [...localCats];
      }

      // Preserve any custom categories in local storage not present on server
      const serverSlugs = new Set(activeCategories.map(c => (c.slug || c.name || '').toLowerCase()));
      localCats.forEach(lc => {
        const catSlug = (lc.slug || lc.name || '').toLowerCase();
        if (catSlug && !serverSlugs.has(catSlug)) {
          activeCategories.push(lc);
          serverSlugs.add(catSlug);
        }
      });

      activeCategories = sortAndDeduplicateCategories(activeCategories);

      // Update localStorage with complete category set
      try {
        localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(activeCategories));
      } catch (e) { }

      // Base menu object with empty array for every known category slug
      const initialGrouped = {};
      activeCategories.forEach(cat => {
        initialGrouped[cat.slug] = [];
      });

      // Group menu items by category
      const groupedMenu = menuData.reduce((acc, item) => {
        const catSlug = (item.category || '').toLowerCase();
        acc[catSlug] = acc[catSlug] || [];
        acc[catSlug].push({ ...item, id: item._id });
        return acc;
      }, initialGrouped);

      // Guarantee lasagna category items are available
      if (!groupedMenu['lasagna'] || groupedMenu['lasagna'].length === 0) {
        const lasagnaFromData = menuData.filter(i =>
          (i?.name && i.name.toLowerCase().includes('lasagna')) ||
          (i?.desc && i.desc.toLowerCase().includes('lasagna'))
        );
        if (lasagnaFromData.length > 0) {
          groupedMenu['lasagna'] = lasagnaFromData.map(i => ({ ...i, id: i._id || i.id, category: 'lasagna' }));
        } else {
          groupedMenu['lasagna'] = DEFAULT_LASAGNA_ITEMS;
        }
      }

      setData(prev => {
        let finalOrders = prev.orders;
        if (Array.isArray(remoteOrders) && remoteOrders.length > 0) {
          const formattedRemote = remoteOrders.map(o => ({ ...o, id: o._id || o.id }));
          const existingIds = new Set(formattedRemote.map(o => o.id));
          const localOnly = (prev.orders || []).filter(o => !existingIds.has(o.id));
          finalOrders = [...formattedRemote, ...localOnly];
          try { localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(finalOrders)); } catch (e) { }
        }

        return {
          ...prev,
          categories: activeCategories,
          menuItems: Object.keys(groupedMenu).length > 0 ? groupedMenu : prev.menuItems,
          careers: careers.length > 0 ? careers.map(c => ({ ...c, id: c._id })) : prev.careers,
          rewards: rewards.length > 0 ? rewards.map(r => ({ ...r, id: r._id })) : prev.rewards,
          promos: (() => {
            const local = getStoredPromos();
            if (!Array.isArray(promos) || promos.length === 0) return local;

            const merged = local.map(lp => {
              const remote = promos.find(p => p.name === lp.name);
              if (!remote) return lp;
              return {
                ...lp,
                ...remote,
                videoUrl: remote.videoUrl || lp.videoUrl,
                playlist: (Array.isArray(remote.playlist) && remote.playlist.length > 0) ? remote.playlist : lp.playlist
              };
            });

            promos.forEach(p => {
              if (!merged.some(m => m.name === p.name)) merged.push(p);
            });

            try {
              localStorage.setItem(STORAGE_KEY_PROMOS, JSON.stringify(merged));
            } catch (e) { }

            return merged;
          })(),
          theme: activeTheme || prev.theme
        };
      });
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helpers
  const updateState = (updater) => setData(prev => {
    const next = updater(prev);
    return { ...prev, ...next };
  });

  // --- Menu Items ---
  const addMenuItem = async (category, item) => {
    try {
      const res = await fetch(`${API_URL}/menu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, category })
      });
      const newItem = await res.json();
      newItem.id = newItem._id;

      updateState(prev => ({
        menuItems: {
          ...prev.menuItems,
          [category]: [...(prev.menuItems[category] || []), newItem]
        }
      }));
      return newItem;
    } catch (err) { console.error(err); }
  };

  const updateMenuItem = async (category, id, updates) => {
    try {
      const res = await fetch(`${API_URL}/menu/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const updatedItem = await res.json();
      updatedItem.id = updatedItem._id;

      updateState(prev => ({
        menuItems: {
          ...prev.menuItems,
          [category]: prev.menuItems[category].map(i => i.id === id ? updatedItem : i)
        }
      }));
    } catch (err) { console.error(err); }
  };

  const deleteMenuItem = async (category, id) => {
    try {
      await fetch(`${API_URL}/menu/${id}`, { method: 'DELETE' });
      updateState(prev => ({
        menuItems: {
          ...prev.menuItems,
          [category]: prev.menuItems[category].filter(i => i.id !== id)
        }
      }));
    } catch (err) { console.error(err); }
  };

  // --- Variations ---
  const getVariations = async (menuId) => {
    try {
      const res = await fetch(`${API_URL}/variations/menu/${menuId}`);
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const addVariation = async (variation) => {
    try {
      const res = await fetch(`${API_URL}/variations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variation)
      });
      return await res.json();
    } catch (err) { console.error(err); }
  };

  const updateVariation = async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/variations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      return await res.json();
    } catch (err) { console.error(err); }
  };

  const deleteVariation = async (id) => {
    try {
      await fetch(`${API_URL}/variations/${id}`, { method: 'DELETE' });
    } catch (err) { console.error(err); }
  };

  // --- Careers ---
  const addCareer = async (career) => {
    try {
      const res = await fetch(`${API_URL}/careers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(career)
      });
      const newCareer = await res.json();
      newCareer.id = newCareer._id;
      updateState(prev => ({ careers: [...prev.careers, newCareer] }));
    } catch (err) { console.error(err); }
  };

  const updateCareer = async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/careers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const updatedCareer = await res.json();
      updatedCareer.id = updatedCareer._id;
      updateState(prev => ({ careers: prev.careers.map(c => c.id === id ? updatedCareer : c) }));
    } catch (err) { console.error(err); }
  };

  const deleteCareer = async (id) => {
    try {
      await fetch(`${API_URL}/careers/${id}`, { method: 'DELETE' });
      updateState(prev => ({ careers: prev.careers.filter(c => c.id !== id) }));
    } catch (err) { console.error(err); }
  };

  // --- Rewards ---
  const addReward = async (reward) => {
    try {
      const res = await fetch(`${API_URL}/rewards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reward)
      });
      const newReward = await res.json();
      newReward.id = newReward._id;
      updateState(prev => ({ rewards: [...prev.rewards, newReward] }));
    } catch (err) { console.error(err); }
  };

  const updateReward = async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/rewards/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const updatedReward = await res.json();
      updatedReward.id = updatedReward._id;
      updateState(prev => ({ rewards: prev.rewards.map(r => r.id === id ? updatedReward : r) }));
    } catch (err) { console.error(err); }
  };

  const deleteReward = async (id) => {
    try {
      await fetch(`${API_URL}/rewards/${id}`, { method: 'DELETE' });
      updateState(prev => ({ rewards: prev.rewards.filter(r => r.id !== id) }));
    } catch (err) { console.error(err); }
  };

  // --- Orders ---
  const addOrder = async (orderInput) => {
    const newOrderObj = {
      id: orderInput._id || orderInput.id || `ORD-${Date.now().toString().slice(-6)}`,
      _id: orderInput._id || orderInput.id || `ORD-${Date.now().toString().slice(-6)}`,
      customer: orderInput.customer || 'Guest',
      items: (orderInput.items || []).map(i => ({
        name: i.name,
        quantity: i.quantity || 1,
        unitPrice: parseFloat(i.unitPrice || i.numPrice || 0),
        lineTotal: parseFloat(i.lineTotal || (i.numPrice || 0) * (i.quantity || 1)),
        image: i.image || i.img || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop'
      })),
      total: parseFloat(orderInput.total || 0),
      method: orderInput.method || 'delivery',
      status: 'Received',
      date: new Date().toISOString()
    };

    // Update local state and localStorage immediately
    setData(prev => {
      const updatedOrders = [newOrderObj, ...(prev.orders || [])];
      try {
        localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updatedOrders));
      } catch (e) { console.error('Failed to save to localStorage:', e); }
      return { ...prev, orders: updatedOrders };
    });

    // Try posting to backend API as well
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderInput)
      });
      if (res.ok) {
        const createdServerOrder = await res.json();
        if (createdServerOrder && createdServerOrder._id) {
          setData(prev => {
            const updated = prev.orders.map(o => o.id === newOrderObj.id ? { ...o, id: createdServerOrder._id, _id: createdServerOrder._id } : o);
            try { localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated)); } catch (e) { }
            return { ...prev, orders: updated };
          });
        }
      }
    } catch (err) {
      console.warn('Backend API unavailable for posting order, retained local order:', err.message);
    }
  };

  const updateOrderStatus = async (id, status) => {
    setData(prev => {
      const updated = (prev.orders || []).map(o => (o.id === id || o._id === id) ? { ...o, status } : o);
      try { localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated)); } catch (e) { }
      return { ...prev, orders: updated };
    });

    try {
      await fetch(`${API_URL}/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.warn('Backend API unavailable for updating status:', err.message);
    }
  };

  // --- Promos ---
  const updatePromo = async (name, updates) => {
    const updatedPromo = { name, ...updates };

    // 1. Immediately update state & localStorage so UI changes show instantly
    updateState(prev => {
      const exists = prev.promos.find(p => p.name === name);
      const nextPromos = exists
        ? prev.promos.map(p => p.name === name ? { ...p, ...updatedPromo } : p)
        : [...prev.promos, updatedPromo];

      try {
        localStorage.setItem(STORAGE_KEY_PROMOS, JSON.stringify(nextPromos));
      } catch (e) {
        console.error('Failed to save promos to localStorage:', e);
      }
      return { promos: nextPromos };
    });

    // 2. Sync with backend API
    try {
      const res = await fetch(`${API_URL}/promos/${name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (res.ok) {
        const backendData = await res.json();
        // Protect videoUrl and playlist in case remote database stripped them
        const finalData = {
          ...updatedPromo,
          ...backendData,
          videoUrl: updatedPromo.videoUrl || backendData.videoUrl,
          playlist: (Array.isArray(updatedPromo.playlist) && updatedPromo.playlist.length > 0)
            ? updatedPromo.playlist
            : backendData.playlist
        };

        updateState(prev => {
          const nextPromos = prev.promos.map(p => p.name === name ? { ...p, ...finalData } : p);
          try {
            localStorage.setItem(STORAGE_KEY_PROMOS, JSON.stringify(nextPromos));
          } catch (e) { }
          return { promos: nextPromos };
        });

        return { success: true, data: finalData };
      }

      return { success: true, data: updatedPromo };
    } catch (err) {
      console.warn('Backend update warning (local copy preserved):', err.message);
      return { success: true, data: updatedPromo, localOnly: true };
    }
  };

  // --- Themes ---
  const updateTheme = async (themeData) => {
    try {
      let res;
      if (data.theme && data.theme._id) {
        res = await fetch(`${API_URL}/themes/${data.theme._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...themeData, active: true })
        });
      } else {
        res = await fetch(`${API_URL}/themes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...themeData, active: true })
        });
      }
      const updatedTheme = await res.json();
      updateState(prev => ({ theme: updatedTheme }));
    } catch (err) { console.error(err); }
  };

  // --- Categories ---
  const addCategory = async (category) => {
    const slug = category.slug || category.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const tempId = `cat-${Date.now()}`;
    const newCatObj = {
      name: category.name,
      slug,
      icon: category.icon || '🍽️',
      desc: category.desc || '',
      displayOrder: category.displayOrder || 99,
      active: category.active !== undefined ? category.active : true,
      itemCount: 0,
      id: tempId,
      _id: tempId
    };

    // 1. Instantly update React state & localStorage
    setData(prev => {
      const existing = prev.categories || [];
      const index = existing.findIndex(c => c.slug === slug || c.id === tempId);
      let updated;
      if (index >= 0) {
        updated = [...existing];
        updated[index] = { ...updated[index], ...newCatObj };
      } else {
        updated = [...existing, newCatObj];
      }
      try {
        localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(updated));
      } catch (e) { console.error('Failed to save category to localStorage:', e); }

      return {
        ...prev,
        categories: updated,
        menuItems: {
          ...prev.menuItems,
          [slug]: prev.menuItems[slug] || []
        }
      };
    });

    // 2. Persist to backend API
    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...category, slug })
      });
      const serverCat = await safeFetchJson(res);
      if (serverCat && (serverCat._id || serverCat.id)) {
        const serverId = serverCat._id || serverCat.id;
        const formattedServerCat = { ...serverCat, id: serverId, _id: serverId };
        setData(prev => {
          const updated = (prev.categories || []).map(c =>
            (c.id === tempId || c.slug === slug) ? formattedServerCat : c
          );
          try {
            localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(updated));
          } catch (_e) { }
          return {
            ...prev,
            categories: updated,
            menuItems: {
              ...prev.menuItems,
              [formattedServerCat.slug]: prev.menuItems[formattedServerCat.slug] || []
            }
          };
        });
        return formattedServerCat;
      }
    } catch (err) {
      console.warn('Backend API unavailable for adding category, retained locally:', err.message);
    }
    return newCatObj;
  };

  const updateCategory = async (id, updates) => {
    // 1. Instantly update local state & localStorage
    setData(prev => {
      const updated = (prev.categories || []).map(c =>
        (c.id === id || c._id === id || c.slug === id) ? { ...c, ...updates } : c
      );
      try {
        localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(updated));
      } catch (_e) { console.error('Failed to update category in localStorage:', _e); }
      return { ...prev, categories: updated };
    });

    // Resolve optimal API target (MongoDB _id or slug)
    const cat = (data.categories || []).find(c => c.id === id || c._id === id || c.slug === id);
    const targetId = (cat && cat._id && String(cat._id).length === 24) ? cat._id : (cat?.slug || id);

    // 2. Sync to backend API
    try {
      const res = await fetch(`${API_URL}/categories/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const serverCat = await safeFetchJson(res);
      if (serverCat) {
        const formatted = { ...serverCat, id: serverCat._id || serverCat.id };
        setData(prev => {
          const finalUpdated = (prev.categories || []).map(c =>
            (c.id === id || c._id === id || c.slug === targetId) ? formatted : c
          );
          try { localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(finalUpdated)); } catch (e) { }
          return { ...prev, categories: finalUpdated };
        });
      }
    }
    catch (err) {
      console.warn('Backend API unavailable for updating category, updated locally:', err.message);
    }
  };

  const deleteCategory = async (id) => {
    // Resolve target identifier
    const cat = (data.categories || []).find(c => c.id === id || c._id === id || c.slug === id);
    const targetId = (cat && cat._id && String(cat._id).length === 24) ? cat._id : (cat?.slug || id);

    // 1. Instantly update local state & localStorage
    setData(prev => {
      const updated = (prev.categories || []).filter(c => c.id !== id && c._id !== id && c.slug !== id && c.slug !== targetId);
      try {
        localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(updated));
      } catch (e) { console.error('Failed to delete category in localStorage:', e); }
      return { ...prev, categories: updated };
    });

    // 2. Sync deletion to backend API
    try {
      await fetch(`${API_URL}/categories/${targetId}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Backend API unavailable for deleting category, deleted locally:', err.message);
    }
  };

  // --- Applications --- (Local for now)
  const addApplication = (application) => updateState(prev => ({
    applications: [...prev.applications, { ...application, id: `_${Math.random().toString(36).slice(2, 9)}`, date: new Date().toISOString() }]
  }));

  const resetToDefaults = async () => {
    // Only resetting local state for applications or refetching
    await fetchData();
  };

  return (
    <AdminDataContext.Provider value={{
      data, loading,
      addCategory, updateCategory, deleteCategory,
      addMenuItem, updateMenuItem, deleteMenuItem,
      getVariations, addVariation, updateVariation, deleteVariation,
      addCareer, updateCareer, deleteCareer,
      addReward, updateReward, deleteReward,
      addOrder, updateOrderStatus,
      updatePromo,
      updateTheme,
      addApplication, resetToDefaults
    }}>
      {children}
    </AdminDataContext.Provider>
  );
}
