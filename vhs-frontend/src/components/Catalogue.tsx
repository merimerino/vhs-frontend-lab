import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import DynamicSearch from './DynamicSearch';
import SortDropdown from './SortDropdown';
import { VHSItem as VHSItemType } from '@/models/VHSItem';

const CatalogueContainer = styled.div`
  padding: 2rem;
  background-color: var(--surface-s1);
  color: var(--primary-text);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const VHSItem = styled.a`
  flex: 0 1 calc(20% - 1rem);
  margin: 0.5rem;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  img {
    width: 100%;
    height: auto;
  }

  .details {
    padding: 1rem;
  }

  .title {
    font-weight: bold;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .description {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 15rem;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.5rem;
`;

const AddButton = styled.a`
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  background-color: var(--secondary-default);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 1rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    background-color: var(--primary-variant);
    transform: scale(1.1);
  }
`;

const Catalogue: React.FC = () => {
  const [vhsData, setVhsData] = useState<VHSItemType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'year'>('name');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/vhs", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVhsData(data);
      } catch (error) {
        setError('Failed to fetch VHS data');
      }
    };

    fetchData();
  }, []);

  const sortedVhsData = useMemo(() => {
    return [...vhsData].sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      return (a.releasedAt > b.releasedAt ? 1 : -1);
    });
  }, [vhsData, sortBy]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <CatalogueContainer>
      <ButtonContainer>
        <AddButton href="/add-vhs">Add VHS</AddButton>
        <SortDropdown onSortChange={setSortBy} />
      </ButtonContainer>

      <DynamicSearch />
      {sortedVhsData.map((vhs) => (
        <VHSItem key={vhs.id} href={`/vhs/${vhs.id}`}>
          {vhs.thumbnail ? (
            <img src={`http://localhost:3000/${vhs.thumbnail}`} alt={vhs.title} />
          ) : (
            <PlaceholderImage>{vhs.thumbnail}</PlaceholderImage>
          )}
          <div className="details">
            <div className="title">{vhs.title}</div>
            <div className="description">{vhs.description}</div>
          </div>
        </VHSItem>
      ))}
    </CatalogueContainer>
  );
};

export default Catalogue;
