// eslint-disable-next-line no-use-before-define
import React, { createContext, ReactNode, useState } from 'react';
import { toast } from 'react-toastify';
import { IProduct } from '../components/ProductList/ProductCard';
import api from '../services/api';

interface ICartProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface ShopPageProviderProps {
  children: ReactNode;
}

interface ShopPageContextData {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  productsList: IProduct[];
  loadProducts: () => Promise<void>;
  addToCart: (id: number) => void;
  loading: boolean;
  cartProducts: ICartProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<ICartProduct[]>>;
}

export const ShopPageContext = createContext<ShopPageContextData>(
  {} as ShopPageContextData
);
const ShopPageProvider = ({ children }: ShopPageProviderProps) => {
  const [modal, setModal] = useState(false);
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
  const token = localStorage.getItem('@TOKEN');
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductsList(response.data);
    } catch (error) {
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (id: number) => {
    const productToAdd = productsList.find((product) => product.id === id);
    if (productToAdd){
    setCartProducts([...cartProducts, productToAdd]);
    }
  };

  return (
    <ShopPageContext.Provider
      value={{
        setModal,
        modal,
        productsList,
        loadProducts,
        addToCart,
        loading,
        cartProducts,
        setCartProducts,
      }}
    >
      {children}
    </ShopPageContext.Provider>
  );
};

export default ShopPageProvider;
