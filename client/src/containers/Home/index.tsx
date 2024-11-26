import styled from "styled-components";
import Timer from "../../components/Timer";

const Home = () => {
  return (
    <BodyWrapper>
      <Timer />
    </BodyWrapper>
  );
};

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Home;
