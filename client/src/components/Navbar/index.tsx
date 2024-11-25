import styled from "styled-components";
import LoginButton from "../Authentication/LoginButton";

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo href="/">
        <LogoImage src="logo.png" alt="logo" />
        IdontShirk
      </Logo>
      <NavLinks>
        <NavLink>
          <a href="/home">Home</a>
        </NavLink>
        <LoginButton />
      </NavLinks>
    </NavbarContainer>
  );
};

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  color: #f5cb5c;
`;

const LogoImage = styled.img`
  width: 48px;
  height: 48px;
`;

const NavbarContainer = styled.nav`
  display: flex;
  position: sticky;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  background-color: #212529c7;
  color: #fff;
`;

const NavLinks = styled.ul`
  list-style: none;
  align-items: center;
  display: flex;
  gap: 1rem;
`;

const NavLink = styled.li`
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Navbar;
