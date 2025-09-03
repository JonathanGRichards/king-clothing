import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useCart } from '../../context/cart.context';

import './cart-icon.styles.scss';

const CartIcon = ({ onClick }) => {
  const { isCartOpen, setIsCartOpen, cartItems } = useCart();
  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  }
  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartItems.length}</span>
    </div>
  );
}

export default CartIcon;