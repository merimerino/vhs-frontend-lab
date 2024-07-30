import Header from '@/components/Header'
import styled from 'styled-components'
import AddVHSForm from '@/components/AddVHSForm';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;


export default function HomePage() {

  return (
    <PageContainer>
      <Header/>
      <AddVHSForm/>
    </PageContainer>
  );
}

