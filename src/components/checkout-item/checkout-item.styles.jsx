import styled from 'styled-components';

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 24px;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid darkgrey;
`;

export const ImageContainer = styled.div`
  width: 23%;
  img {
    width: 100%;
  }
`;

export const Name = styled.div`
  width: 23%;
  padding-left: 10px;
`;

export const Price = styled.div`
  width: 23%;
  padding-left: 10px;
`;

export const QuantityContainer = styled.div`
  width: 23%;
  padding-left: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Quantity = styled.div`
  margin: 0 10px;
`;

export const Arrow = styled.div`
  cursor: pointer;
  font-weight: bold;
`;

export const RemoveButton = styled.div`
  cursor: pointer;
  font-weight: bold;
`;
