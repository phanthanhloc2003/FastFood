import React from 'react';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  ShoppingBagIcon,
  MapPinIcon,
  Cog6ToothIcon,
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
  { id: 'settings', name: 'Cài đặt', icon: Cog6ToothIcon },
];

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6">
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