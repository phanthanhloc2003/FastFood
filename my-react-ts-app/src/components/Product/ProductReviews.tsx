import React from "react";
import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/outline";

export interface Review {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  reviews: Review[];
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-bold">Đánh giá sản phẩm</h2>

      <div className="space-y-6">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex items-center mb-4">

            {review.user.avatar ? (
                      <img
                        className="h-16 w-16 rounded-full object-cover border-2 border-orange-200"
                        src={review.user.avatar}
                        alt={review.user.name}
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center border-2 border-orange-200">
                        <UserIcon className="h-8 w-8 text-orange-500" />
                      </div>
                    )}
              <div>
                <h3 className="font-semibold">{review.user.name}</h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-gray-600 ml-2">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductReviews;
