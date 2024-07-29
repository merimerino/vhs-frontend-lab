import Header from '@/components/Header'
import Description from '@/components/Description'
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
      <Description/>
    </PageContainer>
  );
}

