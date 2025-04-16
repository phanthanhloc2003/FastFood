 export const OrderDetailPage = () => {
  return 1;
 }

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ArrowLeftIcon, 
//   CheckCircleIcon, 
//   XCircleIcon,
//   UserIcon,
//   MapPinIcon,
//   PhoneIcon,
//   ClockIcon,
//   ShoppingBagIcon,
//   TableCellsIcon,
//   TruckIcon,
//   CreditCardIcon
// } from '@heroicons/react/24/outline';
// import { orderApi } from '../../services/order';
// import { OrderResponse } from '../../types/orderStatus';
// import { format } from 'date-fns';

// const OrderDetailPage: React.FC = () => {
//   const { orderId } = useParams<{ orderId: string }>();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState<OrderResponse | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUpdating, setIsUpdating] = useState(false);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         setIsLoading(true);
//         if (orderId) {
//           const data = await orderApi.getHistory();
//           const foundOrder = data.find(o => o.id === Number(orderId));
//           setOrder(foundOrder || null);
//         }
//       } catch (error) {
//         console.error('Error fetching order:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   const handleUpdateStatus = async (status: string) => {
//     try {
//       setIsUpdating(true);
//       // TODO: Call API to update order status
//       setOrder(prev => prev ? { ...prev, status } : null);
//     } catch (error) {
//       console.error('Error updating order:', error);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   if (!orderId || isNaN(Number(orderId))) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto text-center">
//           <h1 className="text-2xl font-bold text-gray-900">ID đơn hàng không hợp lệ</h1>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate('/admin/orders')}
//             className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//           >
//             Quay lại danh sách đơn hàng
//           </motion.button>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
//         <motion.div
//           className="flex flex-col items-center gap-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <motion.div
//             className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
//             animate={{ rotate: 360 }}
//             transition={{
//               duration: 1,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//           />
//           <motion.h2
//             className="text-xl font-bold text-gray-900"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             Đang tải thông tin đơn hàng...
//           </motion.h2>
//         </motion.div>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto text-center">
//           <h1 className="text-2xl font-bold text-gray-900">Không tìm thấy đơn hàng #{orderId}</h1>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate('/admin/orders')}
//             className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//           >
//             Quay lại danh sách đơn hàng
//           </motion.button>
//         </div>
//       </div>
//     );
//   }

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('vi-VN', {
//       style: 'currency',
//       currency: 'VND'
//     }).format(amount);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8 px-4 sm:px-6 lg:px-8"
//     >
//       <div className="max-w-4xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl shadow-xl overflow-hidden backdrop-blur-lg bg-opacity-90"
//         >
//           {/* Header */}
//           <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
//             <div className="flex items-center gap-4 mb-4">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => navigate('/admin/orders')}
//                 className="p-2 hover:bg-orange-400 rounded-full transition-colors"
//               >
//                 <ArrowLeftIcon className="w-6 h-6" />
//               </motion.button>
//               <div>
//                 <h1 className="text-2xl font-bold">Đơn hàng #{order.order_code}</h1>
//                 <p className="text-sm text-orange-100 mt-1">
//                   {format(new Date(order.created_at), "HH:mm dd/MM/yyyy")}
//                 </p>
//               </div>
//             </div>
//             <div className="flex flex-wrap items-center justify-between gap-4">
//               <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                 order.status === 'Completed' ? 'bg-green-100 text-green-800' :
//                 order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                 'bg-red-100 text-red-800'
//               }`}>
//                 {order.status === 'Pending' ? 'Đang xử lý' :
//                  order.status === 'Completed' ? 'Đã hoàn thành' :
//                  order.status === 'Cancelled' ? 'Đã hủy' : order.status}
//               </span>
//               <div className="flex items-center gap-2 text-sm text-orange-100">
//                 <ClockIcon className="w-4 h-4" />
//                 <span>Phương thức: {order.delivery_type}</span>
//               </div>
//             </div>
//           </div>

//           {/* Thông tin khách hàng */}
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-orange-600">
//               <UserIcon className="w-5 h-5" />
//               Thông tin khách hàng
//             </h2>
//             <div className="grid gap-4 sm:grid-cols-2">
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
//               >
//                 <div className="p-2 bg-orange-100 rounded-full">
//                   <UserIcon className="w-5 h-5 text-orange-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Tên khách hàng</p>
//                   <p className="font-medium">{order.address.name}</p>
//                 </div>
//               </motion.div>
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
//               >
//                 <div className="p-2 bg-orange-100 rounded-full">
//                   <PhoneIcon className="w-5 h-5 text-orange-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Số điện thoại</p>
//                   <p className="font-medium">{order.address.phone}</p>
//                 </div>
//               </motion.div>
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg sm:col-span-2"
//               >
//                 <div className="p-2 bg-orange-100 rounded-full">
//                   <MapPinIcon className="w-5 h-5 text-orange-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Địa chỉ giao hàng</p>
//                   <p className="font-medium">
//                     {order.address.address_line}, {order.address.ward}, {order.address.district}, {order.address.province}
//                   </p>
//                 </div>
//               </motion.div>
//             </div>
//           </div>

//           {/* Thông tin đơn hàng */}
//           <div className="p-6">
//             <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-orange-600">
//               <ShoppingBagIcon className="w-5 h-5" />
//               Chi tiết đơn hàng
//             </h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
//                     <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
//                     <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Đơn giá</th>
//                     <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thành tiền</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {order.items?.map((item, index) => (
//                     <motion.tr
//                       key={item.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="hover:bg-gray-50"
//                     >
//                       <td className="px-4 py-4">
//                         <div className="flex items-center gap-3">
//                           {item.image && (
//                             <img
//                               src={item.image}
//                               alt={item.name}
//                               className="h-12 w-12 rounded-lg object-cover"
//                             />
//                           )}
//                           <div>
//                             <div className="font-medium text-gray-900">{item.name}</div>
//                             {item.note && (
//                               <div className="text-xs text-gray-500">Ghi chú: {item.note}</div>
//                             )}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 text-center">
//                         <div className="text-gray-900">{item.quantity}</div>
//                       </td>
//                       <td className="px-4 py-4 text-right">
//                         <div className="text-gray-900">{formatCurrency(item.price)}</div>
//                       </td>
//                       <td className="px-4 py-4 text-right">
//                         <div className="text-gray-900">{formatCurrency(item.price * item.quantity)}</div>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="mt-6 flex justify-end">
//               <div className="text-right">
//                 <p className="text-sm text-gray-600">Tổng tiền:</p>
//                 <p className="text-2xl font-bold text-orange-600">
//                   {formatCurrency(Number(order.total_price))}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           {order.status === 'Pending' && (
//             <div className="p-6 border-t border-gray-200">
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   disabled={isUpdating}
//                   onClick={() => handleUpdateStatus('Completed')}
//                   className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <CheckCircleIcon className="w-5 h-5" />
//                   {isUpdating ? 'Đang xử lý...' : 'Xác nhận đơn hàng'}
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   disabled={isUpdating}
//                   onClick={() => handleUpdateStatus('Cancelled')}
//                   className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <XCircleIcon className="w-5 h-5" />
//                   {isUpdating ? 'Đang xử lý...' : 'Hủy đơn hàng'}
//                 </motion.button>
//               </div>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default OrderDetailPage; 