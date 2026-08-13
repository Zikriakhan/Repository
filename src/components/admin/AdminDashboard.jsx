import React, { useState, useEffect } from 'react';
import { useAdminData } from '../../context/AdminDataContext';
import AdminMenuItems from './AdminMenuItems';
import AdminCategories from './AdminCategories';
import AdminCareers from './AdminCareers';
import AdminRewards from './AdminRewards';
import AdminOrders from './AdminOrders';
import AdminTheme from './AdminTheme';
import AdminPromos from './AdminPromos';

const NAV = [
  { id: 'dashboard', path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'theme', path: '/admin/theme', label: 'Theme & Colors', icon: '🎨' },
  { id: 'categories', path: '/admin/categories', label: 'Categories', icon: '🏷️' },
  { id: 'menu', path: '/admin/menu', label: 'Menu Items', icon: '🍽️' },
  { id: 'promos', path: '/admin/promos', label: 'Home Promos', icon: '🌟' },
  { id: 'careers', path: '/admin/careers', label: 'Careers', icon: '💼' },
  { id: 'rewards', path: '/admin/rewards', label: 'Rewards', icon: '⭐' },
  { id: 'orders', path: '/admin/orders', label: 'Orders', icon: '📦' },
];

function getPageFromPath(path) {
  const match = NAV.find(n => n.path === path);
  if (match) return match.id;
  if (path === '/admin') return 'dashboard';
  return 'dashboard';
}

