import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/product";

 export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  sizeId: number;
  price: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  deliveryType:  "Dine-in" | "Take-away" | "Delivery";
  tableNumber: number | null;
}

const initialState: CartState = {
  items: [],
  total: 0,
  deliveryType: "Take-away",
  tableNumber: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.size === action.payload.size
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ productId: number; size: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.product.id === action.payload.productId &&
            item.size === action.payload.size
          )
      );
      state.total = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        size: string;
        quantity: number;
      }>
    ) => {
      const item = state.items.find(
        (item) =>
          item.product.id === action.payload.productId &&
          item.size === action.payload.size
      );
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      }
    },

    updateItemSize: (
      state,
      action: PayloadAction<{
        productId: number;
        oldSize: string;
        newSize: string;
        newSizeId: number;
        newPrice: number;
      }>
    ) => {
      const item = state.items.find(
        (item) =>
          item.product.id === action.payload.productId &&
          item.size === action.payload.oldSize
      );

      if (item) {
        const existingNewItem = state.items.find(
          (i) =>
            i.product.id === action.payload.productId &&
            i.size === action.payload.newSize
        );

        if (existingNewItem && existingNewItem !== item) {
          existingNewItem.quantity += item.quantity;

          // Xóa item cũ
          state.items = state.items.filter((i) => i !== item);
        } else {
          item.size = action.payload.newSize;
          item.sizeId = action.payload.newSizeId;
          item.price = action.payload.newPrice;
        }

        state.total = state.items.reduce(
          (total, i) => total + i.price * i.quantity,
          0
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.deliveryType = "Take-away";
      state.tableNumber = null;
    },

    paymets: (
      state,
      action: PayloadAction<{
        deliveryType:  "Dine-in" | "Take-away" | "Delivery";
        tableNumber: number | null;
      }>
    ) => {
      const { deliveryType, tableNumber } = action.payload;
      state.deliveryType = deliveryType;
      state.tableNumber = tableNumber;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  updateItemSize,
  clearCart,
  paymets,
} = cartSlice.actions;
export default cartSlice.reducer;
