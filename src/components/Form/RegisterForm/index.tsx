import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { useForm } from 'react-hook-form';

interface IUserRegister{
  email: string;
  password: string;
  name: string
}

const RegisterForm = () => {

  const { register, handleSubmit } = useForm<IUserRegister>()

  // const userRegister = (data:IUserRegister)=>{
  //   data.
  // }

  return(
  <StyledForm>
    <Input label='nome' />
    <Input />
    <Input />
    <Input />
    <StyledButton $buttonSize='default' $buttonStyle='gray'>
      Cadastrar
    </StyledButton>
  </StyledForm>
);
  }

export default RegisterForm;
