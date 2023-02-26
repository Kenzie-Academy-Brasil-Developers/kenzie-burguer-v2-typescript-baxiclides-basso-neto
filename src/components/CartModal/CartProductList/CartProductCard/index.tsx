import { MdDelete } from 'react-icons/md';
import { useContext } from 'react';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { ShopPageContext } from '../../../../providers/ShopPageContext';

const CartProductCard = () => {
  const { cartProducts, setCartProducts } = useContext(ShopPageContext);

  const handleRemoveProduct = (productId: number) => {
    const updatedCartProducts = cartProducts.filter(
      (product) => product.id !== productId
    );
    setCartProducts(updatedCartProducts);
  };
  return (
    <>
      {cartProducts.map((product) => (
        <StyledCartProductCard key={product.id}>
          <div className='imageBox'>
            <img src={product.img} alt='Hamburguer' />
          </div>
          <div className='contentBox'>
            <StyledTitle tag='h3' $fontSize='three'>
              {product.name}
            </StyledTitle>
            <button
              onClick={() => handleRemoveProduct(product.id)}
              type='button'
              aria-label='Remover'
            >
              <MdDelete size={24} />
            </button>
          </div>
        </StyledCartProductCard>
      ))}
    </>
  );
};
export default CartProductCard;
