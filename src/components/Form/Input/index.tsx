import { Ref } from 'react';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface IInput{
  label: string;
  type: string;
  register?: Ref<HTMLInputElement>
  
}

const Input = ({ label, type, register }:IInput) => (
  <fieldset>
    <StyledTextField label={label} type={type} ref={register} />
    <StyledParagraph fontColor='red'>Erro</StyledParagraph>
  </fieldset>
);

export default Input;
