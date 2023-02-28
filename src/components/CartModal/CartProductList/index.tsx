import { useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { ShopPageContext } from '../../../providers/ShopPageContext';

const CartProductList = () => {
  const { productsSum, setCartProducts, setModal } =
    useContext(ShopPageContext);

  return (
    <StyledCartProductList>
      <ul>
        <CartProductCard />
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
