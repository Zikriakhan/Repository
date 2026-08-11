import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminDataContext = createContext();

export function useAdminData() {
  return useContext(AdminDataContext);
}

export const API_URL = 'http://localhost:5000/api'; // Use local backend where our changes live

const STORAGE_KEY_ORDERS = 'cheesecake_admin_orders';

const DEFAULT_INITIAL_ORDERS = [
  {
    id: 'ORD-892101',
    _id: 'ORD-892101',
    customer: 'Sarah Jenkins',
    items: [
      { name: 'FRESH STRAWBERRY CHEESECAKE', quantity: 2, unitPrice: 10.5, lineTotal: 21.0, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop' },
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

export function AdminDataProvider({ children }) {
  const [data, setData] = useState({
    menuItems: { bites: [], bowls: [], desserts: [], breakfast: [] },
    careers: [],
    rewards: [],
    orders: getStoredOrders(),
    applications: [],
    promos: [],
    theme: null
  });
  const [loading, setLoading] = useState(true);

  // Fetch all data on load
  const fetchData = async () => {
    setLoading(true);
    try {
      const [menuRes, careersRes, rewardsRes, promosRes, themesRes] = await Promise.all([
        fetch(`${API_URL}/menu`).catch(() => null),
        fetch(`${API_URL}/careers`).catch(() => null),
        fetch(`${API_URL}/rewards`).catch(() => null),
        fetch(`${API_URL}/promos`).catch(() => null),
        fetch(`${API_URL}/themes`).catch(() => null)
      ]);

      const menuData = menuRes && menuRes.ok ? await menuRes.json() : [];
      const careers = careersRes && careersRes.ok ? await careersRes.json() : [];
      const rewards = rewardsRes && rewardsRes.ok ? await rewardsRes.json() : [];
      const promos = promosRes && promosRes.ok ? await promosRes.json() : [];
      const themes = themesRes && themesRes.ok ? await themesRes.json() : [];
      const activeTheme = themes.find(t => t.active) || (themes.length > 0 ? themes[0] : null);

      let remoteOrders = [];
      try {
        const ordersRes = await fetch(`${API_URL}/orders`);
        if (ordersRes.ok) {
          remoteOrders = await ordersRes.json();
        }
      } catch (err) {
        console.warn('Backend API orders endpoint unavailable, maintaining local orders:', err.message);
      }

      // Group menu items by category
      const groupedMenu = menuData.reduce((acc, item) => {
        acc[item.category] = acc[item.category] || [];
        acc[item.category].push({ ...item, id: item._id });
        return acc;
      }, { bites: [], bowls: [], desserts: [], breakfast: [] });

      setData(prev => {
        let finalOrders = prev.orders;
        if (Array.isArray(remoteOrders) && remoteOrders.length > 0) {
          const formattedRemote = remoteOrders.map(o => ({ ...o, id: o._id || o.id }));
          const existingIds = new Set(formattedRemote.map(o => o.id));
          const localOnly = (prev.orders || []).filter(o => !existingIds.has(o.id));
          finalOrders = [...formattedRemote, ...localOnly];
          try { localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(finalOrders)); } catch(e){}
        }

        return {
          ...prev,
          menuItems: Object.keys(groupedMenu).some(k => groupedMenu[k].length > 0) ? groupedMenu : prev.menuItems,
          careers: careers.length > 0 ? careers.map(c => ({ ...c, id: c._id })) : prev.careers,
          rewards: rewards.length > 0 ? rewards.map(r => ({ ...r, id: r._id })) : prev.rewards,
          orders: finalOrders,
          promos: promos.length > 0 ? promos : prev.promos,
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
            try { localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated)); } catch(e){}
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
      try { localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated)); } catch(e){}
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
    try {
      const res = await fetch(`${API_URL}/promos/${name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const updatedPromo = await res.json();

      updateState(prev => {
        const exists = prev.promos.find(p => p.name === name);
        if (exists) {
          return { promos: prev.promos.map(p => p.name === name ? updatedPromo : p) };
        } else {
          return { promos: [...prev.promos, updatedPromo] };
        }
      });
    } catch (err) { console.error(err); }
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
