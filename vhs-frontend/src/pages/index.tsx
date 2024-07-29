import Header from '@/components/Header'
import { useEffect } from 'react';
import { VHSItem } from '@/models/VHSItem';
import Description from '@/components/Description'
import styled from 'styled-components'
import axios from 'axios';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;


export default function HomePage() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<VHSItem[]>('http://localhost:3000/api/vhs');
        console.log(response.data)
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, []);

  return (
    <PageContainer>
      <Header/>
      <Description/>
    </PageContainer>
  );
}

