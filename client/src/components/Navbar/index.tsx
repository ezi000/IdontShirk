import styled from "styled-components";
import LoginButton from "../Authentication/LoginButton";
import useGetLoggedUser from "../Authentication/useGetLoggedUser";
import { useSelector } from "react-redux";
import selectUser from "../Authentication/selectUser";
import LogoImageSrc from "../icons/Logo.png";

const Navbar = () => {
  useGetLoggedUser();
  const user = useSelector(selectUser);

  return (
    <NavbarContainer>
      <Logo href="/">
        <LogoImage src={LogoImageSrc} alt="logo" />
        IdontShirk
      </Logo>
      <NavLinks>
        <NavLink>
          <a href="/">Home</a>
        </NavLink>
        <NavLink>
          <a href="/board">Board</a>
        </NavLink>
        {user.id && (
          <UserContainer>
            <UserPicture src={user.picture} />
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

const NavLinks = styled.ul`
  list-style: none;
  align-items: center;
  margin: 0;
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
