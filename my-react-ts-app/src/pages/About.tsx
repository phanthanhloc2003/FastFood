import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Về Chúng Tôi</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">
            Chúng tôi là một đội ngũ đam mê công nghệ và luôn nỗ lực mang đến những giải pháp tốt nhất cho người dùng.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 