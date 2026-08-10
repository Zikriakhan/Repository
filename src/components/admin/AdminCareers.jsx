import React, { useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';

const EMPTY = { title: '', department: '', location: '', type: 'Full-time', description: '', active: true };

function CareerModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || EMPTY);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const isEdit = !!initial?.id;
  const fieldStyle = { width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', width: '100%', maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#3a1e26' }}>{isEdit ? 'Edit Career' : 'Add Career Listing'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#888' }}>×</button>
        </div>
        {[
          { label: 'Job Title', key: 'title', placeholder: 'e.g. Restaurant Manager' },
          { label: 'Department', key: 'department', placeholder: 'e.g. Management' },
          { label: 'Location', key: 'location', placeholder: 'e.g. New York, NY' },
        ].map(({ label, key, placeholder }) => (
          <div key={key} style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{label}</label>
            <input type="text" value={form[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder} style={fieldStyle} />
          </div>
        ))}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Type</label>
          <select value={form.type} onChange={e => set('type', e.target.value)} style={{ ...fieldStyle, background: '#fff' }}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Seasonal</option>
            <option>Contract</option>
          </select>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Description</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Job description..." rows={3} style={{ ...fieldStyle, resize: 'vertical' }} />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', background: '#f3f4f6', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', color: '#444' }}>Cancel</button>
          <button onClick={() => { onSave(form); onClose(); }} style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg,#92141f,#a50e48)', border: 'none', borderRadius: '8px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
            {isEdit ? 'Save Changes' : 'Add Listing'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminCareers() {
  const { data, addCareer, updateCareer, deleteCareer } = useAdminData();
  const [modal, setModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'applications'

  const typeBadge = (type) => {
    const colors = { 'Full-time': ['#ecfdf5', '#059669'], 'Part-time': ['#eff6ff', '#2563eb'], 'Seasonal': ['#fffbeb', '#d97706'], 'Contract': ['#f5f3ff', '#7c3aed'] };
    const [bg, color] = colors[type] || ['#f3f4f6', '#555'];
    return <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: bg, color }}>{type}</span>;
  };

  const applications = data.applications || [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: 700, color: '#1a0a10' }}>Careers</h1>
          <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>Manage job listings and view incoming applications.</p>
        </div>
        {activeTab === 'listings' && (
          <button onClick={() => setModal({ mode: 'add' })} style={{ padding: '12px 24px', background: 'linear-gradient(135deg,#92141f,#a50e48)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(215,19,94,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>+</span> Add Listing
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
        <button 
          onClick={() => setActiveTab('listings')}
          style={{ padding: '8px 16px', background: activeTab === 'listings' ? '#f3f4f6' : 'transparent', border: 'none', borderRadius: '8px', fontWeight: 600, color: activeTab === 'listings' ? '#1a0a10' : '#666', cursor: 'pointer' }}
        >
          Job Listings
        </button>
        <button 
          onClick={() => setActiveTab('applications')}
          style={{ padding: '8px 16px', background: activeTab === 'applications' ? '#f3f4f6' : 'transparent', border: 'none', borderRadius: '8px', fontWeight: 600, color: activeTab === 'applications' ? '#1a0a10' : '#666', cursor: 'pointer' }}
        >
          Applications ({applications.length})
        </button>
      </div>

      {activeTab === 'listings' && (
        <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                {['Title', 'Department', 'Location', 'Type', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.careers.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '48px', textAlign: 'center', color: '#bbb' }}>No careers listed yet.</td></tr>
              ) : data.careers.map(career => (
                <tr key={career.id} style={{ borderBottom: '1px solid #f9f9f9', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#1a0a10' }}>{career.title}</div>
                    <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{career.description?.slice(0, 60)}...</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#555' }}>{career.department}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#555' }}>{career.location}</td>
                  <td style={{ padding: '14px 16px' }}>{typeBadge(career.type)}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: career.active ? '#ecfdf5' : '#fef2f2', color: career.active ? '#059669' : '#dc2626' }}>
                      {career.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => setModal({ mode: 'edit', item: career })} style={{ padding: '6px 14px', background: '#f0f0f0', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => setDeleteConfirm(career)} style={{ padding: '6px 14px', background: '#fff0f0', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: '#92141f' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'applications' && (
        <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                {['Applicant', 'Job Title', 'Contact Info', 'CNIC', 'Attachments'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '48px', textAlign: 'center', color: '#bbb' }}>No applications received yet.</td></tr>
              ) : applications.map(app => (
                <tr key={app.id} style={{ borderBottom: '1px solid #f9f9f9', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#1a0a10' }}>{app.name}</div>
                    <div style={{ fontSize: '12px', color: '#999', marginTop: '2px', fontStyle: 'italic' }}>"{app.questionnaire?.slice(0, 40)}..."</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#555', fontWeight: 600 }}>{app.jobTitle}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#555' }}>
                    <div>{app.email}</div>
                    <div style={{ color: '#888', fontSize: '12px' }}>{app.phone}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#555' }}>{app.cnic}</td>
                  <td style={{ padding: '14px 16px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                      <span style={{ background: '#eff6ff', color: '#2563eb', padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>📄 {app.cvName}</span>
                      <div style={{ background: '#f3f4f6', color: '#4b5563', padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ flex: 1 }}>🖼️ {app.imageName}</span>
                        {app.imageUrl && (
                          <img src={app.imageUrl} alt="Applicant" style={{ width: '44px', height: '44px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #ddd' }} />
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <CareerModal
          initial={modal.mode === 'edit' ? modal.item : null}
          onSave={(form) => modal.mode === 'edit' ? updateCareer(modal.item.id, form) : addCareer(form)}
          onClose={() => setModal(null)}
        />
      )}

      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗑️</div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#1a0a10' }}>Delete Listing?</h3>
            <p style={{ margin: '0 0 28px', color: '#666', fontSize: '14px' }}>"{deleteConfirm.title}" will be removed from the Careers page.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '12px 28px', background: '#f3f4f6', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { deleteCareer(deleteConfirm.id); setDeleteConfirm(null); }} style={{ padding: '12px 28px', background: 'linear-gradient(135deg,#92141f,#a50e48)', border: 'none', borderRadius: '8px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
