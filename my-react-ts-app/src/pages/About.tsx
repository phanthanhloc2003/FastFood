import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout/Layout';

const About: React.FC = () => {
  return (
      <div className="bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-[500px] bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 flex items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center px-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Về Chúng Tôi
              </h1>
              <p className="text-xl text-white/90">
                Hành trình tạo nên những bữa ăn ngon miệng và đáng nhớ
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Story Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-2xl mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Câu Chuyện Của Chúng Tôi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  FastFood được thành lập vào năm 2020 với sứ mệnh mang đến những bữa ăn nhanh chất lượng và ngon miệng cho mọi người. Chúng tôi tin rằng thức ăn nhanh không chỉ là sự tiện lợi mà còn phải đảm bảo chất lượng và hương vị tuyệt vời.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Với đội ngũ đầu bếp chuyên nghiệp và nguyên liệu tươi ngon, chúng tôi cam kết mang đến trải nghiệm ẩm thực tốt nhất cho khách hàng. Mỗi món ăn đều được chế biến với tình yêu và sự tận tâm.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-red-50 p-4 rounded-xl text-center">
                    <h3 className="text-3xl font-bold text-red-600 mb-2">3+</h3>
                    <p className="text-gray-600">Năm kinh nghiệm</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-xl text-center">
                    <h3 className="text-3xl font-bold text-red-600 mb-2">1000+</h3>
                    <p className="text-gray-600">Khách hàng hài lòng</p>
                  </div>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt="Our Story"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-2xl shadow-2xl mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Giá Trị Cốt Lõi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-xl text-center"
              >
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Chất Lượng</h3>
                <p className="text-gray-600">Cam kết sử dụng nguyên liệu tươi ngon và quy trình chế biến đạt chuẩn.</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-xl text-center"
              >
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Dịch Vụ</h3>
                <p className="text-gray-600">Đội ngũ nhân viên thân thiện, phục vụ tận tâm và chuyên nghiệp.</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-xl text-center"
              >
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Sáng Tạo</h3>
                <p className="text-gray-600">Liên tục đổi mới và sáng tạo để mang đến trải nghiệm ẩm thực độc đáo.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow-2xl mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Đội Ngũ Của Chúng Tôi</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { name: 'Nguyễn Văn A', position: 'Đầu bếp trưởng', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
                { name: 'Trần Thị B', position: 'Quản lý', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80' },
                { name: 'Lê Văn C', position: 'Đầu bếp', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' },
                { name: 'Phạm Thị D', position: 'Nhân viên phục vụ', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-6 shadow-xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Location Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Vị Trí Của Chúng Tôi</h2>
            <div className="h-[400px] rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.424404604123!2d106.6999993!3d10.7779999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b0b0b0b0b%3A0x0b0b0b0b0b0b0b0b!2sFastFood!5e0!3m2!1svi!2s!4v1234567890!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
  );
};

export default About; 