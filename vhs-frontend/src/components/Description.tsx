import styled from 'styled-components';

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--surface-s1);
  flex: 1;
`;

const BigLogo = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 16rem;
    margin-right: 2rem;
  }
`;

const Description = styled.p`
  width: 28rem;
  font-size: 20px;
  color: var(--primary-text);
  margin: 0;
  font-weight: lighter;

  span {
    color: var(--primary-variant);
  }
`;

const Header = () => {
  return (
    <DescriptionContainer>
      <BigLogo>
        <img src="/vhs-logo.svg" alt="Logo" />
      </BigLogo>
      <Description>
      Welcome to the V<span>H</span>S Catalogue, your ultimate destination for an extensive selection of VHS tapes available for rent. 
      Explore our diverse collection and discover the perfect tapes to suit every taste and occasion.
      </Description>
    </DescriptionContainer>
  );
};

export default Header;
