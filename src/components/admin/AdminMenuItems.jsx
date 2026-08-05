import React, { useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';

const CATEGORY_LABELS = { bites: 'Bites', bowls: 'Bowls', desserts: 'Desserts' };

const EMPTY_ITEM = { name: '', price: '', calories: '', rating: 4.5, desc: '', image: '', active: true };

function ItemFormModal({ category, initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || EMPTY_ITEM);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const isEdit = !!initial?.id;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#3a1e26' }}>{isEdit ? 'Edit Item' : `Add New ${CATEGORY_LABELS[category]} Item`}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#888', lineHeight: 1 }}>×</button>
        </div>

        {[
          { label: 'Item Name', key: 'name', type: 'text', placeholder: 'e.g. Baja Bowl with Chicken' },
          { label: 'Price', key: 'price', type: 'text', placeholder: 'e.g. $16.95' },
          { label: 'Calories', key: 'calories', type: 'text', placeholder: 'e.g. 820 Cal' },
          { label: 'Image URL', key: 'image', type: 'text', placeholder: 'https://...' },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{label}</label>
            <input
              type={type}
              value={form[key]}
              onChange={e => set(key, e.target.value)}
              placeholder={placeholder}
              style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', transition: 'border 0.2s' }}
              onFocus={e => e.target.style.borderColor = '#92141f'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
        ))}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Description</label>
          <textarea
            value={form.desc}
            onChange={e => set('desc', e.target.value)}
            placeholder="Describe the dish..."
            rows={3}
            style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical', outline: 'none', transition: 'border 0.2s', fontFamily: 'inherit' }}
            onFocus={e => e.target.style.borderColor = '#92141f'}
            onBlur={e => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Rating (0–5)</label>
          <input
            type="number"
            min="0" max="5" step="0.1"
            value={form.rating}
            onChange={e => set('rating', parseFloat(e.target.value))}
            style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', background: '#f3f4f6', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', color: '#444' }}>Cancel</button>
          <button
            onClick={() => { onSave(form); onClose(); }}
            style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg,#92141f,#a50e48)', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', color: '#fff', boxShadow: '0 4px 12px rgba(215,19,94,0.3)' }}
          >
            {isEdit ? 'Save Changes' : 'Add Item'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminMenuItems() {
  const { data, addMenuItem, updateMenuItem, deleteMenuItem } = useAdminData();
  const [activeTab, setActiveTab] = useState('bites');
  const [modal, setModal] = useState(null); // null | { mode: 'add' | 'edit', item?: ... }
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const items = (data.menuItems[activeTab] || []).filter(
    i => !search || i.name.toLowerCase().includes(search.toLowerCase())
  );

  const tabStyle = (tab) => ({
    padding: '10px 24px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: activeTab === tab ? 'linear-gradient(135deg,#92141f,#a50e48)' : '#f3f4f6',
    color: activeTab === tab ? '#fff' : '#555',
    boxShadow: activeTab === tab ? '0 4px 12px rgba(215,19,94,0.25)' : 'none'
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: 700, color: '#1a0a10' }}>Menu Items</h1>
          <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>Manage all Bites, Bowls & Dessert items — changes appear live on the website.</p>
        </div>
        <button
          onClick={() => setModal({ mode: 'add' })}
          style={{ padding: '12px 24px', background: 'linear-gradient(135deg,#92141f,#a50e48)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(215,19,94,0.3)', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.3px' }}
        >
          <span style={{ fontSize: '18px', lineHeight: 1 }}>+</span> Add New Item
        </button>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {Object.keys(CATEGORY_LABELS).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={tabStyle(tab)}>
            {CATEGORY_LABELS[tab]} ({(data.menuItems[tab] || []).length})
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '10px 16px', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', width: '280px', outline: 'none' }}
        />
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
              {['Image', 'Name', 'Price', 'Calories', 'Rating', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: '#bbb', fontSize: '15px' }}>
                  No items found. Add your first item!
                </td>
              </tr>
            ) : items.map((item, idx) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f9f9f9', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <td style={{ padding: '12px 16px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '56px', height: '42px', objectFit: 'cover', borderRadius: '8px', background: '#f0f0f0' }} />
                </td>
                <td style={{ padding: '12px 16px', maxWidth: '200px' }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#1a0a10', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: '#999', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{item.desc}</div>
                </td>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#92141f', fontSize: '14px' }}>{item.price}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#555' }}>{item.calories}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontSize: '12px', color: '#b8860b', fontWeight: 700 }}>★ {item.rating}</span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                    background: item.active ? '#ecfdf5' : '#fef2f2',
                    color: item.active ? '#059669' : '#dc2626'
                  }}>
                    {item.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setModal({ mode: 'edit', item })}
                      style={{ padding: '6px 14px', background: '#f0f0f0', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: '#333', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.target.style.background = '#e0e0e0'}
                      onMouseLeave={e => e.target.style.background = '#f0f0f0'}
                    >Edit</button>
                    <button
                      onClick={() => setDeleteConfirm({ id: item.id, name: item.name })}
                      style={{ padding: '6px 14px', background: '#fff0f0', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: '#92141f', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.target.style.background = '#ffd7e0'}
                      onMouseLeave={e => e.target.style.background = '#fff0f0'}
                    >Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <ItemFormModal
          category={activeTab}
          initial={modal.mode === 'edit' ? modal.item : null}
          onSave={(form) => {
            if (modal.mode === 'edit') {
              updateMenuItem(activeTab, modal.item.id, {
                ...form,
                numPrice: parseFloat(String(form.price).replace(/[^0-9.-]/g, '')) || 0
              });
            } else {
              addMenuItem(activeTab, {
                ...form,
                numPrice: parseFloat(String(form.price).replace(/[^0-9.-]/g, '')) || 0
              });
            }
          }}
          onClose={() => setModal(null)}
        />
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', maxWidth: '420px', width: '90%', textAlign: 'center', boxShadow: '0 32px 80px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗑️</div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#1a0a10' }}>Delete Item?</h3>
            <p style={{ margin: '0 0 28px', color: '#666', fontSize: '14px' }}>"{deleteConfirm.name}" will be permanently removed from the menu and the website.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '12px 28px', background: '#f3f4f6', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button
                onClick={() => { deleteMenuItem(activeTab, deleteConfirm.id); setDeleteConfirm(null); }}
                style={{ padding: '12px 28px', background: 'linear-gradient(135deg,#92141f,#a50e48)', border: 'none', borderRadius: '8px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}
              >Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
