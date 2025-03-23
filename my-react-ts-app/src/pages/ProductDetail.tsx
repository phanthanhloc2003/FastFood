import React from 'react';
import { useParams } from 'react-router-dom';
import ProductGallery from '../components/Product/ProductGallery';
import ProductInfo from '../components/Product/ProductInfo';
import ProductReviews from '../components/Product/ProductReviews';

// Dữ liệu mẫu (sau này sẽ được thay thế bằng API call)
const productData = {
  id: 1,
  title: 'Burger Bò Phô Mai',
  price: 89000,
  description:
    'Burger bò thơm ngon với phô mai tan chảy, kết hợp cùng rau xanh tươi ngon và sốt đặc biệt của chúng tôi. Món ăn hoàn hảo cho bữa trưa hoặc tối.',
  rating: 4.5,
  totalReviews: 128,
  images: [
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1586816001966-79b736744398?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  ],
  ingredients: [
    'Bánh burger tươi',
    'Thịt bò xay 100%',
    'Phô mai cheddar',
    'Rau xà lách',
    'Cà chua',
    'Hành tây',
    'Sốt đặc biệt',
  ],
  reviews: [
    {
      id: 1,
      user: {
        name: 'Nguyễn Văn A',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      rating: 5,
      comment: 'Burger rất ngon, phô mai tan chảy đúng chuẩn. Sẽ quay lại!',
      date: '2024-03-20',
    },
    {
      id: 2,
      user: {
        name: 'Trần Thị B',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
      rating: 4,
      comment: 'Hương vị tốt, giá cả hợp lý. Phục vụ nhanh chóng.',
      date: '2024-03-19',
    },
    {
      id: 3,
      user: {
        name: 'Lê Văn C',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
      rating: 5,
      comment: 'Món ăn ngon, đáng giá tiền. Nhân viên phục vụ nhiệt tình.',
      date: '2024-03-18',
    },
  ],
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleAddToCart = (quantity: number) => {
    // Xử lý thêm vào giỏ hàng
    console.log(`Thêm ${quantity} sản phẩm vào giỏ hàng`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Phần hình ảnh */}
          <ProductGallery
            images={productData.images}
            title={productData.title}
          />

          {/* Phần thông tin sản phẩm */}
          <ProductInfo
            title={productData.title}
            price={productData.price}
            description={productData.description}
            rating={productData.rating}
            reviews={productData.totalReviews}
            ingredients={productData.ingredients}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Phần đánh giá */}
        <div className="mt-20">
          <ProductReviews reviews={productData.reviews} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 