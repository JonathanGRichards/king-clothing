import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useCart } from '../../context/cart.context';
import { useNavigate } from 'react-router-dom';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { setIsCartOpen } = useCart();
  const goToCheckoutHandler = () => {
    navigate('/checkout' );
    setIsCartOpen(false);
  }
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
    </div>
  );
}

export default CartDropdown;