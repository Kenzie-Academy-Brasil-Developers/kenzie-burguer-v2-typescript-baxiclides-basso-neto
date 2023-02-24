import { useForm } from 'react-hook-form';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { useContext } from 'react';

interface IUserRegister{
  email: string;
  password: string;
  name: string

}

const RegisterForm = () => {

  const {} = useContext({})

  const { register, handleSubmit } = useForm<IUserRegister>()

const onSubmit = (data: IUserRegister) =>{
  // eslint-disable-next-line no-console
  console.log(data)
}

  return(
  <StyledForm onSubmit={handleSubmit(onSubmit)}>
    <Input label='email' type='text' {...register('email')} />
    <Input label='password' type='password' {...register('password')} />
    <Input label='nome' type='text' {...register('name')} />
    <Input label='nome' type='password' />
    <StyledButton type='submit' $buttonSize='default' $buttonStyle='gray'>
      Cadastrar
    </StyledButton>
  </StyledForm>
);
  }

export default RegisterForm;
