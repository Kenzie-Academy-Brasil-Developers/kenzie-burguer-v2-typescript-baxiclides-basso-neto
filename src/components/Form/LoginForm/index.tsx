import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

const LoginForm = () => (
  <StyledForm>
    <Input label='email' />
    <Input />
    <StyledButton $buttonSize='default' $buttonStyle='green'>
      Entrar
    </StyledButton>
  </StyledForm>
);

export default LoginForm;
