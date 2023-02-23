import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface IInput{
  label: string;
  type: string;
  
}

const Input = ({ label, type }:IInput) => (
  <fieldset>
    <StyledTextField label={label} type={type} />
    <StyledParagraph fontColor='red'>Erro</StyledParagraph>
  </fieldset>
);

export default Input;
