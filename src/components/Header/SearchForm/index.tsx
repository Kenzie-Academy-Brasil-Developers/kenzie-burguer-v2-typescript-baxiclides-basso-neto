import { MdSearch } from 'react-icons/md';

import { useContext } from 'react';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { ShopPageContext } from '../../../providers/ShopPageContext';

const SearchForm = () => {
  const { searchTerm, handleSearch, handleChange } =
    useContext(ShopPageContext);

  return (
    <StyledSearchForm onSubmit={handleSearch}>
      <input
        type='text'
        placeholder='Digitar pesquisa'
        value={searchTerm}
        onChange={handleChange}
      />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
