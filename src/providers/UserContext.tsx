// eslint-disable-next-line no-use-before-define, import/no-duplicates
import React, { useEffect, useState } from 'react';
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

export interface IUserSignUpFormValues {
  email: string;
  password: string;
  name: string;
}

export interface IUserLoginFormValues {
  email: string;
  password: string;
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
}
export const UserContext = createContext<IUserContextData>(
  {} as IUserContextData
);

const UserProvider = ({ children }: IUserProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

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
      localStorage.setItem('@TOKEN', response.data.accessToken);
      toast.success('Bem-vindo!');
      navigate('/shop');
    } catch (error) {
      toast.error('Dados inválidos, tente novamente!');
    } finally {
      setLoading(false);
    }
  };

  // type pois não é um objeto(Interface é usada apenas para objetos)
  type UserAutoLoginFunction = () => void;

  const userAutoLogin: UserAutoLoginFunction = () => {
    const token: string | null = localStorage.getItem('@TOKEN');
    if (token) {
      navigate('shop');
    } else {
      localStorage.removeItem('@TOKEN');
    }
  };

  // o useEffect aqui é usado que a função autoLogin seja executada quando o componente é montado pela primeira vez, quando a página é carregada.
  useEffect(() => {
    userAutoLogin();
  }, []);

  const userLogout = () => {
    setUser(null);
    localStorage.removeItem('@TOKEN');
    navigate('/');
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
