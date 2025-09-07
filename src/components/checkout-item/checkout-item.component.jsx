import {
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Price,
  QuantityContainer,
  Quantity,
  Arrow,
  RemoveButton,
} from './checkout-item.styles.jsx';
import { useCart } from '../../context/cart.context';

const CheckoutItem = ({ cartItem }) => {
  const { removeItemFromCart, addItemToCart, clearItemFromCart } = useCart();
  return (
    <CheckoutItemContainer key={cartItem.id}>
      <ImageContainer>
        <img src={cartItem.imageUrl} alt={cartItem.name} />
      </ImageContainer>
      <Name>{cartItem.name}</Name>
      <QuantityContainer>
        <Arrow onClick={() => removeItemFromCart(cartItem)}>&#10094;</Arrow>
        <Quantity>{cartItem.quantity}</Quantity>
        <Arrow onClick={() => addItemToCart(cartItem)}>&#10095;</Arrow>
      </QuantityContainer>
      <Price>£{cartItem.price * cartItem.quantity}</Price>
      <RemoveButton onClick={() => clearItemFromCart(cartItem)}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
