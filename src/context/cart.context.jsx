import { createContext, useState, useContext, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.reduce((acc, cartItem) => {
    if (cartItem.id === productToRemove.id) {
      const newQuantity = (cartItem.quantity ?? 0) - 1;
      if (newQuantity > 0) {
        acc.push({ ...cartItem, quantity: newQuantity });
      }
    } else {
      acc.push(cartItem);
    }
    return acc;
  }, []);
};

const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
}
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  itemsCount: 0,
  addItemToCart: () => null,
  removeItemFromCart: () => null,
  clearItemFromCart: () => null,
  totalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const newItemsCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setItemsCount(newItemsCount);
  }, [cartItems]);
  useEffect(() => {
    const newTotalPrice = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cartItems]);
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }
  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  }
  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  }
  const value = { isCartOpen, setIsCartOpen, cartItems, setCartItems, addItemToCart, removeItemFromCart, clearItemFromCart, itemsCount, totalPrice};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext);