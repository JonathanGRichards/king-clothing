import './checkout.styles.scss';
import { Fragment } from 'react';
import { useCart } from '../../context/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
  const { cartItems, totalPrice } = useCart();
  return (
    <Fragment>
      <div className="checkout-container">
        <div className="checkout-header">
          <div className="header-block">
            <span>Product</span>
          </div>
          <div className="header-block">
            <span>Description</span>
          </div>
          <div className="header-block">
            <span>Quantity</span>
          </div>
          <div className="header-block">
            <span>Price</span>
          </div>
          <div className="header-block">
            <span>Remove</span>
          </div>
        </div>
        <div className="checkout-items">
          {cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </div>
        <div className="total">
          Total: £
          {totalPrice}
        </div>
      </div>
    </Fragment>
  );
};

export default Checkout;
