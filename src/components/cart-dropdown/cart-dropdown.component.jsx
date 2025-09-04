import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useCart } from '../../context/cart.context';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const { cartItems } = useCart();
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <Button>Go to checkout</Button>
    </div>
  );
}

export default CartDropdown;