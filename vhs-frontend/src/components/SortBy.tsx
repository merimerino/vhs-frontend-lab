import styled from 'styled-components';

const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items:center;
`;

const SortLabel = styled.label`
  padding-right:1rem;
`;

const SortSelect = styled.select`
  border:none;
  padding: 0.5rem;
  color: var(--primary-default);
  background-color: var(--surface-s1);
`;

interface SortByProps {
  sortOption: string;
  setSortOption: (option: string) => void;
}

const SortBy: React.FC<SortByProps> = ({ sortOption, setSortOption }) => {
  return (
    <SortContainer>
      <SortLabel htmlFor="sort">Sort by: </SortLabel>
      <SortSelect
        id="sort"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="name">Name</option>
        <option value="city">City</option>
        <option value="country">Country</option>
        <option value="status">Status</option>
      </SortSelect>
    </SortContainer>
  );
};

export default SortBy;
