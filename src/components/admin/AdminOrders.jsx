import React, { useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';
import { useCart } from '../../context/CartContext';

export default function AdminOrders() {
  const { data, updateOrderStatus } = useAdminData();
  const { cartItems, getCartTotal } = useCart();
  const [filter, setFilter] = useState('All');

  // Combine admin-stored orders with current cart for a live view
  let allOrders = data.orders || [];

  if (filter !== 'All') {
    allOrders = allOrders.filter(o => o.status === filter);
  }

  // Sort orders by date descending (newest first)
  allOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalRevenue = (data.orders || []).reduce((sum, o) => sum + parseFloat(o.total || 0), 0);
  const activeOrders = (data.orders || []).filter(o => ['Received', 'Preparing', 'Ready'].includes(o.status)).length;

  const statusColor = (status) => {
    const map = {
      'Received': ['#eff6ff', '#2563eb', '1px solid #bfdbfe'],
      'Preparing': ['#fffbeb', '#d97706', '1px solid #fde68a'],
      'Ready': ['#ecfdf5', '#059669', '1px solid #a7f3d0'],
      'Delivered': ['#f3f4f6', '#555', '1px solid #e5e7eb']
    };
    return map[status] || ['#f3f4f6', '#555', '1px solid #e5e7eb'];
  };

  const handleStatusChange = (id, e) => {
    updateOrderStatus(id, e.target.value);
  };

  return (
    <div>
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: 700, color: '#1a0a10' }}>Orders</h1>
          <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>View and manage customer orders. Update order status to inform customers.</p>
        </div>

        {/* Stats Summary Cards */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '12px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Revenue</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#1a0a10' }}>${totalRevenue.toFixed(2)}</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '1px solid #fde68a', borderRadius: '12px', padding: '12px 20px', boxShadow: '0 2px 8px rgba(217,119,6,0.1)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Orders</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#b45309' }}>{activeOrders}</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['All', 'Received', 'Preparing', 'Ready', 'Delivered'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              padding: '8px 20px',
              border: 'none',
              borderRadius: '20px',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: filter === tab ? '#1a0a10' : '#f3f4f6',
              color: filter === tab ? '#fff' : '#555',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Live Cart Preview (Only shows if current cart has items) */}
      {cartItems.length > 0 && (
        <div style={{ background: 'linear-gradient(135deg, rgba(215,19,94,0.06), rgba(184,134,11,0.06))', border: '1.5px solid rgba(215,19,94,0.15)', borderRadius: '16px', padding: '24px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#3a1e26', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ animation: 'pulse 2s infinite' }}>🛒</span> Live Cart (In Progress on Site)
            </h3>
            <span style={{ padding: '4px 12px', background: '#eff6ff', color: '#2563eb', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>Unsubmitted</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {cartItems.map(item => (
              <div key={item.name} style={{ background: '#fff', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
                <img src={item.image} alt={item.name} style={{ width: '40px', height: '30px', objectFit: 'cover', borderRadius: '6px' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a0a10' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>Qty: {item.quantity} · {item.price}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '16px', textAlign: 'right', fontWeight: 700, fontSize: '16px', color: '#92141f' }}>
            Cart Total: ${getCartTotal().toFixed(2)}
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
              {['Order ID', 'Customer', 'Items', 'Total', 'Date', 'Status Management'].map(h => (
                <th key={h} style={{ padding: '16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allOrders.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '64px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.5 }}>📦</div>
                  <div style={{ color: '#bbb', fontSize: '15px' }}>No orders found for this status.</div>
                </td>
              </tr>
            ) : allOrders.map(order => {
              const [bg, color, border] = statusColor(order.status);
              
              // Calculate time ago
              const orderDate = new Date(order.date);
              const diffMs = new Date() - orderDate;
              const diffMins = Math.floor(diffMs / 60000);
              let timeAgo = '';
              if (diffMins < 60) timeAgo = `${diffMins}m ago`;
              else if (diffMins < 1440) timeAgo = `${Math.floor(diffMins/60)}h ago`;
              else timeAgo = orderDate.toLocaleDateString();

              return (
                <tr key={order.id} style={{ borderBottom: '1px solid #f9f9f9', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <td style={{ padding: '16px', fontFamily: 'monospace', fontSize: '13px', color: '#888', fontWeight: 500 }}>
                    #{order.id.slice(-6).toUpperCase()}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1a0a10' }}>{order.customer || 'Guest User'}</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {(order.items || []).slice(0, 2).map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img src={item.image} alt={item.name} style={{ width: '24px', height: '24px', borderRadius: '4px', objectFit: 'cover' }} />
                          <span style={{ fontSize: '12px', color: '#333' }}><b style={{ color: '#888' }}>{item.quantity}x</b> {item.name}</span>
                        </div>
                      ))}
                      {(order.items || []).length > 2 && (
                        <div style={{ fontSize: '11px', color: '#92141f', fontWeight: 600 }}>+ {(order.items || []).length - 2} more items</div>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontWeight: 700, color: '#92141f', fontSize: '15px' }}>
                    ${parseFloat(order.total || 0).toFixed(2)}
                  </td>
                  <td style={{ padding: '16px', fontSize: '13px', color: '#666' }}>
                    <div style={{ fontWeight: 500 }}>{timeAgo}</div>
                    <div style={{ fontSize: '11px', color: '#aaa', marginTop: '2px' }}>{orderDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    {/* Status Dropdown */}
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e)}
                        style={{
                          appearance: 'none',
                          background: bg,
                          color: color,
                          border: border,
                          padding: '6px 28px 6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          outline: 'none',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                          transition: 'all 0.2s'
                        }}
                      >
                        <option value="Received">Received</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready">Ready</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      {/* Custom Arrow */}
                      <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', fontSize: '10px', color: color }}>▼</div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
