import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const CatalogueContainer = styled.div`
  padding: 2rem;
  background-color: var(--surface-s1);
  color: var(--primary-default);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const VHSItem = styled.div`
  flex: 0 1 calc(25% - 1rem); /* 4 items per row with some gap */
  margin: 0.5rem;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

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
  }

  .description {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.5rem;
`;

interface VHS {
  id: number;
  title: string;
  description: string;
  genre: string;
  duration: number;
  releasedAt: number;
  rentalPrice: number;
  rentalDuration: number;
  quantity: number;
  thumbnail: string | null;
}

const Catalogue: React.FC = () => {
  const [vhsData, setVhsData] = useState<VHS[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/vhs');
        setVhsData(response.data);
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching the VHS data', error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <CatalogueContainer>
      {vhsData.map((vhs) => (
        <VHSItem key={vhs.id}>
          {vhs.thumbnail ? (
            <img src={vhs.thumbnail} alt={vhs.title} />
          ) : (
            <PlaceholderImage>No Image</PlaceholderImage>
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
