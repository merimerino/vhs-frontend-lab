import Header from '@/components/Header';
import VHSForm from '@/components/VHSForm';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default function EditVHSPage() {
  return (
    <PageContainer>
      <Header />
      <VHSForm isEdit={true} />
    </PageContainer>
  );
}
