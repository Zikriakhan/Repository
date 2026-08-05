import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminDataContext = createContext();

export function useAdminData() {
  return useContext(AdminDataContext);
}

const API_URL = 'http://localhost:5000/api';

export function AdminDataProvider({ children }) {
  const [data, setData] = useState({
    menuItems: { bites: [], bowls: [], desserts: [] },
    careers: [],
    rewards: [],
    orders: [],
    applications: []
  });
  const [loading, setLoading] = useState(true);

  // Fetch all data on load
  const fetchData = async () => {
    setLoading(true);
    try {
      const [menuRes, careersRes, rewardsRes, ordersRes] = await Promise.all([
        fetch(`${API_URL}/menu`),
        fetch(`${API_URL}/careers`),
        fetch(`${API_URL}/rewards`),
        fetch(`${API_URL}/orders`)
      ]);

      const menuData = await menuRes.json();
      const careers = await careersRes.json();
      const rewards = await rewardsRes.json();
      const orders = await ordersRes.json();

      // Group menu items by category
      const groupedMenu = menuData.reduce((acc, item) => {
        acc[item.category] = acc[item.category] || [];
        // Map _id to id for frontend compatibility
        acc[item.category].push({ ...item, id: item._id });
        return acc;
      }, { bites: [], bowls: [], desserts: [] });

      setData(prev => ({
        ...prev,
        menuItems: groupedMenu,
        careers: careers.map(c => ({ ...c, id: c._id })),
        rewards: rewards.map(r => ({ ...r, id: r._id })),
        orders: orders.map(o => ({ ...o, id: o._id }))
      }));
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
  const addOrder = async (order) => {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      const newOrder = await res.json();
      newOrder.id = newOrder._id;
      updateState(prev => ({ orders: [newOrder, ...prev.orders] }));
    } catch (err) { console.error(err); }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const updatedOrder = await res.json();
      updatedOrder.id = updatedOrder._id;
      updateState(prev => ({ orders: prev.orders.map(o => o.id === id ? updatedOrder : o) }));
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
      addCareer, updateCareer, deleteCareer,
      addReward, updateReward, deleteReward,
      addOrder, updateOrderStatus,
      addApplication, resetToDefaults
    }}>
      {children}
    </AdminDataContext.Provider>
  );
}
