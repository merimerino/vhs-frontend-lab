import React from 'react';
import styled from 'styled-components';

const DetailContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  color: var(--primary-default);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--secondary-default);

`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Info = styled.div`
  margin-bottom: 1rem;
`;

const Thumbnail = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
`;

interface MovieDetailProps {
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

const MovieDetail: React.FC<MovieDetailProps> = ({
  title,
  description,
  genre,
  duration,
  releasedAt,
  rentalPrice,
  rentalDuration,
  quantity,
  thumbnail,
}) => {
  return (
    <DetailContainer>
      {thumbnail ? (
        <Thumbnail src={thumbnail} alt={title} />
      ) : (
        <Thumbnail src="https://via.placeholder.com/800x450" alt="No image available" />
      )}
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Info>Genre: {genre}</Info>
      <Info>Duration: {duration} minutes</Info>
      <Info>Released At: {releasedAt}</Info>
      <Info>Rental Price: ${rentalPrice}</Info>
      <Info>Rental Duration: {rentalDuration} days</Info>
      <Info>Quantity: {quantity}</Info>
    </DetailContainer>
  );
};

export default MovieDetail;
