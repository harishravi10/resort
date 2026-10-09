import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  TrendingUp,
  Users,
  BedDouble,
  DollarSign,
  Calendar,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Activity,
  Utensils,
  ArrowRight,
  Sparkles,
  Eye,
  Phone,
  Mail,
  UserCheck,
  X,
  Clock,
  FileText
} from 'lucide-react';
import { INITIAL_ROOMS } from '../services/mockData';

export const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, users, rooms

  // Add Room Modal State
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    roomType: 'Villa',
    pricePerNight: 35000,
    capacity: 2,
    sizeSqft: 1400,
    viewType: 'Direct Ocean View',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=85',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    loadAllData();
  }, []);

  const loadAllData = async () => {
    const s = await apiService.getDashboardStats();
    setStats(s);

    const r = await apiService.getRooms();
    setRooms(r);

    const b = await apiService.getBookings();
    setBookings(b);

    const u = await apiService.getUsers();
    setUsers(u);
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    await apiService.createRoom(newRoom);
    setShowAddRoom(false);
    loadAllData();
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm('Are you sure you want to delete this villa from the resort inventory?')) {
      await apiService.deleteRoom(id);
      loadAllData();
    }
  };

  const handleUpdateBookingStatus = async (id, newStatus) => {
    await apiService.updateBookingStatus(id, newStatus);
    loadAllData();
  };

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', background: '#05110d' }}>
      <div className="container" style={{ paddingBottom: '90px' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="tagline-badge">
                <Shield size={12} color="#D4AF37" />
                MANAGEMENT CONSOLE
              </span>
            </div>
            <h1
              style={{
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: '#fff',
                marginBottom: '6px',
              }}
            >
              Aurelia Command Sanctuary
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Executive Analytics &amp; Inventory Operations Center
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setShowAddRoom(true)}
              className="btn-gold"
              data-cursor="ADD"
              style={{ padding: '12px 24px', fontSize: '0.8rem' }}
            >
              <Plus size={16} />
              <span>ADD NEW VILLA</span>
            </button>
          </div>
        </div>

        {/* Top Analytics Cards */}
        {stats && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)', letterSpacing: '0.1em' }}>TOTAL REVENUE</span>
                <DollarSign size={18} color="#D4AF37" />
              </div>
              <p style={{ fontSize: '1.8rem', fontFamily: 'Cinzel, serif', color: 'var(--gold-400)', fontWeight: 600 }}>
                ₹{Number(stats.totalRevenue).toLocaleString('en-IN')}
              </p>
              <p style={{ color: '#48bb78', fontSize: '0.75rem', marginTop: '4px' }}>+18.4% vs last cycle</p>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)', letterSpacing: '0.1em' }}>TOTAL RESERVATIONS</span>
                <Calendar size={18} color="#D4AF37" />
              </div>
              <p style={{ fontSize: '1.8rem', fontFamily: 'Cinzel, serif', color: '#fff', fontWeight: 600 }}>
                {stats.totalBookings}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>{stats.activeBookings} Currently Active</p>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)', letterSpacing: '0.1em' }}>OCCUPANCY RATE</span>
                <TrendingUp size={18} color="#D4AF37" />
              </div>
              <p style={{ fontSize: '1.8rem', fontFamily: 'Cinzel, serif', color: '#fff', fontWeight: 600 }}>
                {stats.occupancyRate}%
              </p>
              <p style={{ color: '#48bb78', fontSize: '0.75rem', marginTop: '4px' }}>High Season Prime Demand</p>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)', letterSpacing: '0.1em' }}>AVAILABLE VILLAS</span>
                <BedDouble size={18} color="#D4AF37" />
              </div>
              <p style={{ fontSize: '1.8rem', fontFamily: 'Cinzel, serif', color: '#fff', fontWeight: 600 }}>
                {stats.availableRooms} / {rooms.length}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>Ready for Instant Check-in</p>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)', letterSpacing: '0.1em' }}>MEMBERSHIP USERS</span>
                <Users size={18} color="#D4AF37" />
              </div>
              <p style={{ fontSize: '1.8rem', fontFamily: 'Cinzel, serif', color: '#fff', fontWeight: 600 }}>
                {stats.totalUsers}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>Registered Sovereign Guests</p>
            </div>
          </div>
        )}

        {/* Tab Selection */}
        <div style={{ display: 'flex', gap: '14px', marginBottom: '32px', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '16px' }}>
          {[
            { id: 'overview', label: 'All Guest Reservations' },
            { id: 'users', label: 'Registered Guests & Members' },
            { id: 'rooms', label: 'Villa Inventory Management' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: activeTab === tab.id ? 'var(--gold-300)' : 'var(--text-muted)',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.95rem',
                letterSpacing: '0.1em',
                padding: '6px 16px',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid var(--gold-500)' : '2px solid transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: BOOKINGS LIST */}
        {activeTab === 'overview' && (
          <div className="glass-panel" style={{ padding: '32px', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.3rem', color: '#fff' }}>
                  All Guest Reservations
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                  Real-time guest booking itineraries, dates, pricing, and concierge requests
                </p>
              </div>
              <span className="tagline-badge">
                <Calendar size={12} color="#D4AF37" />
                {bookings.length} TOTAL BOOKINGS
              </span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '750px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.2)', color: 'var(--gold-400)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                  <th style={{ padding: '12px' }}>BOOKING ID</th>
                  <th style={{ padding: '12px' }}>GUEST NAME</th>
                  <th style={{ padding: '12px' }}>VILLA SANCTUARY</th>
                  <th style={{ padding: '12px' }}>DATES</th>
                  <th style={{ padding: '12px' }}>TOTAL (₹)</th>
                  <th style={{ padding: '12px' }}>STATUS</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b.id}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <td style={{ padding: '16px 12px', color: 'var(--gold-300)', fontFamily: 'Cinzel, serif', fontWeight: 600 }}>
                      {b.id}
                    </td>
                    <td style={{ padding: '16px 12px', color: '#fff', fontWeight: 500 }}>
                      {b.userName || 'Harish Kumar'}
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{b.userEmail}</div>
                    </td>
                    <td style={{ padding: '16px 12px' }}>{b.roomName}</td>
                    <td style={{ padding: '16px 12px' }}>{b.checkIn} → {b.checkOut}</td>
                    <td style={{ padding: '16px 12px', color: 'var(--gold-400)', fontWeight: 600 }}>
                      ₹{Number(b.totalPrice).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: '999px',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          background:
                            b.status === 'CONFIRMED'
                              ? 'rgba(72, 187, 120, 0.15)'
                              : b.status === 'CANCELLED'
                              ? 'rgba(239, 68, 68, 0.15)'
                              : 'rgba(212, 175, 55, 0.15)',
                          color:
                            b.status === 'CONFIRMED'
                              ? '#48bb78'
                              : b.status === 'CANCELLED'
                              ? '#ef4444'
                              : 'var(--gold-400)',
                        }}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <button
                          onClick={() => setSelectedBooking(b)}
                          style={{
                            background: 'rgba(212, 175, 55, 0.1)',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                            color: 'var(--gold-300)',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            fontSize: '0.7rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Eye size={12} />
                          <span>Details</span>
                        </button>
                        {b.status !== 'CONFIRMED' && (
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, 'CONFIRMED')}
                            style={{
                              background: 'transparent',
                              border: '1px solid #48bb78',
                              color: '#48bb78',
                              borderRadius: '6px',
                              padding: '4px 8px',
                              fontSize: '0.7rem',
                              cursor: 'pointer',
                            }}
                          >
                            Approve
                          </button>
                        )}
                        {b.status !== 'CANCELLED' && (
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, 'CANCELLED')}
                            style={{
                              background: 'transparent',
                              border: '1px solid #ef4444',
                              color: '#ef4444',
                              borderRadius: '6px',
                              padding: '4px 8px',
                              fontSize: '0.7rem',
                              cursor: 'pointer',
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: REGISTERED GUESTS & USERS */}
        {activeTab === 'users' && (
          <div className="glass-panel" style={{ padding: '32px', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.3rem', color: '#fff' }}>
                  Registered Sovereign Guests &amp; Members
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                  Complete registry of registered guests, contact profiles, membership tiers, and booking history
                </p>
              </div>
              <span className="tagline-badge">
                <Users size={12} color="#D4AF37" />
                {users.length} REGISTERED MEMBERS
              </span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '750px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.2)', color: 'var(--gold-400)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                  <th style={{ padding: '12px' }}>GUEST NAME</th>
                  <th style={{ padding: '12px' }}>CONTACT PROFILE</th>
                  <th style={{ padding: '12px' }}>MEMBERSHIP TIER</th>
                  <th style={{ padding: '12px' }}>MEMBER SINCE</th>
                  <th style={{ padding: '12px' }}>TOTAL BOOKINGS</th>
                  <th style={{ padding: '12px' }}>ROLE</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const userBookings = bookings.filter(b => b.userId === u.id || b.userEmail === u.email);
                  return (
                    <tr
                      key={u.id}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <td style={{ padding: '16px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(6, 17, 13, 0.8))',
                              border: '1px solid rgba(212, 175, 55, 0.4)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--gold-300)',
                              fontWeight: 600,
                              fontSize: '0.85rem',
                              fontFamily: 'Cinzel, serif',
                            }}
                          >
                            {u.name ? u.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'G'}
                          </div>
                          <div>
                            <div style={{ color: '#fff', fontWeight: 500, fontSize: '0.95rem' }}>{u.name}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: {u.id?.slice(0, 8)}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontSize: '0.8rem' }}>
                          <Mail size={12} color="#D4AF37" />
                          <span>{u.email}</span>
                        </div>
                        {u.phone && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '2px' }}>
                            <Phone size={11} />
                            <span>{u.phone}</span>
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '16px 12px', color: 'var(--gold-400)', fontWeight: 500 }}>
                        {u.tier || (u.role === 'ADMIN' ? 'Imperial Admin' : 'Sovereign Resident')}
                      </td>
                      <td style={{ padding: '16px 12px', color: 'var(--text-muted)' }}>
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Aug 2026'}
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{userBookings.length || u.totalBookings || 0}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '4px' }}>Stays</span>
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            background: u.role === 'ADMIN' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                            color: u.role === 'ADMIN' ? 'var(--gold-300)' : '#e2e8f0',
                            border: u.role === 'ADMIN' ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          {u.role || 'USER'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 10px',
                            borderRadius: '999px',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            background: 'rgba(72, 187, 120, 0.15)',
                            color: '#48bb78',
                          }}
                        >
                          <UserCheck size={11} />
                          Active Member
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: ROOM MANAGEMENT */}
        {activeTab === 'rooms' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {rooms.map((r) => (
                <div key={r.id} className="glass-panel" style={{ padding: '24px', borderRadius: '18px' }}>
                  <div style={{ height: '160px', borderRadius: '12px', overflow: 'hidden', marginBottom: '14px' }}>
                    <img src={r.imageUrl} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ color: '#fff', fontFamily: 'Cinzel, serif', fontSize: '1.2rem' }}>{r.name}</h4>
                      <p style={{ color: 'var(--gold-400)', fontSize: '0.85rem' }}>
                        ₹{Number(r.pricePerNight).toLocaleString('en-IN')} / night
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteRoom(r.id)}
                      style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        color: '#ef4444',
                        padding: '6px',
                        cursor: 'pointer',
                      }}
                      title="Delete Villa"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '8px' }}>
                    {r.roomType} • {r.capacity} Guests • {r.viewType}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Villa Modal */}
        {showAddRoom && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(3, 10, 7, 0.85)',
              backdropFilter: 'blur(16px)',
              zIndex: 100000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            onClick={() => setShowAddRoom(false)}
          >
            <div
              className="glass-panel"
              style={{
                width: '100%',
                maxWidth: '600px',
                padding: '36px',
                background: 'rgba(7, 20, 16, 0.98)',
                border: '1px solid var(--gold-500)',
                borderRadius: '20px',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', color: '#fff', marginBottom: '20px' }}>
                Add New Villa Sanctuary
              </h3>

              <form onSubmit={handleCreateRoom}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                    VILLA NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sapphire Lagoon Villa"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                    className="luxury-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                      ROOM TYPE
                    </label>
                    <select
                      value={newRoom.roomType}
                      onChange={(e) => setNewRoom({ ...newRoom, roomType: e.target.value })}
                      className="luxury-input"
                    >
                      <option value="Villa" style={{ background: '#0a1c16' }}>Villa</option>
                      <option value="Suite" style={{ background: '#0a1c16' }}>Suite</option>
                      <option value="Pavilion" style={{ background: '#0a1c16' }}>Pavilion</option>
                      <option value="Presidential" style={{ background: '#0a1c16' }}>Presidential</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                      PRICE / NIGHT (₹)
                    </label>
                    <input
                      type="number"
                      required
                      value={newRoom.pricePerNight}
                      onChange={(e) => setNewRoom({ ...newRoom, pricePerNight: Number(e.target.value) })}
                      className="luxury-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                      MAX CAPACITY (GUESTS)
                    </label>
                    <input
                      type="number"
                      required
                      value={newRoom.capacity}
                      onChange={(e) => setNewRoom({ ...newRoom, capacity: Number(e.target.value) })}
                      className="luxury-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                      SIZE (SQ FT)
                    </label>
                    <input
                      type="number"
                      required
                      value={newRoom.sizeSqft}
                      onChange={(e) => setNewRoom({ ...newRoom, sizeSqft: Number(e.target.value) })}
                      className="luxury-input"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                    IMAGE URL
                  </label>
                  <input
                    type="url"
                    required
                    value={newRoom.imageUrl}
                    onChange={(e) => setNewRoom({ ...newRoom, imageUrl: e.target.value })}
                    className="luxury-input"
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-400)', marginBottom: '6px' }}>
                    DESCRIPTION
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe architectural features, pool, vantage..."
                    value={newRoom.description}
                    onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                    className="luxury-input"
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setShowAddRoom(false)} className="btn-outline-gold" style={{ flex: 1 }}>
                    CANCEL
                  </button>
                  <button type="submit" className="btn-gold" style={{ flex: 2 }}>
                    REGISTER VILLA
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* BOOKING DETAILS MODAL */}
        {selectedBooking && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            onClick={() => setSelectedBooking(null)}
          >
            <div
              className="glass-panel"
              style={{
                width: '100%',
                maxWidth: '680px',
                borderRadius: '20px',
                padding: '36px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                background: '#091a13',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="tagline-badge">
                      <FileText size={12} color="#D4AF37" />
                      RESERVATION VOUCHER
                    </span>
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        background:
                          selectedBooking.status === 'CONFIRMED'
                            ? 'rgba(72, 187, 120, 0.15)'
                            : selectedBooking.status === 'CANCELLED'
                            ? 'rgba(239, 68, 68, 0.15)'
                            : 'rgba(212, 175, 55, 0.15)',
                        color:
                          selectedBooking.status === 'CONFIRMED'
                            ? '#48bb78'
                            : selectedBooking.status === 'CANCELLED'
                            ? '#ef4444'
                            : 'var(--gold-400)',
                      }}
                    >
                      {selectedBooking.status}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', color: '#fff' }}>
                    {selectedBooking.id}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Guest Information */}
              <div
                style={{
                  padding: '18px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '20px',
                }}
              >
                <h4 style={{ color: 'var(--gold-400)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '12px' }}>
                  GUEST DETAILS
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Primary Guest</span>
                    <span style={{ color: '#fff', fontWeight: 500, fontSize: '0.95rem' }}>{selectedBooking.userName || 'Harish Kumar'}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Email Address</span>
                    <span style={{ color: '#fff', fontSize: '0.9rem' }}>{selectedBooking.userEmail}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Guests Count</span>
                    <span style={{ color: '#fff', fontSize: '0.9rem' }}>{selectedBooking.guests || 2} Adults</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Booked On</span>
                    <span style={{ color: '#fff', fontSize: '0.85rem' }}>
                      {selectedBooking.createdAt ? new Date(selectedBooking.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : 'Direct Booking'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Villa & Stay Details */}
              <div
                style={{
                  padding: '18px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '20px',
                }}
              >
                <h4 style={{ color: 'var(--gold-400)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '12px' }}>
                  SANCTUARY &amp; ITINERARY
                </h4>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '14px' }}>
                  {selectedBooking.roomImage && (
                    <img
                      src={selectedBooking.roomImage}
                      alt={selectedBooking.roomName}
                      style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                    />
                  )}
                  <div>
                    <h5 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '1.1rem' }}>{selectedBooking.roomName}</h5>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{selectedBooking.roomType || 'Overwater Villa'}</p>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.2)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--gold-400)', display: 'block' }}>CHECK-IN</span>
                    <span style={{ color: '#fff', fontWeight: 600 }}>{selectedBooking.checkIn}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>From 14:00 Seaplane</span>
                  </div>
                  <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.2)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--gold-400)', display: 'block' }}>CHECK-OUT</span>
                    <span style={{ color: '#fff', fontWeight: 600 }}>{selectedBooking.checkOut}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Until 11:00 Seaplane</span>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedBooking.specialRequests && (
                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: '12px',
                    background: 'rgba(212, 175, 55, 0.05)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    marginBottom: '20px',
                  }}
                >
                  <span style={{ fontSize: '0.7rem', color: 'var(--gold-400)', letterSpacing: '0.1em', display: 'block', marginBottom: '4px' }}>
                    SPECIAL CONCIERGE REQUESTS
                  </span>
                  <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.85rem', fontStyle: 'italic', margin: 0 }}>
                    "{selectedBooking.specialRequests}"
                  </p>
                </div>
              )}

              {/* Financial Breakdown */}
              <div
                style={{
                  padding: '18px',
                  borderRadius: '12px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <span>Base Residence Rate</span>
                  <span>₹{Math.round(Number(selectedBooking.totalPrice) / 1.23).toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <span>Luxury Hospitality GST (18%)</span>
                  <span>₹{Math.round((Number(selectedBooking.totalPrice) / 1.23) * 0.18).toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <span>Environmental Sanctuary Conservation (5%)</span>
                  <span>₹{Math.round((Number(selectedBooking.totalPrice) / 1.23) * 0.05).toLocaleString('en-IN')}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px dashed rgba(212, 175, 55, 0.3)',
                    fontFamily: 'Cinzel, serif',
                    fontSize: '1.2rem',
                    color: 'var(--gold-400)',
                    fontWeight: 600,
                  }}
                >
                  <span>Grand Total</span>
                  <span>₹{Number(selectedBooking.totalPrice).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                {selectedBooking.status !== 'CONFIRMED' && (
                  <button
                    onClick={async () => {
                      await handleUpdateBookingStatus(selectedBooking.id, 'CONFIRMED');
                      setSelectedBooking(prev => ({ ...prev, status: 'CONFIRMED' }));
                    }}
                    className="btn-gold"
                    style={{ flex: 1, padding: '12px' }}
                  >
                    Confirm &amp; Approve Stay
                  </button>
                )}
                {selectedBooking.status !== 'CANCELLED' && (
                  <button
                    onClick={async () => {
                      await handleUpdateBookingStatus(selectedBooking.id, 'CANCELLED');
                      setSelectedBooking(prev => ({ ...prev, status: 'CANCELLED' }));
                    }}
                    style={{
                      flex: 1,
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid #ef4444',
                      color: '#fca5a5',
                      borderRadius: '8px',
                      padding: '12px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                    }}
                  >
                    Cancel Reservation
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
