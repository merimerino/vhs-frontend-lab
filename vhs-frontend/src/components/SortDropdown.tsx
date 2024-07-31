import { useState } from 'react';
import styled, { css } from 'styled-components';

interface DropdownContentProps {
  open: boolean;
}

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
`;

const DropdownButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--surface-s0);
  border: 1px solid var(--surface-s4);
  color: var(--primary-text);
  cursor: pointer;
  font-size: 1rem;
  text-align: center;

  &:hover {
    background-color: var(--surface-s4);

  }
`;
const DropdownContent = styled.div<DropdownContentProps>`
  position: absolute;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  min-width: 160px;
  z-index: 1;
  ${(props) =>
    props.open
      ? `
          display: block;
        `
      : `
          display: none;
        `}
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

interface SortDropdownProps {
  onSortChange: (sortBy: 'name' | 'year') => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange }) => {
  const [open, setOpen] = useState(false);

  const handleSortChange = (sortBy: 'name' | 'year') => {
    onSortChange(sortBy);
    setOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setOpen(!open)}>
        Sort By
      </DropdownButton>
      <DropdownContent open={open}>
        <DropdownItem onClick={() => handleSortChange('name')}>Name</DropdownItem>
        <DropdownItem onClick={() => handleSortChange('year')}>Year</DropdownItem>
      </DropdownContent>
    </DropdownContainer>
  );
};

export default SortDropdown;
