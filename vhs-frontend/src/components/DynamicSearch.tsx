import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// Mock data
const mockData = [
  { id: 1, title: "12 Angry Men" },
  { id: 2, title: "The Shawshank Redemption" },
  { id: 3, title: "Schindler's List" },
  { id: 4, title: "The Godfather" },
  { id: 5, title: "Pulp Fiction" },
  { id: 6, title: "Goodfellas" },
  { id: 7, title: "Seven Samurai" },
  { id: 8, title: "The Matrix" },
  { id: 9, title: "Fight Club" },
  { id: 10, title: "Life Is Beautiful" },
];

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
    background-color: var(--surface-s2);
  }
`;

const DynamicSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<any[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery) {
      const results = mockData.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOptions(results);
      setShowOptions(results.length > 0);
    } else {
      setFilteredOptions([]);
      setShowOptions(false);
    }
  }, [searchQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleOptionClick = (id: number) => {
    router.push(`/vhs/${id}`);
  };

  return (
    <Container>
      <SearchInput
        type="text"
        id="searchBox"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Type here to search..."
      />
      <OptionsList showOptions={showOptions}>
        {filteredOptions.map((movie) => (
          <OptionItem key={movie.id} onClick={() => handleOptionClick(movie.id)}>
            {movie.title}
          </OptionItem>
        ))}
      </OptionsList>
    </Container>
  );
};

export default DynamicSearch;
