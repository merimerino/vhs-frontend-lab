import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState } from 'react';

const DetailContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  color: var(--primary-text);
  background-color: var(--surface-s1);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--secondary-default);
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--primary-text);
`;

const Info = styled.div`
  margin-bottom: 1rem;
  color: var(--primary-variant);
`;

const Thumbnail = styled.img`
  width: 600px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 8px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: var(--surface-s1);
  background-color: var(--surface-s2);

  &:hover {
    background-color: var(--primary-variant);
  }
`;

const DeleteButton = styled(Button)`
  background-color: var(--secondary-default);

  &:hover {
    background-color: var(--surface-s3);
  }
`;

const Modal = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  background: var(--surface-s1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 8px;
  color: var(--primary-text);
`;

const ModalBackground = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

interface VHSDetailProps {
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

const VHSDetail: React.FC<VHSDetailProps> = ({
  id,
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
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/edit/${id}`);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/vhs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('VHS deleted successfully');
        router.push('/catalogue');
      } else {
        console.error('Failed to delete VHS');
      }
    } catch (error) {
      console.error('Error deleting VHS:', error);
    }

    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };
  return (
    <DetailContainer>
      {thumbnail ? (
        <Thumbnail src={thumbnail} alt={title} />
      ) : (
        <Thumbnail src="https://via.placeholder.com/600x300" alt="No image available" />
      )}
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Info><b>Genre:</b> {genre}</Info>
      <Info><b>Duration:</b> {duration} minutes</Info>
      <Info><b>Released At:</b> {releasedAt}</Info>
      <Info><b>Rental Price:</b> ${rentalPrice}</Info>
      <Info><b>Rental Duration:</b> {rentalDuration} days</Info>
      <Info><b>Quantity:</b> {quantity}</Info>
      <Button onClick={handleEdit}>Edit</Button>
      <DeleteButton onClick={handleDelete}>Delete</DeleteButton>

      <ModalBackground open={showModal} onClick={cancelDelete} />
      <Modal open={showModal}>
        <Info>Do you really want to delete this VHS?</Info>
        <Button onClick={confirmDelete}>Yes</Button>
        <Button onClick={cancelDelete}>No</Button>
      </Modal>
    </DetailContainer>
  );
};

export default VHSDetail;
