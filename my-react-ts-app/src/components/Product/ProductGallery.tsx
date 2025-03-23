import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative aspect-square rounded-lg overflow-hidden"
      >
        <img
          src={images[selectedImage]}
          alt={`${title} - Hình ${selectedImage + 1}`}
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square rounded-lg overflow-hidden ${
              selectedImage === index ? 'ring-2 ring-red-600' : ''
            }`}
          >
            <img
              src={image}
              alt={`${title} - Hình ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery; 