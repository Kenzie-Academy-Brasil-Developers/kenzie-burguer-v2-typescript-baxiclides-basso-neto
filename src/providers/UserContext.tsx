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

interface IUserLoginFormValues {
  name: string;
  email: string;
}

interface IUserSignUpFormValues {
  email: string;
  password: string;
  name: string;
}

interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface IUserProviderProps {
  children: ReactNode;
}

// Interface para exportar todos os dados que vão no value
interface IUserContextData {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | null;
  userSignUp: (data: IUserSignUpFormValues) => Promise<void>;
  userLogin: (data: IUserLoginFormValues) => Promise<void>;
  userLogout: () => void;
  loadProducts: () => Promise<void>;
  productsList: IProduct[];
  token: string | null;
}

export const UserContext = createContext<IUserContextData>(
  {} as IUserContextData
);

const UserProvider = ({ children }: IUserProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const navigate = useNavigate();
  const token: string | null = localStorage.getItem('@TOKEN');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const userSignUp = async (data: IUserSignUpFormValues) => {
    try {
      await api.post('users', data);
      toast.success('Cadastrado com sucesso!');
      navigate('/');
    } catch (error) {
      toast.error('Dados inválidos, tente novamente!');
    }
  };

  const userLogin = async (data: IUserLoginFormValues) => {
    try {
      setLoading(true);
      const response = await api.post('login', data);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.acessToken);
      toast.success('Bem-vindo!');
      navigate('/shop');
    } catch (error) {
      toast.error('Dados inválidos, tente novamente!');
    } finally {
      setLoading(false);
    }
  };

  const userLogout = () => {
    setUser(null);
    localStorage.removeItem('@TOKEN');
    navigate('/');
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
      value={{
        loading,
        setLoading,
        user,
        userSignUp,
        userLogin,
        userLogout,
        loadProducts,
        productsList,
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
