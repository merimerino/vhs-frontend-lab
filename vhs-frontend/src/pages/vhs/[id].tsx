import { GetServerSideProps } from 'next';
import Header from '@/components/Header';
import MovieDetail from '@/components/MovieDetail';
import styled from 'styled-components';
import { Movie } from '@/models/Movie';

const mockData = [
  { id: 1, title: "12 Angry Men", description: "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.", genre: "drama", duration: 96, releasedAt: 1957, rentalPrice: 12, rentalDuration: 3, quantity: 1, thumbnail: null },
  { id: 2, title: "The Shawshank Redemption", description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", genre: "drama", duration: 142, releasedAt: 1994, rentalPrice: 15, rentalDuration: 2, quantity: 1, thumbnail: null },
  { id: 3, title: "Schindler's List", description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.", genre: "drama", duration: 195, releasedAt: 1993, rentalPrice: 13, rentalDuration: 2, quantity: 1, thumbnail: null },
  { id: 4, title: "The Godfather", description: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.", genre: "crime", duration: 175, releasedAt: 1972, rentalPrice: 15, rentalDuration: 3, quantity: 1, thumbnail: null },
  { id: 5, title: "Pulp Fiction", description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", genre: "crime", duration: 154, releasedAt: 1994, rentalPrice: 10, rentalDuration: 2, quantity: 1, thumbnail: null },
  { id: 6, title: "Goodfellas", description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.", genre: "crime", duration: 146, releasedAt: 1990, rentalPrice: 10, rentalDuration: 3, quantity: 1, thumbnail: null },
  { id: 7, title: "Seven Samurai", description: "A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves.", genre: "action", duration: 207, releasedAt: 1954, rentalPrice: 8, rentalDuration: 5, quantity: 1, thumbnail: null },
  { id: 8, title: "The Matrix", description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.", genre: "action", duration: 136, releasedAt: 1999, rentalPrice: 13, rentalDuration: 2, quantity: 1, thumbnail: null },
  { id: 9, title: "Fight Club", description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.", genre: "drama", duration: 139, releasedAt: 1999, rentalPrice: 8, rentalDuration: 3, quantity: 1, thumbnail: null },
  { id: 10, title: "Life Is Beautiful", description: "When an open-minded Jewish waiter and his son become victims of the Holocaust, he uses a perfect mixture of will, humor, and imagination to protect his son from the dangers around their camp.", genre: "comedy", duration: 116, releasedAt: 1997, rentalPrice: 10, rentalDuration: 4, quantity: 1, thumbnail: null },
];

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;



interface MoviePageProps {
  movie: Movie | null;
}

const MoviePage: React.FC<MoviePageProps> = ({ movie }) => {
  return (
    <PageContainer>
      <Header />
      {movie ? (
        <MovieDetail
          title={movie.title}
          description={movie.description}
          genre={movie.genre}
          duration={movie.duration}
          releasedAt={movie.releasedAt}
          rentalPrice={movie.rentalPrice}
          rentalDuration={movie.rentalDuration}
          quantity={movie.quantity}
          thumbnail={movie.thumbnail}
        />
      ) : (
        <p>Movie not found.</p>
      )}
    </PageContainer>
  );
};

export const getServerSideProps: GetServerSideProps<MoviePageProps> = async (context) => {
  const { id } = context.params as { id: string };

  const movie = mockData.find((item) => item.id === parseInt(id));

  if (!movie) {
    return { notFound: true };
  }

  return {
    props: {
      movie,
    },
  };
};

export default MoviePage;
