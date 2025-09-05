import './checkout-item.styles.scss';
import { useCart } from '../../context/cart.context';

const CheckoutItem = ({ cartItem }) => {
  const { removeItemFromCart, addItemToCart, clearItemFromCart } = useCart();
  return (
    <div key={cartItem.id} className="checkout-item">
    <div className="image-container">
      <img src={cartItem.imageUrl} alt={cartItem.name} />
    </div>
    <div className="name">{cartItem.name}</div>
    <div className="quantity-container">
      <div
        className="arrow"
        onClick={() => removeItemFromCart(cartItem)}
      >
        &#10094;
      </div>
      <div className="quantity">{cartItem.quantity}</div>
      <div
        className="arrow"
        onClick={() => addItemToCart(cartItem)}
      >
        &#10095;
      </div>
    </div>
    <div className="price">£{cartItem.price * cartItem.quantity}</div>
    <div
      className="remove-button"
      onClick={() => clearItemFromCart(cartItem)}
    >
      &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;