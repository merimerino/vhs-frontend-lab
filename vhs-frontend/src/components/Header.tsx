import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content:space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--surface-s1);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 4rem;
    margin-right: 0.5rem;
  }

  h1 {
    font-size: 24px;
    color: var(--surface-s2);
    margin: 0;
    font-weight: lighter;

    span {
      color: var(--primary-variant);
    }
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;


  a {
    text-decoration: none;
    color: var(--primary-text);
    font-size: 16px;
    transition: transform 0.3s ease;


    &:hover {
      transform: scale(1.2);
    }
  }
`;

const Empty = styled.div`
  visibility:hidden;
  width:5rem;
`;

const Header = () => {

  return (
    <HeaderContainer>
      <Logo>
        <a href="/"><img src="/vhs-logo.svg" alt="Logo" /></a>
        <a href="/"><h1>V<span>H</span>S</h1></a>
      </Logo>
      <NavLinks>
        <a href="/">Home</a>
        <a href="/catalogue">Catalogue</a>
        
      </NavLinks>
      <Empty/>
    </HeaderContainer>
  );
};

export default Header;
