import styled from "styled-components";
import LoginButton from "../Authentication/LoginButton";
import useGetLoggedUser from "../Authentication/useGetLoggedUser";
import { useSelector } from "react-redux";
import selectUser from "../Authentication/selectUser";

const Navbar = () => {
  useGetLoggedUser();
  const user = useSelector(selectUser);

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
        <NavLink>
          <a href="/tasks">Tasks</a>
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
  position: sticky;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 8px 32px;
  background-color: #191c1fc6;
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
