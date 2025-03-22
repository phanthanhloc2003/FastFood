import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import AppRoutes from './routes';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="bg-orange-600 text-white p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">🍔 FastFood</Link>
            <div className="space-x-6">
              <Link to="/" className="hover:text-orange-200">Trang Chủ</Link>
              <Link to="/about" className="hover:text-orange-200">Về Chúng Tôi</Link>
              <Link
                to="/login"
                className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-100 transition-colors"
              >
                Đăng Nhập
              </Link>
            </div>
          </div>
        </nav>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

export default App;
