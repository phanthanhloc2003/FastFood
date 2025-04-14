import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import PaymentMethodSelector from "../components/Payment/PaymentMethodSelector";
import PaymentSummary from "../components/Payment/PaymentSummary";
import OrderDetails from "../components/Payment/OrderDetails";
import AddressModal from "../components/Payment/AddressModal";
import { PaymentMethod, PaymentStatus } from "../types/payment";
import { Address } from "../types/address";
import { CheckCircleIcon, XCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addressApi } from "../services/address";

const Payment: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("Cash");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const deliveryType = useSelector((state: RootState) => state.cart.deliveryType);
  const tableNumber = useSelector((state: RootState) => state.cart.tableNumber);
  const cartItem = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await addressApi.getAll();
        setAddresses(data);
        // Tự động chọn địa chỉ mặc định
        const defaultAddress = data.find((addr: Address) => addr.is_default);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    if (deliveryType === "Delivery") {
      fetchAddresses();
    }
  }, [deliveryType]);

  const orderData = {
    items: [
      {
        productName: "Burger Bò",
        size: "Vừa",
        price: 89000,
        quantity: 2,
        total: 178000,
      },
      {
        productName: "Gà rán",
        size: "Lớn",
        price: 59000,
        quantity: 1,
        total: 59000,
      },
    ],
    totalPrice: 237000,
    address: {
      id: 0,
      name: "Khách hàng",
      phone: "0000000000",
      address_line: "123 ABC",
      ward: "Phường 1",
      district: "Quận 1",
      province: "TP.HCM",
      is_default: false,
      created_at: new Date().toISOString(),
    },
  };

  const handlePayment = async () => {
    if (deliveryType === "Delivery" && !selectedAddress) {
      alert("Vui lòng chọn địa chỉ giao hàng");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const success = Math.random() > 0.3;
      setPaymentStatus(success ? "Paid" : "Failed");
      setIsProcessing(false);
    }, 2000);
  };

  const handleAddNewAddress = () => {
    navigate('/address')
    console.log("Add new address");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
            variants={itemVariants}
          >
            Thanh toán đơn hàng
          </motion.h1>

          <motion.div className="mb-8" variants={itemVariants}>
            <OrderDetails
              items={cartItem.items}
              totalPrice={orderData.totalPrice}
              address={selectedAddress || orderData.address}
              deliveryType={deliveryType}
              tableNumber={tableNumber}
              onEditAddress={() => setIsAddressModalOpen(true)}
            />
          </motion.div>
          <motion.div
            className="bg-white rounded-xl shadow-md p-6 mb-8"
            variants={itemVariants}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Chọn phương thức thanh toán
            </h2>
            <PaymentMethodSelector
              selectedMethod={selectedMethod}
              onMethodChange={setSelectedMethod}
            />
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-md p-6 mb-8"
            variants={itemVariants}
          >
            <PaymentSummary
              amount={cartItem.total}
              orderId={Number(orderId)}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.button
              className="w-full bg-primary-main text-white py-4 rounded-xl font-medium text-lg flex items-center justify-center"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handlePayment}
              disabled={isProcessing || paymentStatus !== null}
            >
              {isProcessing ? (
                <motion.div
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : paymentStatus ? (
                "Hoàn tất"
              ) : (
                "Thanh toán ngay"
              )}
            </motion.button>
          </motion.div>

          <AddressModal
            isOpen={isAddressModalOpen}
            onClose={() => setIsAddressModalOpen(false)}
            addresses={addresses}
            selectedAddress={selectedAddress}
            onSelectAddress={setSelectedAddress}
            onAddNewAddress={handleAddNewAddress}
          />

          <AnimatePresence>
            {paymentStatus && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  {paymentStatus === "Paid" ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                      >
                        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Thanh toán thành công!
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của
                        bạn ngay lập tức.
                      </p>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                      >
                        <XCircleIcon className="w-20 h-20 text-red-500 mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Thanh toán thất bại
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng
                        thử lại.
                      </p>
                    </>
                  )}
                  <motion.button
                    className="w-full bg-primary-main text-white py-3 rounded-lg font-medium"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => {
                      if (paymentStatus === "Paid") {
                        navigate("/orders");
                      } else {
                        setPaymentStatus(null);
                      }
                    }}
                  >
                    {paymentStatus === "Paid" ? "Xem đơn hàng" : "Thử lại"}
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;
