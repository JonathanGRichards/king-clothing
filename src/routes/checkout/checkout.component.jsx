import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  CheckoutItems,
  Total,
} from './checkout.styles.jsx';
import { Fragment } from 'react';
import { useCart } from '../../context/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
  const { cartItems, totalPrice } = useCart();
  return (
    <Fragment>
      <CheckoutContainer>
        <CheckoutHeader>
          <HeaderBlock>
            <span>Product</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Description</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Quantity</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Price</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Remove</span>
          </HeaderBlock>
        </CheckoutHeader>
        <CheckoutItems>
          {cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </CheckoutItems>
        <Total>Total: £{totalPrice}</Total>
      </CheckoutContainer>
    </Fragment>
  );
};

export default Checkout;
