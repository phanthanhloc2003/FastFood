import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCircleIcon,
  ShoppingBagIcon,
  MapPinIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  UserIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

interface Tab {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  { id: 'profile', name: 'Thông tin cá nhân', icon: UserCircleIcon },
  { id: 'orders', name: 'Đơn hàng', icon: ShoppingBagIcon },
  { id: 'addresses', name: 'Địa chỉ', icon: MapPinIcon },
  { id: 'purchased', name: 'Sản phẩm đã mua', icon: StarIcon },
  { id: 'settings', name: 'Cài đặt', icon: Cog6ToothIcon },
];

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="border-b border-gray-200">
      {/* Mobile dropdown */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-between w-full px-4 py-3 text-left"
        >
          <div className="flex items-center">
            {activeTabData && (
              <>
                <activeTabData.icon className="w-5 h-5 mr-2 text-primary-main" />
                <span className="font-medium">{activeTabData.name}</span>
              </>
            )}
          </div>
          <ChevronDownIcon 
            className={`w-5 h-5 transition-transform ${isMobileMenuOpen ? 'transform rotate-180' : ''}`} 
          />
        </button>
        
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="py-2 bg-white">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center w-full px-4 py-2 text-sm ${
                      activeTab === tab.id
                        ? 'text-primary-main bg-primary-main/5'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5 mr-2" />
                    {tab.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop tabs */}
      <nav className="hidden md:flex space-x-8 px-6">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? 'border-primary-main text-primary-main'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <tab.icon className="w-5 h-5 mr-2" />
            {tab.name}
          </motion.button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileTabs; 