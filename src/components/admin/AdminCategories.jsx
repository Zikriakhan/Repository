import React, { useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';

const EMOJI_OPTIONS = ['🍢', '🥗', '🍰', '🍳', '🍝', '🥪', '🍔', '🍲', '🥟', '🥤', '🍕', '🌮', '🥩', '🍟', '🍷', '☕', '🍦', '🍩'];

function CategoryModal({ initial, onSave, onClose }) {
  const isEdit = !!initial?.id;
  const [form, setForm] = useState({
    name: initial?.name || '',
    slug: initial?.slug || '',
    icon: initial?.icon || '🍽️',
    desc: initial?.desc || '',
    active: initial?.active !== undefined ? initial.active : true,
    displayOrder: initial?.displayOrder || 1
  });

  const handleNameChange = (e) => {
    const val = e.target.value;
    const generatedSlug = val.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    setForm(f => ({
      ...f,
      name: val,
      slug: isEdit ? f.slug : generatedSlug
    }));
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', width: '100%', maxWidth: '520px', boxShadow: '0 32px 80px rgba(0,0,0,0.3)', animation: 'scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#1a0a10' }}>
            {isEdit ? 'Edit Category' : 'Create New Category'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#888' }}>×</button>
        </div>

        {/* Icon Selection */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>Category Icon</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {EMOJI_OPTIONS.map(emoji => (
              <button
                key={emoji}
                type="button"
                onClick={() => setForm({ ...form, icon: emoji })}
                style={{
                  width: '38px', height: '38px', fontSize: '20px', borderRadius: '8px',
                  border: form.icon === emoji ? '2px solid #92141f' : '1px solid #e0e0e0',
                  background: form.icon === emoji ? '#fff0f3' : '#fafafa',
                  cursor: 'pointer', transition: 'all 0.15s'
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Or type custom emoji / icon"
            value={form.icon}
            onChange={e => setForm({ ...form, icon: e.target.value })}
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        {/* Name */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', marginBottom: '6px' }}>Category Name</label>
          <input
            type="text"
            placeholder="e.g. Appetizers, Desserts, Drinks..."
            value={form.name}
            onChange={handleNameChange}
            style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
          />
        </div>

        {/* Slug */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', marginBottom: '6px' }}>URL Slug</label>
          <input
            type="text"
            placeholder="e.g. appetizers"
            value={form.slug}
            onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
            style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', marginBottom: '6px' }}>Description</label>
          <textarea
            rows={2}
            placeholder="Short category description..."
            value={form.desc}
            onChange={e => setForm({ ...form, desc: e.target.value })}
            style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', resize: 'none', fontFamily: 'inherit' }}
          />
        </div>

        {/* Status checkbox */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            id="catActive"
            checked={form.active}
            onChange={e => setForm({ ...form, active: e.target.checked })}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <label htmlFor="catActive" style={{ fontSize: '14px', color: '#333', fontWeight: 600, cursor: 'pointer' }}>
            Active & Visible on Website
          </label>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', background: '#f3f4f6', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', color: '#444' }}>
            Cancel
          </button>
          <button
            onClick={() => {
              if (!form.name.trim()) return;
              onSave(form);
              onClose();
            }}
            style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg,#92141f,#a50e48)', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', color: '#fff', boxShadow: '0 4px 12px rgba(215,19,94,0.3)' }}
          >
            {isEdit ? 'Save Changes' : 'Create Category'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminCategories() {
  const { data, addCategory, updateCategory, deleteCategory } = useAdminData();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | { mode: 'add' | 'edit', category?: obj }
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const categoriesList = (data.categories || []).filter(c =>
    !search ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: 700, color: '#1a0a10' }}>Menu Categories</h1>
          <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>
            Manage categories for your menu items. Added categories show up live in the menu &amp; item creator.
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: 'add' })}
          style={{ padding: '12px 24px', background: 'linear-gradient(135deg,#92141f,#a50e48)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(215,19,94,0.3)', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.3px' }}
        >
          <span style={{ fontSize: '18px', lineHeight: 1 }}>+</span> Add New Category
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '10px 16px', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', width: '280px', outline: 'none' }}
        />
        <div style={{ fontSize: '13px', color: '#888', fontWeight: 600 }}>
          Total Categories: <strong style={{ color: '#92141f' }}>{data.categories?.length || 0}</strong>
        </div>
      </div>

      {/* Grid of Categories */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {categoriesList.map(cat => {
          const catItems = data.menuItems?.[cat.slug] || [];
          const count = catItems.length > 0 ? catItems.length : (cat.itemCount || 0);

          return (
            <div
              key={cat.id || cat._id || cat.slug}
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                border: '1px solid #f0f0f0',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ fontSize: '36px', background: '#fafafa', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f0f0f0' }}>
                    {cat.icon || '🍽️'}
                  </div>
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                    background: cat.active !== false ? '#ecfdf5' : '#fef2f2',
                    color: cat.active !== false ? '#059669' : '#dc2626'
                  }}>
                    {cat.active !== false ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 700, color: '#1a0a10' }}>
                  {cat.name} <span style={{ color: '#92141f', fontSize: '14px', fontWeight: 800 }}>({count})</span>
                </h3>
                <div style={{ fontSize: '12px', color: '#999', fontFamily: 'monospace', marginBottom: '10px' }}>
                  slug: /{cat.slug}
                </div>
                <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#666', lineHeight: 1.4 }}>
                  {cat.desc || 'No description provided.'}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #f9f9f9', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#aaa', fontWeight: 600 }}>
                  {count} {count === 1 ? 'Item' : 'Items'} Listed
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setModal({ mode: 'edit', category: cat })}
                    style={{ padding: '6px 14px', background: '#f0f0f0', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: '#333', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#e0e0e0'}
                    onMouseLeave={e => e.currentTarget.style.background = '#f0f0f0'}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(cat)}
                    style={{ padding: '6px 14px', background: '#fff0f0', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: '#92141f', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#ffd7e0'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fff0f0'}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {modal && (
        <CategoryModal
          initial={modal.mode === 'edit' ? modal.category : null}
          onSave={(form) => {
            if (modal.mode === 'edit') {
              updateCategory(modal.category.id || modal.category._id || modal.category.slug, form);
            } else {
              addCategory(form);
            }
          }}
          onClose={() => setModal(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', maxWidth: '420px', width: '90%', textAlign: 'center', boxShadow: '0 32px 80px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏷️</div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#1a0a10' }}>Delete Category?</h3>
            <p style={{ margin: '0 0 28px', color: '#666', fontSize: '14px' }}>
              Category "<strong>{deleteConfirm.name}</strong>" will be removed.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '12px 28px', background: '#f3f4f6', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button
                onClick={() => {
                  deleteCategory(deleteConfirm.id || deleteConfirm._id || deleteConfirm.slug);
                  setDeleteConfirm(null);
                }}
                style={{ padding: '12px 28px', background: 'linear-gradient(135deg,#92141f,#a50e48)', border: 'none', borderRadius: '8px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
