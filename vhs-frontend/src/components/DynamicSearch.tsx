import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: var(--surface-s2);
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
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: var(--primary-text);

  &:hover {
    background-color: var(--surface-s);
  }
`;

const Error = styled.p`
  color: red;
  margin: 1rem 0;
`;

const DynamicSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [allVHS, setAllVHS] = useState<any[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<any[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3000/api/vhs');
        if (!response.ok) {
          setError('Response not ok');
        }
        const data = await response.json();
        setAllVHS(data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const results = allVHS.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOptions(results);
      setShowOptions(results.length > 0);
    } else {
      setFilteredOptions([]);
      setShowOptions(false);
    }
  }, [searchQuery, allVHS]);

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
      {loading && <p>Loading...</p>}
      {error && <Error>{error}</Error>}
      <OptionsList showOptions={showOptions}>
        {filteredOptions.map((movie: any) => (
          <OptionItem key={movie.id} onClick={() => handleOptionClick(movie.id)}>
            {movie.title}
          </OptionItem>
        ))}
      </OptionsList>
    </Container>
  );
};

export default DynamicSearch;
