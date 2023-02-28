// eslint-disable-next-line no-use-before-define
import React, { createContext, ReactNode, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

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
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  searchTerm: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filteredProducts: IProduct[];
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
  const [searchTerm, setSearchTerm] = useState('');

  // Se searchTerm estiver vazio, ele inclui todos os itens na lista filteredProducts
  const filteredProducts = productsList.filter((product) =>
    searchTerm === ''
      ? true
      : product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // React.FormEvent define o tipo de evento que ocorreu em um elemento de formulário HTML(HTMLFormElemtn)
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    // preventDefault para que a página não seja atualizada na busca
    event.preventDefault();
  };
  //
  // o evento de mudança(changeEvent) está sendo monitorado no elemento HTML de input(HTMLInputElement)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // o valor do campo de pesquisa é atribuido ao searchTerm
    setSearchTerm(event.target.value);
  };

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
    if (productToAdd) {
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
        handleSearch,
        searchTerm,
        handleChange,
        filteredProducts,
      }}
    >
      {children}
    </ShopPageContext.Provider>
  );
};

export default ShopPageProvider;
