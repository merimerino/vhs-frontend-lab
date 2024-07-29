import styled from 'styled-components';


const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: var(--primary-variant);
  }
`;

interface OptionsListProps {
  showOptions: boolean;
}

const OptionsList = styled.ul<OptionsListProps>`
  list-style-type: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  background-color: var(--surface-s1);
  z-index: 10;
  display: ${(props) => (props.showOptions ? 'block' : 'none')};

`;

const OptionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: var(--primary-text);

  &:hover {
    background-color: var(--surface-s3);
  }

`;

const DynamicSearch: React.FC = () => {

  return (
    <Container>
      <SearchInput
        type="text"
        id="searchBox"
        
        placeholder="Type here to search..."
      />

    </Container>
  );
};

export default DynamicSearch;
