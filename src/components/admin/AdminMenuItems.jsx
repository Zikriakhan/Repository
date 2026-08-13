import React, { useState, useEffect } from 'react';
import { useAdminData, API_URL } from '../../context/AdminDataContext';



const EMPTY_ITEM = { name: '', price: '', calories: '', rating: 4.5, desc: '', image: '', active: true };
const PRESET_SIZES = ['Small', 'Medium', 'Large', 'Extra Large', 'Regular', 'Half Portion', 'Full Portion', 'Family Size'];

function ItemFormModal({ category, initial, onSave, onClose }) {
  const { data, getVariations, addVariation, deleteVariation } = useAdminData();
  const [form, setForm] = useState(initial || EMPTY_ITEM);
  const [targetCategory, setTargetCategory] = useState(initial?.category || category || 'bites');
  const [uploading, setUploading] = useState(false);
  const [variationsList, setVariationsList] = useState([]);
  const [loadingVars, setLoadingVars] = useState(false);
  const [varForm, setVarForm] = useState({ name: '', price: '', isCustom: false });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const isEdit = !!initial?.id;

  useEffect(() => {
    if (isEdit && initial?.id) {
      setLoadingVars(true);
      getVariations(initial.id).then(data => {
        setVariationsList(data || []);
        setLoadingVars(false);
      });
    }
  }, [initial?.id]);

  const handleAddVar = async () => {
    if (!varForm.name || !varForm.price) return;
    const numPrice = parseFloat(String(varForm.price).replace(/[^0-9.-]/g, '')) || 0;
    const formattedPrice = `AED${numPrice.toFixed(2)}`;

    if (isEdit) {
      const created = await addVariation({
        name: varForm.name,
        price: formattedPrice,
        numPrice: numPrice,
        menuItem: initial.id,
        active: true
      });
      if (created && (created._id || created.id)) {
        setVariationsList(prev => [...prev, created]);
      } else {
        setVariationsList(prev => [...prev, { name: varForm.name, price: formattedPrice, numPrice }]);
      }
    } else {
      setVariationsList(prev => [...prev, { name: varForm.name, price: varForm.price }]);
    }
    setVarForm({ name: '', price: '', isCustom: false });
  };
  
  const handleRemoveVar = async (index, v) => {
    if (isEdit && (v?._id || v?.id)) {
      await deleteVariation(v._id || v.id);
    }
    setVariationsList(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        set('image', data.url);
      }
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#3a1e26' }}>{isEdit ? 'Edit Item' : 'Add New Menu Item'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#888', lineHeight: 1 }}>×</button>
        </div>

        {/* Category Selection Dropdown */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Category</label>
          <select
            value={targetCategory}
            onChange={e => setTargetCategory(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', background: '#fff', cursor: 'pointer' }}
          >
            {(data.categories || []).map(c => (
              <option key={c.id || c.slug} value={c.slug}>
                {c.icon || '🍽️'} {c.name}
              </option>
            ))}
          </select>
        </div>

        {[
          { label: 'Item Name', key: 'name', type: 'text', placeholder: 'e.g. Baja Bowl with Chicken' },
          { label: 'Price', key: 'price', type: 'text', placeholder: 'e.g. AED16.95' },
          { label: 'Calories', key: 'calories', type: 'text', placeholder: 'e.g. 820 Cal' },
          { label: 'Image URL', key: 'image', type: 'text', placeholder: 'https://...' },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{label}</label>
            {key === 'image' ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type={type}
                  value={form[key]}
                  onChange={e => set(key, e.target.value)}
                  placeholder={placeholder}
                  style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', transition: 'border 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#92141f'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
                <label style={{ cursor: 'pointer', padding: '10px 16px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center' }}>
                  {uploading ? 'Uploading...' : 'Upload'}
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
                </label>
              </div>
            ) : (
              <input
                type={type}
                value={form[key]}
                onChange={e => set(key, e.target.value)}
                placeholder={placeholder}
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', transition: 'border 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#92141f'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            )}
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

        <div style={{ marginBottom: '24px', padding: '16px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
            {isEdit ? 'Item Variations & Sizes' : 'Initial Variations (Optional)'}
          </label>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '12px' }}>
            Add sizes like Small, Medium, Large. (You can also manage these later.)
          </p>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '140px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <select
                value={varForm.isCustom ? 'Custom' : (varForm.name || '')}
                onChange={e => {
                  const val = e.target.value;
                  if (val === 'Custom') {
                    setVarForm({ ...varForm, name: '', isCustom: true });
                  } else {
                    setVarForm({ ...varForm, name: val, isCustom: false });
                  }
                }}
                style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', background: '#fff', cursor: 'pointer' }}
              >
                <option value="" disabled>-- Select Size --</option>
                {PRESET_SIZES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
                <option value="Custom">Custom...</option>
              </select>
              {varForm.isCustom && (
                <input
                  type="text"
                  placeholder="Enter custom size name"
                  value={varForm.name}
                  onChange={e => setVarForm({ ...varForm, name: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }}
                />
              )}
            </div>
            <input
              type="text"
              placeholder="Price (e.g. 10.99)"
              value={varForm.price}
              onChange={e => setVarForm({...varForm, price: e.target.value})}
              style={{ width: '110px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', height: '35px', boxSizing: 'border-box' }}
            />
            <button
              onClick={handleAddVar}
              type="button"
              style={{ padding: '8px 14px', background: '#374151', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, height: '35px' }}
            >
              Add
            </button>
          </div>

          {loadingVars ? (
            <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Loading variations...</p>
          ) : variationsList.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {variationsList.map((v, i) => {
                const priceStr = String(v.price || '');
                const priceDisplay = priceStr.startsWith('AED') ? priceStr : `AED${priceStr}`;
                return (
                  <div key={v._id || v.id || i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px' }}>
                    <span><strong>{v.name}</strong> - {priceDisplay}</span>
                    <button onClick={() => handleRemoveVar(i, v)} type="button" style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Remove</button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ fontSize: '12px', color: '#aaa', margin: 0 }}>No variations added yet.</p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', background: '#f3f4f6', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', color: '#444' }}>Cancel</button>
          <button
            onClick={() => { onSave(form, variationsList, targetCategory); onClose(); }}
            style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg,#92141f,#a50e48)', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', color: '#fff', boxShadow: '0 4px 12px rgba(215,19,94,0.3)' }}
          >
            {isEdit ? 'Save Changes' : 'Add Item'}
          </button>
        </div>
      </div>
    </div>
  );
}

function VariationsManagerModal({ item, onClose }) {
  const { getVariations, addVariation, updateVariation, deleteVariation } = useAdminData();
  const [variations, setVariations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', price: '', sku: '', active: true });
  const [isCustomName, setIsCustomName] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchVariations();
  }, []);

  const fetchVariations = async () => {
    setLoading(true);
    const data = await getVariations(item.id);
    setVariations(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) return;
    const numPrice = parseFloat(String(form.price).replace(/[^0-9.-]/g, '')) || 0;
    const payload = {
      ...form,
      price: `AED${numPrice.toFixed(2)}`,
      numPrice,
      menuItem: item.id
    };

    if (editingId) {
      await updateVariation(editingId, payload);
    } else {
      await addVariation(payload);
    }
    setForm({ name: '', price: '', sku: '', active: true });
    setIsCustomName(false);
    setEditingId(null);
    fetchVariations();
  };

  const handleDelete = async (id) => {
    await deleteVariation(id);
    fetchVariations();
  };

  const handleEdit = (v) => {
    const isPreset = PRESET_SIZES.includes(v.name);
    setForm({ name: v.name, price: v.price, sku: v.sku || '', active: v.active });
    setIsCustomName(!isPreset);
    setEditingId(v._id || v.id);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#3a1e26' }}>Manage Variations</h2>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#666' }}>{item.name}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#888', lineHeight: 1 }}>×</button>
        </div>

        {/* Add/Edit Form */}
        <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: '#374151' }}>{editingId ? 'Edit Variation' : 'Add New Variation'}</h3>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 140px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#666', textTransform: 'uppercase', marginBottom: '4px' }}>Size / Name</label>
              <select
                value={isCustomName ? 'Custom' : (form.name || '')}
                onChange={e => {
                  const val = e.target.value;
                  if (val === 'Custom') {
                    setForm({ ...form, name: '' });
                    setIsCustomName(true);
                  } else {
                    setForm({ ...form, name: val });
                    setIsCustomName(false);
                  }
                }}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', background: '#fff', cursor: 'pointer' }}
              >
                <option value="" disabled>-- Select Size --</option>
                {PRESET_SIZES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
                <option value="Custom">Custom...</option>
              </select>
              {isCustomName && (
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter custom size name"
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', marginTop: '6px', boxSizing: 'border-box' }}
                />
              )}
            </div>
            <div style={{ flex: '1 1 100px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#666', textTransform: 'uppercase', marginBottom: '4px' }}>Price</label>
              <input type="text" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="e.g. 11.99" style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px' }} />
            </div>
            <div style={{ flex: '1 1 100px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#666', textTransform: 'uppercase', marginBottom: '4px' }}>SKU (Opt)</label>
              <input type="text" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} placeholder="SKU" style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                Active
              </label>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
             <button onClick={handleSave} style={{ padding: '8px 16px', background: '#374151', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>{editingId ? 'Update' : 'Add'}</button>
             {editingId && <button onClick={() => { setEditingId(null); setForm({ name: '', price: '', sku: '', active: true }); }} style={{ padding: '8px 16px', background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>}
          </div>
        </div>

        {/* Variations List */}
        <div>
          <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: '#374151' }}>Current Variations</h3>
          {loading ? (
             <p style={{ fontSize: '13px', color: '#666' }}>Loading...</p>
          ) : variations.length === 0 ? (
             <p style={{ fontSize: '13px', color: '#888' }}>No variations added yet.</p>
          ) : (
             <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                 <thead>
                   <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                     <th style={{ padding: '10px 12px', textAlign: 'left', fontSize: '11px', color: '#6b7280', textTransform: 'uppercase' }}>Name</th>
                     <th style={{ padding: '10px 12px', textAlign: 'left', fontSize: '11px', color: '#6b7280', textTransform: 'uppercase' }}>Price</th>
                     <th style={{ padding: '10px 12px', textAlign: 'left', fontSize: '11px', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
                     <th style={{ padding: '10px 12px', textAlign: 'right', fontSize: '11px', color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {variations.map(v => (
                     <tr key={v._id || v.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                       <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{v.name}</td>
                       <td style={{ padding: '10px 12px', fontSize: '13px', color: '#374151' }}>{v.price}</td>
                       <td style={{ padding: '10px 12px' }}>
                         <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px', background: v.active ? '#d1fae5' : '#fee2e2', color: v.active ? '#065f46' : '#991b1b' }}>{v.active ? 'Active' : 'Inactive'}</span>
                       </td>
                       <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                         <button onClick={() => handleEdit(v)} style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '12px', fontWeight: 600, cursor: 'pointer', marginRight: '8px' }}>Edit</button>
                         <button onClick={() => handleDelete(v._id || v.id)} style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminMenuItems() {
  const { data, addMenuItem, updateMenuItem, deleteMenuItem, addVariation } = useAdminData();
  const [activeTab, setActiveTab] = useState('bites');
  const [modal, setModal] = useState(null); // null | { mode: 'add' | 'edit', item?: ... }
  const [variationModal, setVariationModal] = useState(null); // null | item
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
          <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>Manage all menu items — changes appear live on the website.</p>
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
        {(data.categories || []).map(cat => {
          const slug = cat.slug;
          const count = (data.menuItems[slug] || []).length;
          return (
            <button key={slug} onClick={() => setActiveTab(slug)} style={tabStyle(slug)}>
              {cat.icon || '🍽️'} {cat.name} ({count})
            </button>
          );
        })}
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
              {['Image', 'Name', 'Price / Variations', 'Calories', 'Rating', 'Status', 'Actions'].map(h => (
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
                <td style={{ padding: '12px 16px' }}>
                  {item.hasVariations ? (
                     <span style={{ fontSize: '13px', fontWeight: 600, color: '#2563eb', background: '#dbeafe', padding: '4px 10px', borderRadius: '12px' }}>Variations Enabled</span>
                  ) : (
                     <span style={{ fontWeight: 700, color: '#92141f', fontSize: '14px' }}>
                       AED{(item.numPrice !== undefined ? item.numPrice : parseFloat(String(item.price).replace(/[^0-9.-]/g, '')) || 0).toFixed(2)}
                     </span>
                  )}
                </td>
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
                      onClick={() => setVariationModal(item)}
                      style={{ padding: '6px 14px', background: '#e0e7ff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: '#4338ca', transition: 'background 0.15s' }}
                    >Variations</button>
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
          onSave={async (form, initialVariations, selectedCategory) => {
            const finalCategory = selectedCategory || activeTab;
            if (modal.mode === 'edit') {
              updateMenuItem(finalCategory, modal.item.id, {
                ...form,
                category: finalCategory,
                price: `AED${(parseFloat(String(form.price).replace(/[^0-9.-]/g, '')) || 0).toFixed(2)}`,
                numPrice: parseFloat(String(form.price).replace(/[^0-9.-]/g, '')) || 0
              });
            } else {
              const newItem = await addMenuItem(finalCategory, {
                ...form,
                category: finalCategory,
                price: `AED${(parseFloat(String(form.price).replace(/[^0-9.-]/g, '')) || 0).toFixed(2)}`,
                numPrice: parseFloat(String(form.price).replace(/[^0-9.-]/g, '')) || 0
              });
              
              if (newItem && initialVariations && initialVariations.length > 0) {
                for (const v of initialVariations) {
                  const vNumPrice = parseFloat(String(v.price).replace(/[^0-9.-]/g, '')) || 0;
                  await addVariation({
                    name: v.name,
                    price: `AED${vNumPrice.toFixed(2)}`,
                    numPrice: vNumPrice,
                    menuItem: newItem.id,
                    active: true
                  });
                }
              }
            }
          }}
          onClose={() => setModal(null)}
        />
      )}
      {/* Variations Modal */}
      {variationModal && (
         <VariationsManagerModal item={variationModal} onClose={() => setVariationModal(null)} />
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
