import React, { useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';

const EMPTY = { title: '', points: 0, category: 'Members', description: '', active: true };

function RewardModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || EMPTY);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const isEdit = !!initial?.id;
  const fieldStyle = { width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#3a1e26' }}>{isEdit ? 'Edit Reward' : 'Add New Reward'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#888' }}>×</button>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Reward Title</label>
          <input type="text" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Free Birthday Cheesecake" style={fieldStyle} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Points Required</label>
          <input type="number" min="0" value={form.points} onChange={e => set('points', parseInt(e.target.value) || 0)} style={fieldStyle} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Category</label>
          <select value={form.category} onChange={e => set('category', e.target.value)} style={{ ...fieldStyle, background: '#fff' }}>
            {['Birthday', 'Welcome', 'Members', 'Earning', 'Redemption', 'Seasonal'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Description</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Describe this reward..." rows={3} style={{ ...fieldStyle, resize: 'vertical' }} />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', background: '#f3f4f6', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', color: '#444' }}>Cancel</button>
          <button onClick={() => { onSave(form); onClose(); }} style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg,#92141f,#a50e48)', border: 'none', borderRadius: '8px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
            {isEdit ? 'Save Changes' : 'Add Reward'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminRewards() {
  const { data, addReward, updateReward, deleteReward } = useAdminData();
  const [modal, setModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const catColors = { Birthday: ['#fdf2f8', '#9d174d'], Welcome: ['#ecfdf5', '#059669'], Members: ['#eff6ff', '#2563eb'], Earning: ['#fffbeb', '#d97706'], Redemption: ['#f5f3ff', '#7c3$'], Seasonal: ['#fff7ed', '#ea580c'] };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: 700, color: '#1a0a10' }}>Rewards</h1>
          <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>Manage Cheesecake Rewards® offers — changes appear live on the Rewards page.</p>
        </div>
        <button onClick={() => setModal({ mode: 'add' })} style={{ padding: '12px 24px', background: 'linear-gradient(135deg,#92141f,#a50e48)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(215,19,94,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>+</span> Add Reward
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
              {['Title', 'Category', 'Points', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rewards.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: '48px', textAlign: 'center', color: '#bbb' }}>No rewards yet.</td></tr>
            ) : data.rewards.map(reward => {
              const [bg, color] = catColors[reward.category] || ['#f3f4f6', '#555'];
              return (
                <tr key={reward.id} style={{ borderBottom: '1px solid #f9f9f9', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#1a0a10' }}>{reward.title}</div>
                    <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{reward.description?.slice(0, 60)}...</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: bg, color }}>{reward.category}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontWeight: 700, color: '#b8860b', fontSize: '14px' }}>{reward.points > 0 ? `${reward.points} pts` : 'Free'}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: reward.active ? '#ecfdf5' : '#fef2f2', color: reward.active ? '#059669' : '#dc2626' }}>
                      {reward.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => setModal({ mode: 'edit', item: reward })} style={{ padding: '6px 14px', background: '#f0f0f0', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => setDeleteConfirm(reward)} style={{ padding: '6px 14px', background: '#fff0f0', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: '#92141f' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modal && (
        <RewardModal
          initial={modal.mode === 'edit' ? modal.item : null}
          onSave={(form) => modal.mode === 'edit' ? updateReward(modal.item.id, form) : addReward(form)}
          onClose={() => setModal(null)}
        />
      )}

      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗑️</div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#1a0a10' }}>Delete Reward?</h3>
            <p style={{ margin: '0 0 28px', color: '#666', fontSize: '14px' }}>"{deleteConfirm.title}" will be removed from the Rewards page.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '12px 28px', background: '#f3f4f6', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { deleteReward(deleteConfirm.id); setDeleteConfirm(null); }} style={{ padding: '12px 28px', background: 'linear-gradient(135deg,#92141f,#a50e48)', border: 'none', borderRadius: '8px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