function StatCard({ icon, label, value, color, sub, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
        flex: '1 1 180px',
        minWidth: '160px',
        position: 'relative',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => { if (onClick) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${color}22`; } }}
      onMouseLeave={e => { if (onClick) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; } }}
    >
      <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: `${color}12`, borderRadius: '0 0 0 80px' }} />
      <div style={{ fontSize: '28px', marginBottom: '12px' }}>{icon}</div>
      <div style={{ fontSize: '32px', fontWeight: 800, color: '#1a0a10', lineHeight: 1, marginBottom: '4px' }}>{value}</div>
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#555', marginBottom: '4px' }}>{label}</div>
      {sub && <div style={{ fontSize: '11px', color: '#aaa' }}>{sub}</div>}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
    </div>
  );
}

function Overview({ data, navigateTo }) {
  const [filterDays, setFilterDays] = useState('all');

  const totalMenu = data?.menuItems ? Object.values(data.menuItems).flat().length : 0;
  const activeCareers = (data?.careers || []).filter(c => c.active).length;
  const activeRewards = (data?.rewards || []).filter(r => r.active).length;

  const now = new Date();
  const filteredOrders = (data?.orders || []).filter(order => {
    if (filterDays === 'all') return true;
    if (!order.date) return true;
    const orderDate = new Date(order.date);
    const diffDays = Math.abs(now - orderDate) / (1000 * 60 * 60 * 24);
    if (filterDays === 'today') return diffDays <= 1;
    if (filterDays === '7') return diffDays <= 7;
    if (filterDays === '30') return diffDays <= 30;
    return true;
  });

  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders.reduce((sum, o) => {
    const val = parseFloat(o.total);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  const subOrderText = filterDays === 'all' ? 'All time' : filterDays === 'today' ? 'Today' : filterDays === '7' ? 'Last 7 days' : 'Last 30 days';

  const recentOrders = (data?.orders || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const statusColor = (status) => {
    const map = { 'Received': ['#eff6ff', '#2563eb'], 'Preparing': ['#fffbeb', '#d97706'], 'Ready': ['#ecfdf5', '#059669'], 'Delivered': ['#f3f4f6', '#555'] };
    return map[status] || ['#f3f4f6', '#555'];
  };

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: '0 0 6px', fontSize: '28px', fontWeight: 800, color: '#1a0a10' }}>Welcome back, Admin 👋</h1>
          <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>Here's what's happening with your restaurant today.</p>
        </div>
        <select
          value={filterDays}
          onChange={(e) => setFilterDays(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #e0e0e0', background: '#fff', fontSize: '14px', fontWeight: 500, color: '#333', cursor: 'pointer', outline: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
        </select>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
        <StatCard icon="🍽️" label="Menu Items" value={totalMenu} color="#92141f" sub="All Categories" onClick={() => navigateTo('menu')} />
        <StatCard icon="💼" label="Active Jobs" value={activeCareers} color="#2563eb" sub="Open positions" onClick={() => navigateTo('careers')} />
        <StatCard icon="⭐" label="Rewards" value={activeRewards} color="#b8860b" sub="Active offers" onClick={() => navigateTo('rewards')} />
        <StatCard icon="📦" label="Orders" value={totalOrders} color="#059669" sub={subOrderText} onClick={() => navigateTo('orders')} />
        <StatCard icon="💰" label="Revenue" value={`AED${totalRevenue.toFixed(0)}`} color="#10b981" sub={subOrderText} />
      </div>

      {/* Quick Actions */}
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1a0a10', marginBottom: '16px' }}>Quick Actions</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
        {[
          { label: 'Customize Colors', icon: '🎨', page: 'theme', color: '#06732C' },
          { label: 'Add Menu Item', icon: '➕', page: 'menu', color: '#92141f' },
          { label: 'Post a Job', icon: '📝', page: 'careers', color: '#2563eb' },
          { label: 'Add Reward', icon: '🎁', page: 'rewards', color: '#b8860b' },
          { label: 'View Orders', icon: '👁️', page: 'orders', color: '#059669' },
        ].map(({ label, icon, page, color }) => (
          <button key={page} onClick={() => navigateTo(page)} style={{
            padding: '14px 22px', background: '#fff', border: `1.5px solid ${color}30`,
            borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center',
            gap: '10px', fontSize: '14px', fontWeight: 600, color: '#1a0a10',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.2s'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = `${color}08`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}30`; e.currentTarget.style.background = '#fff'; }}
          >
            <span style={{ fontSize: '20px' }}>{icon}</span> {label}
          </button>
        ))}
      </div>

      {/* Recent Orders */}
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1a0a10', marginBottom: '16px' }}>Recent Orders</h2>
      <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0', marginBottom: '40px' }}>
        {recentOrders.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#bbb' }}>No orders yet.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                {['Order ID', 'Customer', 'Items', 'Total', 'Status'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => {
                const [bg, color] = statusColor(order.status);
                return (
                  <tr key={order.id} style={{ borderBottom: '1px solid #f9f9f9', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                  >
                    <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontSize: '13px', color: '#888' }}>#{order.id.slice(-6).toUpperCase()}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#1a0a10' }}>{order.customer || '—'}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#555' }}>
                      {(order.items || []).slice(0, 2).map(i => i.name).join(', ')}
                      {(order.items || []).length > 2 && ` +${order.items.length - 2} more`}
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#92141f' }}>AED{parseFloat(order.total || 0).toFixed(2)}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: bg, color }}>{order.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Menu Breakdown */}
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1a0a10', marginBottom: '16px' }}>Menu Breakdown</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {Object.entries(data?.menuItems || {}).map(([cat, items]) => (
          <div key={cat} style={{ background: '#fff', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0', minWidth: '160px', cursor: 'pointer', transition: 'all 0.2s' }}
            onClick={() => navigateTo('menu')}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ fontSize: '13px', color: '#888', textTransform: 'capitalize', marginBottom: '6px' }}>{cat}</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#92141f' }}>{items.length}</div>
            <div style={{ fontSize: '12px', color: '#bbb' }}>items</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard({ currentPath, setCurrentPath, onLogout }) {
  const { data } = useAdminData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Derive active page from URL
  const activePage = getPageFromPath(currentPath);

  const navigateTo = (pageId) => {
    const nav = NAV.find(n => n.id === pageId);
    if (!nav) return;
    window.history.pushState({}, '', nav.path);
    setCurrentPath(nav.path);
  };

  const handleGoToSite = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Overview data={data} navigateTo={navigateTo} />;
      case 'theme': return <AdminTheme />;
      case 'categories': return <AdminCategories />;
      case 'menu': return <AdminMenuItems />;
      case 'promos': return <AdminPromos />;
      case 'careers': return <AdminCareers />;
      case 'rewards': return <AdminRewards />;
      case 'orders': return <AdminOrders />;
      default: return <Overview data={data} navigateTo={navigateTo} />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'Inter', sans-serif", background: '#f8f8fb' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Sidebar Overlay for Mobile */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 19 }}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : 'desktop'}`} style={{
        background: 'linear-gradient(180deg, #1a0a10 0%, #3a1e26 100%)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: '4px 0 24px rgba(0,0,0,0.18)',
        zIndex: 20,
      }}>
        {/* Brand */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '14px', minHeight: '90px' }}>
          <div style={{ background: '#fff', padding: '6px 10px', borderRadius: '10px', flexShrink: 0, display: 'flex', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', minWidth: '48px', justifyContent: 'center' }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ height: '40px', width: 'auto', maxWidth: '120px', objectFit: 'contain' }}
            />
          </div>
          {sidebarOpen && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1.2px', whiteSpace: 'nowrap', fontWeight: 700, textTransform: 'uppercase' }}>The Cheesecake Factory</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>Admin Portal</div>
            </div>
          )}
        </div>

        {/* Nav Label */}
        {sidebarOpen && (
          <div style={{ padding: '16px 20px 8px', fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Navigation
          </div>
        )}

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '8px 12px', overflowY: 'auto' }}>
          {NAV.map(({ id, label, icon }) => {
            const isActive = activePage === id;
            return (
              <button
                key={id}
                onClick={() => navigateTo(id)}
                title={!sidebarOpen ? label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 14px',
                  background: isActive ? 'rgba(215,19,94,0.18)' : 'transparent',
                  border: isActive ? '1px solid rgba(215,19,94,0.35)' : '1px solid transparent',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  marginBottom: '4px',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontSize: '18px', flexShrink: 0 }}>{icon}</span>
                {sidebarOpen && (
                  <span style={{ fontSize: '14px', fontWeight: isActive ? 700 : 400, color: isActive ? '#fff' : 'rgba(255,255,255,0.65)', letterSpacing: '0.2px' }}>
                    {label}
                  </span>
                )}
                {isActive && sidebarOpen && (
                  <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#d7135e', flexShrink: 0 }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Buttons */}
        <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={handleGoToSite}
            title={!sidebarOpen ? 'View Website' : undefined}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '8px', whiteSpace: 'nowrap', overflow: 'hidden', marginBottom: '4px', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ fontSize: '18px', flexShrink: 0 }}>🌐</span>
            {sidebarOpen && <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>View Website</span>}
          </button>
          <button
            onClick={onLogout}
            title={!sidebarOpen ? 'Logout' : undefined}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '8px', whiteSpace: 'nowrap', overflow: 'hidden', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(215,19,94,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ fontSize: '18px', flexShrink: 0 }}>🚪</span>
            {sidebarOpen && <span style={{ fontSize: '13px', color: 'rgba(255,100,100,0.8)', fontWeight: 500 }}>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Bar */}
        <header style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: '6px 8px', borderRadius: '8px', color: '#555', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              ☰
            </button>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <span style={{ color: '#aaa', fontWeight: 500 }}>Admin</span>
              <span style={{ color: '#ddd' }}>/</span>
              <span style={{ fontWeight: 700, color: '#1a0a10' }}>
                {NAV.find(n => n.id === activePage)?.icon} {NAV.find(n => n.id === activePage)?.label || 'Dashboard'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Live indicator */}
            <div style={{ fontSize: '12px', color: '#aaa', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '7px', height: '7px', background: '#22c55e', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              Live — changes update instantly
            </div>
            {/* Admin avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg,#3a1e26,#92141f)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>A</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a0a10' }}>Admin</div>
                <div style={{ fontSize: '11px', color: '#aaa' }}>Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-main-content" style={{ flex: 1, overflowY: 'auto' }}>
          {renderPage()}
        </main>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .admin-sidebar {
          width: 260px;
        }
        .admin-sidebar.desktop.closed {
          width: 72px;
        }
        .admin-sidebar.mobile {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          transform: translateX(0);
        }
        .admin-sidebar.mobile.closed {
          transform: translateX(-100%);
        }
        .admin-main-content {
          padding: 36px 40px;
        }
        @media (max-width: 768px) {
          .admin-main-content {
            padding: 20px 16px;
          }
        }
      `}</style>
    </div>
  );
}


