import Header from '@/components/Header'
import Catalogue from '@/components/Catalogue'
import styled from 'styled-components'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;


export default function HomePage() {

  return (
    <PageContainer>
      <Header/>
      <Catalogue/>
    </PageContainer>
  );
}

