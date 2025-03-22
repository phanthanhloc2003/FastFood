import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Trang Chủ</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">
            Chào mừng bạn đến với ứng dụng của chúng tôi!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home; 