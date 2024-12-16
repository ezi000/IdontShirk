import styled from "styled-components";
import LoginButton from "../Authentication/LoginButton";
import useGetLoggedUser from "../Authentication/useGetLoggedUser";
import { useSelector } from "react-redux";
import selectUser from "../Authentication/selectUser";
import LogoImageSrc from "../icons/Logo.png";
import { NavLink } from "react-router";

const Navbar = () => {
  useGetLoggedUser();
  const user = useSelector(selectUser);

  return (
    <NavbarContainer>
      <Logo to="/">
        <LogoImage src={LogoImageSrc} alt="logo" />
        IdontShirk
      </Logo>
      <NavLinks>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/board">Board</StyledNavLink>
        {user.id && (
          <UserContainer>
            <UserPicture src={user.picture} loading="lazy" alt="user picture" />
            <UserName>{user.name}</UserName>
          </UserContainer>
        )}
        <LoginButton user={user} />
      </NavLinks>
    </NavbarContainer>
  );
};

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f5cc5c1c;
  padding: 8px 16px;
  border-radius: 32px;
`;

const UserPicture = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;

const UserName = styled.div`
  color: #fff;
`;

const Logo = styled(NavLink)`
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
  position: fixed;
  width: 100%;
  z-index: 1000;
  justify-content: space-between;
  align-items: center;
  padding: 8px 32px;
  background-color: #191c1fc6;
  backdrop-filter: blur(10px);
  color: #fff;
`;

const NavLinks = styled.div`
  align-items: center;
  margin: 0;
  display: flex;
  gap: 16px;
`;

const StyledNavLink = styled(NavLink)`
  color: #fff;
`;

export default Navbar;
