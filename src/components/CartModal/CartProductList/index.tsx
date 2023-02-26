import { useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { ShopPageContext } from '../../../providers/ShopPageContext';

const CartProductList = () => {
  const { cartProducts, setCartProducts, setModal } =
    useContext(ShopPageContext);

  const productsSum = cartProducts.reduce(
    (accumulator, product) => accumulator + product.price,
    0
  );

  return (
    <StyledCartProductList>
      <ul>
        {cartProducts.length < 1 ? (
          <h1>Sua sacola está vazia</h1>
        ) : (
          <CartProductCard />
        )}
      </ul>
      <div className='totalBox'>
        <button type='button' onClick={() => setModal(false)}>
          Adicione outros itens
        </button>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>{`R$ ${productsSum.toFixed(
          2
        )}`}</StyledParagraph>
      </div>
      <StyledButton
        onClick={() => setCartProducts([])}
        $buttonSize='default'
        $buttonStyle='gray'
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
