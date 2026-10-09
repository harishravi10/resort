import axios from 'axios';
import { supabase, isSupabaseConfigured } from './supabase';
import {
  INITIAL_ROOMS,
  INITIAL_RESTAURANTS,
  INITIAL_ACTIVITIES,
  INITIAL_REVIEWS,
  INITIAL_BOOKINGS,
  INITIAL_USERS
} from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 4000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('aurelia_jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Local Storage Initializers for Offline/Mock mode
const getLocalData = (key, initial) => {
  try {
    const item = localStorage.getItem(`aurelia_${key}`);
    if (!item) {
      localStorage.setItem(`aurelia_${key}`, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(item);
  } catch (e) {
    return initial;
  }
};

const setLocalData = (key, data) => {
  try {
    localStorage.setItem(`aurelia_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error("Local storage error:", e);
  }
};

export const apiService = {
  // ================= ROOMS =================
  async getRooms() {
    try {
      const res = await apiClient.get('/api/rooms');
      if (res.data?.data) return res.data.data;
    } catch (e) {
      // Backend not running, check Supabase or fallback
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('rooms').select('*');
        if (!error && data?.length) return data;
      }
    }
    return getLocalData('rooms', INITIAL_ROOMS);
  },

  async getRoomById(id) {
    try {
      const res = await apiClient.get(`/api/rooms/${id}`);
      if (res.data?.data) return res.data.data;
    } catch (e) {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('rooms').select('*').eq('id', id).single();
        if (!error && data) return data;
      }
    }
    const rooms = getLocalData('rooms', INITIAL_ROOMS);
    return rooms.find((r) => r.id === id) || rooms[0];
  },

  async createRoom(roomData) {
    try {
      const res = await apiClient.post('/api/rooms', roomData);
      if (res.data?.data) return res.data.data;
    } catch (e) {
      // Fallback local
    }
    const rooms = getLocalData('rooms', INITIAL_ROOMS);
    const newRoom = {
      ...roomData,
      id: `b0000000-0000-0000-0000-${Date.now().toString().slice(-12)}`,
      rating: 4.95,
      available: true
    };
    rooms.unshift(newRoom);
    setLocalData('rooms', rooms);
    return newRoom;
  },

  async updateRoom(id, roomData) {
    try {
      const res = await apiClient.put(`/api/rooms/${id}`, roomData);
      if (res.data?.data) return res.data.data;
    } catch (e) {
      // Fallback
    }
    const rooms = getLocalData('rooms', INITIAL_ROOMS);
    const updated = rooms.map(r => r.id === id ? { ...r, ...roomData } : r);
    setLocalData('rooms', updated);
    return updated.find(r => r.id === id);
  },

  async deleteRoom(id) {
    try {
      await apiClient.delete(`/api/rooms/${id}`);
    } catch (e) {
      // Fallback
    }
    const rooms = getLocalData('rooms', INITIAL_ROOMS);
    const filtered = rooms.filter(r => r.id !== id);
    setLocalData('rooms', filtered);
    return true;
  },

  // ================= BOOKINGS =================
  async getBookings() {
    try {
      const res = await apiClient.get('/api/bookings');
      if (res.data?.data) return res.data.data;
    } catch (e) {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('bookings').select('*, rooms(name, image_url), users(name, email)');
        if (!error && data?.length) return data;
      }
    }
    return getLocalData('bookings', INITIAL_BOOKINGS);
  },

  async getMyBookings() {
    try {
      const res = await apiClient.get('/api/bookings/my');
      if (res.data?.data) return res.data.data;
    } catch (e) {
      // Fallback
    }
    const currentUser = JSON.parse(localStorage.getItem('aurelia_user') || 'null');
    const bookings = getLocalData('bookings', INITIAL_BOOKINGS);
    if (!currentUser) return bookings;
    return bookings.filter(b => b.userId === currentUser.id || b.userEmail === currentUser.email);
  },

  async createBooking(bookingData) {
    try {
      const res = await apiClient.post('/api/bookings', bookingData);
      if (res.data?.data) return res.data.data;
    } catch (e) {
      // Fallback local persistence
    }
    const bookings = getLocalData('bookings', INITIAL_BOOKINGS);
    const currentUser = JSON.parse(localStorage.getItem('aurelia_user') || 'null') || {
      id: "a0000000-0000-0000-0000-000000000002",
      name: "Harish Kumar",
      email: "harish@example.com"
    };

    const newBooking = {
      id: `AUR-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      ...bookingData,
      status: "CONFIRMED",
      createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    setLocalData('bookings', bookings);
    return newBooking;
  },

  async cancelBooking(id) {
    try {
      const res = await apiClient.put(`/api/bookings/${id}/cancel`);
      if (res.data?.data) return res.data.data;
    } catch (e) {
      // Fallback
    }
    const bookings = getLocalData('bookings', INITIAL_BOOKINGS);
    const updated = bookings.map(b => b.id === id ? { ...b, status: "CANCELLED" } : b);
    setLocalData('bookings', updated);
    return updated.find(b => b.id === id);
  },

  async updateBookingStatus(id, status) {
    try {
      const res = await apiClient.put(`/api/bookings/${id}/status`, { status });
      if (res.data?.data) return res.data.data;
    } catch (e) {
      // Fallback
    }
    const bookings = getLocalData('bookings', INITIAL_BOOKINGS);
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    setLocalData('bookings', updated);
    return updated.find(b => b.id === id);
  },

  async deleteBooking(id) {
    try {
      await apiClient.delete(`/api/bookings/${id}`);
    } catch (e) {
      // Fallback
    }
    const bookings = getLocalData('bookings', INITIAL_BOOKINGS);
    const filtered = bookings.filter(b => b.id !== id);
    setLocalData('bookings', filtered);
    return true;
  },

  // ================= RESTAURANTS =================
  async getRestaurants() {
    try {
      const res = await apiClient.get('/api/restaurants');
      if (res.data?.data) return res.data.data;
    } catch (e) {
      // Fallback
    }
    return getLocalData('restaurants', INITIAL_RESTAURANTS);
  },

  async createRestaurant(data) {
    try {
      const res = await apiClient.post('/api/restaurants', data);
      if (res.data?.data) return res.data.data;
    } catch (e) {}
    const items = getLocalData('restaurants', INITIAL_RESTAURANTS);
    const newItem = { ...data, id: `c0000000-${Date.now().toString().slice(-8)}` };
    items.unshift(newItem);
    setLocalData('restaurants', items);
    return newItem;
  },

  async deleteRestaurant(id) {
    try {
      await apiClient.delete(`/api/restaurants/${id}`);
    } catch (e) {}
    const items = getLocalData('restaurants', INITIAL_RESTAURANTS);
    setLocalData('restaurants', items.filter(i => i.id !== id));
    return true;
  },

  // ================= ACTIVITIES =================
  async getActivities() {
    try {
      const res = await apiClient.get('/api/activities');
      if (res.data?.data) return res.data.data;
    } catch (e) {
      // Fallback
    }
    return getLocalData('activities', INITIAL_ACTIVITIES);
  },

  async createActivity(data) {
    try {
      const res = await apiClient.post('/api/activities', data);
      if (res.data?.data) return res.data.data;
    } catch (e) {}
    const items = getLocalData('activities', INITIAL_ACTIVITIES);
    const newItem = { ...data, id: `d0000000-${Date.now().toString().slice(-8)}` };
    items.unshift(newItem);
    setLocalData('activities', items);
    return newItem;
  },

  async deleteActivity(id) {
    try {
      await apiClient.delete(`/api/activities/${id}`);
    } catch (e) {}
    const items = getLocalData('activities', INITIAL_ACTIVITIES);
    setLocalData('activities', items.filter(i => i.id !== id));
    return true;
  },

  // ================= REVIEWS =================
  async getReviews() {
    try {
      const res = await apiClient.get('/api/reviews');
      if (res.data?.data) return res.data.data;
    } catch (e) {}
    return getLocalData('reviews', INITIAL_REVIEWS);
  },

  async createReview(reviewData) {
    try {
      const res = await apiClient.post('/api/reviews', reviewData);
      if (res.data?.data) return res.data.data;
    } catch (e) {}
    const reviews = getLocalData('reviews', INITIAL_REVIEWS);
    const newRev = {
      id: `f0000000-${Date.now().toString().slice(-8)}`,
      ...reviewData,
      date: "Just now"
    };
    reviews.unshift(newRev);
    setLocalData('reviews', reviews);
    return newRev;
  },

  // ================= AUTH =================
  async login(email, password) {
    try {
      const res = await apiClient.post('/api/auth/login', { email, password });
      if (res.data?.data) {
        localStorage.setItem('aurelia_jwt_token', res.data.data.token);
        localStorage.setItem('aurelia_user', JSON.stringify(res.data.data));
        return res.data.data;
      }
    } catch (e) {
      // Fallback mock login
    }
    
    // Default demo accounts
    let user = {
      id: "a0000000-0000-0000-0000-000000000002",
      name: "Harish Kumar",
      email: email,
      role: email.toLowerCase().includes("admin") ? "ADMIN" : "USER",
      token: `mock_jwt_token_${Date.now()}`
    };

    if (email === "admin@aureliaresort.com") {
      user = {
        id: "a0000000-0000-0000-0000-000000000001",
        name: "Admin Concierge",
        email: "admin@aureliaresort.com",
        role: "ADMIN",
        token: `mock_jwt_admin_token_${Date.now()}`
      };
    }

    localStorage.setItem('aurelia_jwt_token', user.token);
    localStorage.setItem('aurelia_user', JSON.stringify(user));
    return user;
  },

  async register(name, email, phone, password) {
    try {
      const res = await apiClient.post('/api/auth/register', { name, email, phone, password });
      if (res.data?.data) {
        localStorage.setItem('aurelia_jwt_token', res.data.data.token);
        localStorage.setItem('aurelia_user', JSON.stringify(res.data.data));
        return res.data.data;
      }
    } catch (e) {}

    const newUser = {
      id: `u0000000-${Date.now().toString().slice(-8)}`,
      name,
      email,
      phone,
      role: "USER",
      tier: "Sovereign Resident",
      createdAt: new Date().toISOString(),
      totalBookings: 0,
      token: `mock_jwt_token_${Date.now()}`
    };

    // Persist new user in registered users list
    const users = getLocalData('users', INITIAL_USERS);
    const existingIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], name, phone };
    } else {
      users.unshift(newUser);
    }
    setLocalData('users', users);

    localStorage.setItem('aurelia_jwt_token', newUser.token);
    localStorage.setItem('aurelia_user', JSON.stringify(newUser));
    return newUser;
  },

  // ================= USERS MANAGEMENT =================
  async getUsers() {
    try {
      const res = await apiClient.get('/api/users');
      if (res.data?.data) return res.data.data;
    } catch (e) {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('users').select('*');
        if (!error && data?.length) return data;
      }
    }
    return getLocalData('users', INITIAL_USERS);
  },

  logout() {
    localStorage.removeItem('aurelia_jwt_token');
    localStorage.removeItem('aurelia_user');
  },

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('aurelia_user') || 'null');
    } catch (e) {
      return null;
    }
  },

  // ================= ADMIN DASHBOARD =================
  async getDashboardStats() {
    try {
      const res = await apiClient.get('/api/admin/dashboard');
      if (res.data?.data) return res.data.data;
    } catch (e) {}

    const bookings = getLocalData('bookings', INITIAL_BOOKINGS);
    const rooms = getLocalData('rooms', INITIAL_ROOMS);
    const users = getLocalData('users', INITIAL_USERS);
    const totalRev = bookings.reduce((sum, b) => b.status !== 'CANCELLED' ? sum + Number(b.totalPrice || 0) : sum, 0);

    return {
      totalBookings: bookings.length,
      activeBookings: bookings.filter(b => b.status === 'CONFIRMED').length,
      totalUsers: users.length,
      availableRooms: rooms.filter(r => r.available).length,
      totalRevenue: totalRev,
      occupancyRate: 84.5,
      recentBookings: bookings.slice(0, 5)
    };
  }
};
