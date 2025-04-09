import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Address from '../pages/Address';
import About from '../pages/About';
import Contact from '../pages/Contact';
import AdminLayout from '../components/Admin/Layout/AdminLayout';
import ProductManagement from '../pages/Admin/ProductManagement';
import UserManagement from '../pages/Admin/UserManagement';
import OrderManagement from '../pages/Admin/OrderManagement';
import CategoryManagement from '../pages/Admin/CategoryManagement';
import Layout from '../components/Layout/Layout';
import ProductDetail from '../pages/ProductDetail';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout><Outlet /></Layout>}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
  
        <Route path="/profile" element={<Profile />} />
        <Route path="/address" element={<Address />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin" element={<AdminLayout><Outlet /></AdminLayout>}>
        <Route index element={<Navigate to="products" replace />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 