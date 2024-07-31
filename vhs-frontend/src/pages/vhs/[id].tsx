import { GetServerSideProps } from 'next';
import Header from '@/components/Header';
import VHSDetail from '@/components/VHSDetail';
import styled from 'styled-components';
import { VHSItem } from '@/models/VHSItem';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

interface VHSPageProps {
  VHSItem: VHSItem | null;
}

const VHSPage: React.FC<VHSPageProps> = ({ VHSItem }) => {
  return (
    <PageContainer>
      <Header />
      {VHSItem ? (
        <VHSDetail
          id={VHSItem.id}
          title={VHSItem.title}
          description={VHSItem.description}
          genre={VHSItem.genre}
          duration={VHSItem.duration}
          releasedAt={VHSItem.releasedAt}
          rentalPrice={VHSItem.rentalPrice}
          rentalDuration={VHSItem.rentalDuration}
          quantity={VHSItem.quantity}
          thumbnail={VHSItem.thumbnail}
        />
      ) : (
        <p>VHSItem not found.</p>
      )}
    </PageContainer>
  );
};

export const getServerSideProps: GetServerSideProps<VHSPageProps> = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const response = await fetch(`http://localhost:3000/api/vhs/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const VHSItem: VHSItem = await response.json();

    return {
      props: {
        VHSItem,
      },
    };
  } catch (error) {
    console.error('Error fetching VHS item:', error);
    return { notFound: true };
  }
};

export default VHSPage;
