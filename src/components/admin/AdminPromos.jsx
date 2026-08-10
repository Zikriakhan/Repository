import React, { useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';
import { Save, Image as ImageIcon } from 'lucide-react';

const PROMO_COMPONENTS = [
  { id: 'Hero', label: 'Hero Section' },
  { id: 'PizzaPromo', label: 'Pizza Promo' },
  { id: 'BrowniePromo', label: 'Brownie Promo' },
  { id: 'FriedMacCheesePromo', label: 'Fried Mac & Cheese Promo' },
  { id: 'FreshlyPrepared', label: 'Freshly Prepared' },
];

export default function AdminPromos() {
  const { data, updatePromo } = useAdminData();
  const [activeTab, setActiveTab] = useState(PROMO_COMPONENTS[0].id);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Find the promo data or use defaults
  const currentPromo = data.promos?.find(p => p.name === activeTab) || {};

  const [formData, setFormData] = useState({
    title: currentPromo.title || '',
    subtitle: currentPromo.subtitle || '',
    description: currentPromo.description || '',
    imageUrl: currentPromo.imageUrl || '',
    price: currentPromo.price || '',
    buttonText: currentPromo.buttonText || '',
    buttonLink: currentPromo.buttonLink || '',
  });

  // Update formData when switching tabs
  React.useEffect(() => {
    const promo = data.promos?.find(p => p.name === activeTab) || {};
    setFormData({
      title: promo.title || '',
      subtitle: promo.subtitle || '',
      description: promo.description || '',
      imageUrl: promo.imageUrl || '',
      price: promo.price || '',
      buttonText: promo.buttonText || '',
      buttonLink: promo.buttonLink || '',
    });
  }, [activeTab, data.promos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updatePromo(activeTab, formData);
    setSaving(false);
    alert('Promo updated successfully!');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
      }
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 800, color: '#1a0a10' }}>Home Page Promos</h1>
        <p style={{ margin: 0, color: '#888', fontSize: '15px' }}>Manage the content and images for the promotional sections on the home page.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
        {PROMO_COMPONENTS.map(comp => (
          <button
            key={comp.id}
            onClick={() => setActiveTab(comp.id)}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === comp.id ? '#92141f' : '#fff',
              color: activeTab === comp.id ? '#fff' : '#555',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: activeTab === comp.id ? '0 4px 12px rgba(146, 20, 31, 0.2)' : '0 2px 8px rgba(0,0,0,0.05)',
              transition: 'all 0.2s'
            }}
          >
            {comp.label}
          </button>
        ))}
      </div>

      {/* Edit Form */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: '0 0 24px', fontSize: '20px', fontWeight: 700, color: '#1a0a10' }}>Edit {PROMO_COMPONENTS.find(c => c.id === activeTab)?.label}</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Fresh Strawberry Cheesecake"
                style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '14px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>Subtitle / Highlight (Optional)</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="e.g. MOST POPULAR SLICE"
                style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '14px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter the main description text..."
              style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '14px', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#555', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ImageIcon size={16} /> Main Image URL
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/photo-..."
                  style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '14px' }}
                />
                <label style={{ cursor: 'pointer', padding: '12px 16px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center' }}>
                  {uploading ? 'Uploading...' : 'Upload'}
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
                </label>
              </div>
              {formData.imageUrl && (
                <div style={{ marginTop: '12px', borderRadius: '8px', overflow: 'hidden', height: '160px', background: '#f5f5f5' }}>
                  <img src={formData.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}
            </div>

            {/* Optional fields for some components */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>Price (if applicable)</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="15.95"
                  style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '14px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>Button Text (Optional)</label>
                <input
                  type="text"
                  name="buttonText"
                  value={formData.buttonText}
                  onChange={handleChange}
                  placeholder="Order Now"
                  style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '14px' }}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', background: '#92141f', color: '#fff',
                border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 700,
                cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
                boxShadow: '0 4px 12px rgba(146,20,31,0.2)'
              }}
            >
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
