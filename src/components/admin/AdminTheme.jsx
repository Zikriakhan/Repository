import React, { useState, useEffect } from 'react';
import { useAdminData } from '../../context/AdminDataContext';

export default function AdminTheme() {
  const { data, updateTheme } = useAdminData();
  const [primaryColor, setPrimaryColor] = useState('#06732C'); // British Racing Green
  const [accentColor, setAccentColor] = useState('#92141f');  // Racing Red
  const [lightColor, setLightColor] = useState('#F2F2F2');   // White / Soft Grey
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    if (data && data.theme) {
      if (data.theme.primary) setPrimaryColor(data.theme.primary);
      if (data.theme.accent) setAccentColor(data.theme.accent);
      if (data.theme.light) setLightColor(data.theme.light);
    } else {
      const saved = localStorage.getItem('ccf_theme_colors');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.primary) setPrimaryColor(parsed.primary);
          if (parsed.accent) setAccentColor(parsed.accent);
          if (parsed.light) setLightColor(parsed.light);
        } catch (e) {
          console.error('Error parsing theme colors:', e);
        }
      }
    }
  }, [data.theme]);

  const applyColors = (prim, acc, lgt) => {
    document.documentElement.style.setProperty('--theme-primary', prim);
    document.documentElement.style.setProperty('--theme-accent', acc);
    document.documentElement.style.setProperty('--theme-light', lgt);
  };

  const handleColorChange = (type, val) => {
    if (type === 'primary') {
      setPrimaryColor(val);
      applyColors(val, accentColor, lightColor);
    } else if (type === 'accent') {
      setAccentColor(val);
      applyColors(primaryColor, val, lightColor);
    } else if (type === 'light') {
      setLightColor(val);
      applyColors(primaryColor, accentColor, val);
    }
  };

  const handleSave = async () => {
    const themeData = {
      primary: primaryColor,
      accent: accentColor,
      light: lightColor
    };
    await updateTheme(themeData);
    localStorage.setItem('ccf_theme_colors', JSON.stringify(themeData));
    applyColors(primaryColor, accentColor, lightColor);
    setSavedMessage('✨ Theme saved and synchronized across all pages!');
    setTimeout(() => setSavedMessage(''), 4000);
  };

  const handleResetDefault = async () => {
    const defPrim = '#06732C';
    const defAcc = '#92141f';
    const defLgt = '#F2F2F2';
    setPrimaryColor(defPrim);
    setAccentColor(defAcc);
    setLightColor(defLgt);
    applyColors(defPrim, defAcc, defLgt);
    
    const themeData = { primary: defPrim, accent: defAcc, light: defLgt };
    await updateTheme(themeData);
    localStorage.setItem('ccf_theme_colors', JSON.stringify(themeData));
    
    setSavedMessage('🔄 Restored default British Racing Green palette!');
    setTimeout(() => setSavedMessage(''), 4000);
  };

  const presets = [
    { name: 'British Racing Green (Default)', primary: '#06732C', accent: '#92141f', light: '#F2F2F2' },
    { name: 'Midnight Onyx & Crimson', primary: '#111827', accent: '#E11D48', light: '#F3F4F6' },
    { name: 'Royal Emerald & Amber', primary: '#047857', accent: '#D97706', light: '#F8FAFC' },
    { name: 'Deep Burgundy & Rose', primary: '#3A1E26', accent: '#92141f', light: '#FDFAF5' }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1a0a10', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>🎨</span> Brand & Theme Color Customizer
        </h1>
        <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
          Manage the three connected dominant brand colors across your entire restaurant website. Any adjustments here dynamically update headers, banners, badges, call-to-action buttons, and backgrounds in real time.
        </p>
      </div>

      {savedMessage && (
        <div style={{
          padding: '16px 20px',
          background: '#ecfdf5',
          border: '1px solid #10b981',
          color: '#065f46',
          borderRadius: '12px',
          fontWeight: 600,
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
        }}>
          {savedMessage}
        </div>
      )}

      {/* Color Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '36px' }}>
        {/* Primary Color Card */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937' }}>Primary Brand Color</span>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: primaryColor, border: '2px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }} />
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px', minHeight: '38px' }}>
            British Racing Green. Controls navigation headers, footers, outer rings, and dominant dark sections.
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => handleColorChange('primary', e.target.value)}
              style={{ width: '48px', height: '42px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
            />
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => handleColorChange('primary', e.target.value)}
              style={{ flex: 1, padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontFamily: 'monospace', fontWeight: 600, fontSize: '14px', textTransform: 'uppercase' }}
            />
          </div>
        </div>

        {/* Accent Color Card */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937' }}>Accent & CTA Color</span>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: accentColor, border: '2px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }} />
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px', minHeight: '38px' }}>
            Racing Red. Controls call-to-action buttons, center promotional banners, highlights, and active states.
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="color"
              value={accentColor}
              onChange={(e) => handleColorChange('accent', e.target.value)}
              style={{ width: '48px', height: '42px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
            />
            <input
              type="text"
              value={accentColor}
              onChange={(e) => handleColorChange('accent', e.target.value)}
              style={{ flex: 1, padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontFamily: 'monospace', fontWeight: 600, fontSize: '14px', textTransform: 'uppercase' }}
            />
          </div>
        </div>

        {/* Light Color Card */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937' }}>Light Background & Grey</span>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: lightColor, border: '2px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }} />
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px', minHeight: '38px' }}>
            Soft White / Grey. Controls content sections, feature card backgrounds, and outer ring dots.
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="color"
              value={lightColor}
              onChange={(e) => handleColorChange('light', e.target.value)}
              style={{ width: '48px', height: '42px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
            />
            <input
              type="text"
              value={lightColor}
              onChange={(e) => handleColorChange('light', e.target.value)}
              style={{ flex: 1, padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontFamily: 'monospace', fontWeight: 600, fontSize: '14px', textTransform: 'uppercase' }}
            />
          </div>
        </div>
      </div>

      {/* Live Preview Box */}
      <div style={{ background: lightColor, borderRadius: '20px', padding: '32px', border: '1px solid #e5e7eb', marginBottom: '36px', transition: 'background-color 0.3s' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 20px' }}>
          👁️ Live UI Component Preview
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
          <div style={{ background: primaryColor, color: '#fff', padding: '20px 28px', borderRadius: '12px', flex: '1 1 280px', boxShadow: '0 6px 16px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}>
            <span style={{ display: 'inline-block', background: accentColor, color: '#fff', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
              Connected Theme Badge
            </span>
            <h4 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 6px', fontFamily: 'serif' }}>British Racing Green Element</h4>
            <p style={{ fontSize: '13px', opacity: 0.85, margin: 0 }}>This hero box represents outer ring backgrounds and primary headings.</p>
          </div>

          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', flex: '1 1 280px', border: `2px solid ${primaryColor}20`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1f2937', margin: '0 0 8px' }}>Interactive Card</h4>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px' }}>See how the racing red accent color makes interactive elements and banners stand out.</p>
            <button style={{ background: accentColor, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 4px 10px rgba(0,0,0,0.15)', transition: 'transform 0.2s' }}>
              Order Now • Accent CTA
            </button>
          </div>
        </div>
      </div>

      {/* Preset Palettes */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937', margin: '0 0 16px' }}>Quick Designer Presets</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {presets.map((preset, i) => (
            <button
              key={i}
              onClick={() => {
                setPrimaryColor(preset.primary);
                setAccentColor(preset.accent);
                setLightColor(preset.light);
                applyColors(preset.primary, preset.accent, preset.light);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 18px',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '13px',
                color: '#374151',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = preset.primary}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
            >
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: preset.primary, display: 'inline-block' }} />
                <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: preset.accent, display: 'inline-block' }} />
                <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: preset.light, border: '1px solid #ccc', display: 'inline-block' }} />
              </div>
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
        <button
          onClick={handleResetDefault}
          style={{
            padding: '14px 24px',
            background: '#fff',
            border: '1px solid #d1d5db',
            color: '#374151',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Reset to Default Colors
        </button>
        <button
          onClick={handleSave}
          style={{
            padding: '14px 32px',
            background: accentColor,
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.2s',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          Save & Sync Theme
        </button>
      </div>
    </div>
  );
}
