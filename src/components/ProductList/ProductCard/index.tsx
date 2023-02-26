import { useContext, useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { ShopPageContext } from '../../../providers/ShopPageContext';
// import api from '../../../services/api';

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

const ProductCard = () => {
  const { setModal, productsList, loadProducts, addToCart, loading } =
    useContext(ShopPageContext);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <h2 style={{ fontSize: '2rem', marginTop: '4rem', textAlign: 'right' }}>
          Carregando...
        </h2>
      ) : (
        productsList.map((product) => (
          <StyledProductCard key={product.id}>
            <div className='imageBox'>
              <img src={product.img} alt={product.name} />
            </div>
            <div className='content'>
              <StyledTitle tag='h3' $fontSize='three'>
                {product.name}
              </StyledTitle>
              <StyledParagraph className='category'>
                {product.category}
              </StyledParagraph>
              <StyledParagraph className='price'>
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </StyledParagraph>
              <StyledButton
                onClick={() => {
                  setModal(true);
                  addToCart(product.id);
                }}
                $buttonSize='medium'
                $buttonStyle='green'
              >
                Adicionar
              </StyledButton>
            </div>
          </StyledProductCard>
        ))
      )}
    </>
  );
};

export default ProductCard;
