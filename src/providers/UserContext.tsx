// eslint-disable-next-line no-use-before-define, import/no-duplicates
import React, { useState } from 'react';
// eslint-disable-next-line import/no-duplicates
import { createContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface ISignUpForm{

}

// Interface para exportar todos os dados que vão no value
interface IUserContextData {
  userSignUp: (data: object) => Promise<void>;
  userLogin: (data: object) => Promise<void>;
  loadProducts: () => Promise<void>;
  productsList: IProduct[];
}

interface IUserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<IUserContextData>(
  {} as IUserContextData
);

const UserProvider = ({ children }: IUserProviderProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('@TOKEN');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [user, setUser] = useState<IUser | null>(null);
  const [productsList, setProductsList] = useState<IProduct[]>([]);

  const userSignUp = async (data: object) => {
    try {
      await api.post('users', data);
      toast.success('Bem-vindo!');
      navigate('/');
    } catch (error) {
      toast.error('Dados inválidos!');
    }
  };

  const userLogin = async (data: object) => {
    try {
      const response = await api.post('login', data);
      localStorage.setItem('@TOKEN', response.data.token);
      navigate('/shop');
    } catch (error) {
      toast.error('Dados inválidos, tente novamente!');
    }
  };

  const loadProducts = async () => {
    try {
      const response = await api.get('products', { headers });
      setProductsList(response.data);
    } catch (error) {
      toast.error('Erro ao carregar produtos');
    }
  };

  return (
    <UserContext.Provider
      value={{ userSignUp, userLogin, loadProducts, productsList }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
