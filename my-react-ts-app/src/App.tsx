import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { setCredentials } from "./store/slices/authSlice";

import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes";
import usersApi from "./services/user";
import { cartApi } from "./services/cart";
import { addToCart, clearCart } from "./store/slices/cartSlice";
import { RootState } from "./store/store";

const App: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const user = await usersApi.getById();
          dispatch(setCredentials({ user }));
        } catch (error) {
          console.error("Error fetching user:", error);
          localStorage.removeItem("token");
        }
      }
    };
    fetchUser();
  }, [dispatch]);
    useEffect(() => {

      const fetchCartData = async () => {
        try {
          const data = await cartApi.get();
          if (data && data.length > 0) {
            dispatch(clearCart());
            data.forEach((item) => {
              dispatch(addToCart({
                product: item.productSize.product,
                quantity: item.quantity,
                size: item.productSize.size,
                sizeId: item.productSize.id,
                price: item.productSize.price,
              }));
            });
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
        } 
      };
      if ( isAuthenticated) {
        fetchCartData();
      }
    }, [isAuthenticated]);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
