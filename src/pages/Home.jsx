import { Container, PageContainer } from "../styles/PageLayout";
import styled from "styled-components";

const Home = () => {
  return (
    <PageContainer>
      <Container style={{ padding: "1.5rem" }}>
        <ContextBox>
          <BigText>
            <b>텀블</b>을 사용해서
          </BigText>
          <SmallText>
            연간 <b>97,000원</b>을 절약할 수 있어요!
          </SmallText>
          <SmallText>
            <b>두 그루의 나무</b>를 심을 수 있어요!
          </SmallText>
        </ContextBox>
        <TreesBox>
          <TreeSkyBox></TreeSkyBox>
          <TreeGroundBox></TreeGroundBox>
        </TreesBox>

        <CalendarBox>
          <CalendarText>텀블로그</CalendarText>
        </CalendarBox>
      </Container>
    </PageContainer>
  );
};

const ContextBox = styled.div`
  margin-bottom: 18px;
`;

const BigText = styled.div`
  font-size: 18px;
`;

const SmallText = styled.div`
  margin-top: 0.2rem;
`;

const TreesBox = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;

const TreeSkyBox = styled.div`
  width: 90vw;
  height: 10rem;
  border-radius: 19px 19px 0 0;
  background: #dbf9c8;
`;

const TreeGroundBox = styled.div`
  width: 90vw;
  height: 3rem;

  border-radius: 0px 0px 10px 10px;
  background: #8d6b42;
`;

const CalendarBox = styled.div`
  margin-top: 30px;
`;

const CalendarText = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export default Home;
