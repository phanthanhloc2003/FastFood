import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import PaymentMethodSelector from "../components/Payment/PaymentMethodSelector";
import PaymentSummary from "../components/Payment/PaymentSummary";
import OrderDetails from "../components/Payment/OrderDetails";
import AddressModal from "../components/Payment/AddressModal";
import { PaymentMethod, PaymentStatus } from "../types/payment";
import { Address } from "../types/address";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { DeliveryType, orderApi } from "../services/order";
import { CheckoutResponse } from "../types/cart";
import { payment, PaymentMethod as OrderPaymentMethod } from "../types/orderStatus";
import { clearCart } from "../store/slices/cartSlice";
const Payment: React.FC = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("Cash");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataCheckOut, setDataCheckOut] = useState<CheckoutResponse | null>(null);
  const cartItem = useSelector((state: RootState) => state.cart);

  const retrievedData: string | null = localStorage.getItem("orderData");
  let deliveryType: DeliveryType = "Delivery";
  let tableId: number | null | undefined;
  if (retrievedData) {
    const parsedData: payment = JSON.parse(retrievedData);
    deliveryType = parsedData.deliveryType;
    tableId = parsedData.tableId;
  }
  useEffect(() => {
    const fectData = async () => {
      try {
        setIsLoading(true);
        const checkout = await orderApi.checkout({ deliveryType, tableId });
        if (!checkout) {
          navigate("/");
        }
        setDataCheckOut(checkout);
        if (checkout?.address) {
          setAddresses(checkout.address);
          const defaultAddress = checkout?.address.find(
            (addr: Address) => addr.is_default
          );
          if (defaultAddress) {
            setSelectedAddress(defaultAddress);
          }
        }
      } catch (error) {
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };
    fectData();
  }, []);
  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      // const response = await orderApi.create({
      //   deliveryType,
      //   addressId: selectedAddress?.id,
      //   tableId,
      //   paymentMethod: selectedMethod as OrderPaymentMethod,
      // });

      // if (response) {
      //   dispatch(clearCart());
      //   setPaymentStatus("Paid");
      //   localStorage.removeItem("orderData");
      //   setTimeout(() => {
      //     navigate("/orders");
      //   }, 2000);
      // } else {
      //   setPaymentStatus("Failed");
      // }
      console.log("sđ")
    } catch (error) {
      setPaymentStatus("Failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddNewAddress = () => {
    navigate("/address");
  };

  const handleModalAction = () => {
    if (paymentStatus === "Paid") {
      navigate("/orders");
    } else {
      setPaymentStatus(null);
    }
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
    <>
      {isLoading ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-primary-main border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.h2
              className="text-xl font-bold text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Đang tải dữ liệu...
            </motion.h2>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Vui lòng đợi trong giây lát
            </motion.p>
            <motion.div
              className="flex items-center justify-center gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="w-2 h-2 bg-primary-main rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-2 bg-primary-main rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 bg-primary-main rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              />
            </motion.div>
          </motion.div>
        </div>
      ) : dataCheckOut ? (
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
                  items={dataCheckOut.cart}
                  totalPrice={dataCheckOut?.totalPrice}
                  address={selectedAddress}
                  deliveryType={deliveryType}
                  tableNumber={tableId}
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
                  className="w-full bg-primary-main text-white py-4 rounded-xl font-medium text-lg flex items-center justify-center relative overflow-hidden"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handlePayment}
                  disabled={isProcessing || paymentStatus !== null}
                >
                  {isProcessing ? (
                    <motion.div className="flex items-center gap-2">
                      <motion.div
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        Đang xử lý...
                      </motion.span>
                    </motion.div>
                  ) : paymentStatus ? (
                    "Hoàn tất"
                  ) : (
                    <>
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        Thanh toán ngay
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </>
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
                            Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn ngay lập tức.
                          </p>
                          <motion.div
                            className="flex items-center justify-center gap-2 text-green-500 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <motion.div
                              className="w-2 h-2 bg-green-500 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-green-500 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-green-500 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            />
                          </motion.div>
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
                            Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.
                          </p>
                        </>
                      )}
                      <motion.button
                        className="w-full bg-primary-main text-white py-3 rounded-lg font-medium"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={handleModalAction}
                      >
                        {paymentStatus === "Paid" ? "Xem đơn hàng" : "Thử lại"}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isProcessing && (
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
                      <motion.div
                        className="flex flex-col items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.div
                          className="w-16 h-16 border-4 border-primary-main border-t-transparent rounded-full mb-4"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <motion.h3
                          className="text-xl font-bold text-gray-900 mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          Đang xử lý thanh toán
                        </motion.h3>
                        <motion.p
                          className="text-gray-600"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          Vui lòng đợi trong giây lát...
                        </motion.p>
                        <motion.div
                          className="flex items-center justify-center gap-2 mt-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <motion.div
                            className="w-2 h-2 bg-primary-main rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-primary-main rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-primary-main rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Payment;
