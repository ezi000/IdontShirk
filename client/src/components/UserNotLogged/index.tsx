import styled from "styled-components";

const UserNotLogged = () => {
  return (
    <BodyWrapper>
      <h1>Not Logged In</h1>
      <p>Please log in to continue</p>
    </BodyWrapper>
  );
};

export const BodyWrapper = styled.div`
  display: flex;
  margin-top: 64px;
  flex-direction: column;
  align-items: center;
  gap: 64px;
`;

export default UserNotLogged;
