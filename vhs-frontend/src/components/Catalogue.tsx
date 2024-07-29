import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DynamicSearch from './DynamicSearch';

const CatalogueContainer = styled.div`
  padding: 2rem;
  background-color: var(--surface-s1);
  color: var(--primary-default);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const VHSItem = styled.a`
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
        //const response = await axios.get('http://localhost:3000/api/vhs');
        //setVhsData(response.data);
        setVhsData([{"id":1,"title":"12 Angry Men","description":"The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.","genre":"drama","duration":96,"releasedAt":1957,"rentalPrice":12,"rentalDuration":3,"quantity":1,"thumbnail":null},
                 {"id":2,"title":"The Shawshank Redemption","description":"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.","genre":"drama","duration":142,"releasedAt":1994,"rentalPrice":15,"rentalDuration":2,"quantity":1,"thumbnail":null},
                 {"id":3,"title":"Schindler's List","description":"In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.","genre":"drama","duration":195,"releasedAt":1993,"rentalPrice":13,"rentalDuration":2,"quantity":1,"thumbnail":null},
                 {"id":4,"title":"The Godfather","description":"The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.","genre":"crime","duration":175,"releasedAt":1972,"rentalPrice":15,"rentalDuration":3,"quantity":1,"thumbnail":null},
                 {"id":5,"title":"Pulp Fiction","description":"The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.","genre":"crime","duration":154,"releasedAt":1994,"rentalPrice":10,"rentalDuration":2,"quantity":1,"thumbnail":null},
                 {"id":6,"title":"Goodfellas","description":"The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.","genre":"crime","duration":146,"releasedAt":1990,"rentalPrice":10,"rentalDuration":3,"quantity":1,"thumbnail":null},
                 {"id":7,"title":"Seven Samurai","description":"A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves.","genre":"action","duration":207,"releasedAt":1954,"rentalPrice":8,"rentalDuration":5,"quantity":1,"thumbnail":null},
                 {"id":8,"title":"The Matrix","description":"When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.","genre":"action","duration":136,"releasedAt":1999,"rentalPrice":13,"rentalDuration":2,"quantity":1,"thumbnail":null},
                 {"id":9,"title":"Fight Club","description":"An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.","genre":"drama","duration":139,"releasedAt":1999,"rentalPrice":8,"rentalDuration":3,"quantity":1,"thumbnail":null},
                 {"id":10,"title":"Life Is Beautiful","description":"When an open-minded Jewish waiter and his son become victims of the Holocaust, he uses a perfect mixture of will, humor, and imagination to protect his son from the dangers around their camp.","genre":"comedy","duration":116,"releasedAt":1997,"rentalPrice":10,"rentalDuration":4,"quantity":1,"thumbnail":null}])      } catch (error: any) {
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
      <DynamicSearch/>
      {vhsData.map((vhs) => (
        <VHSItem key={vhs.id} href={`/vhs/${vhs.id}`}>
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
