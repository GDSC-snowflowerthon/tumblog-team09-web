import { useState } from "react";
import { Container, PageContainer } from "../styles/PageLayout";
import styled from "styled-components";
import Calendar from "../components/Calendar/Calendar";
import Modal from "../components/Modal/Modal";
import { useAtom } from "jotai";
import { modalState } from "../atoms/modalState";
import { Icon } from "@iconify/react";
import COLORS from "../styles/colors";
import Diary from "../components/Diary";

const Home = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useAtom(modalState);
  const [isSecondOpen, setIsSecond] = useState(false);
  const [sizeState, setSizeState] = useState([true, false, false]);
  const [imgSrc, setImgSrc] = useState(null);
  const size = ["S", "M", "L"];

  const handleEnroll = () => {
    // TODO: 등록 api 연결하기
  };

  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImgSrc(reader.result || null);
        resolve();
      };
    });
  };

  return (
    <>
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

          <CalendarText>텀블로그</CalendarText>
          <CalendarWrapper>
            <Calendar
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </CalendarWrapper>
          <DiaryHeaderBox>
            <CalendarText>
              {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일의 텀블
            </CalendarText>
            <Icon
              style={{ marginTop: "30px", marginLeft: "auto" }}
              icon="ic:baseline-edit"
              color="#64a25a"
            />
          </DiaryHeaderBox>
          {/** TODO: date api 연결 */}
          <Diary />
        </Container>
      </PageContainer>
      {isOpen && (
        <>
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isSecond={isSecondOpen}
            setIsSecond={setIsSecond}
            buttonTxt={"다음"}
          >
            <TitleBox>영수증 인식</TitleBox>
            <ExplainBox>
              촬영한 영수증에서 날짜, 메뉴, 사이즈, 할인금액을 추출해
              <br />
              자동으로 입력해요!
            </ExplainBox>
            {imgSrc !== null ? (
              <>
                <ImageUploadBox>
                  <img width={"100%"} src={imgSrc} alt="영수증 사진" />
                </ImageUploadBox>
                <CustomFileInput>
                  <label for="file">재선택</label>
                  <input
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={(e) => onUpload(e)}
                    id="file"
                  />
                </CustomFileInput>
              </>
            ) : (
              <ImageUploadBox>
                <label for="file">
                  <Icon icon="solar:camera-bold" width="28" />
                </label>
                <input
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={(e) => onUpload(e)}
                  id="file"
                />
              </ImageUploadBox>
            )}
          </Modal>
        </>
      )}
      {isSecondOpen && (
        <>
          <Modal
            isOpen={isSecondOpen}
            setIsOpen={setIsSecond}
            buttonTxt={"등록하기"}
            btnFunc={handleEnroll}
          >
            <TitleBox>이 정보가 맞나요?</TitleBox>
            <ExplainBox>
              OCR을 사용하여 영수증에서 추출한 정보들을 토대로
              <br />
              자동으로 입력한 정보에요!
            </ExplainBox>
            <InfoBox style={{ marginTop: "25px" }}>
              <InfoTitleBox>날짜</InfoTitleBox>
              <InfoInput type="text"></InfoInput>
            </InfoBox>
            <InfoBox>
              <InfoTitleBox>메뉴</InfoTitleBox>
              <InfoInput type="text"></InfoInput>
            </InfoBox>
            <InfoBox>
              <InfoTitleBox>사이즈</InfoTitleBox>
              <SizeBox>
                {size.map((el, idx) => {
                  return (
                    <SizeBtn
                      state={sizeState[idx]}
                      onClick={() => {
                        const newSizeState = sizeState.map((state, i) =>
                          i === idx ? true : false
                        );
                        setSizeState(newSizeState);
                      }}
                    >
                      {el}
                    </SizeBtn>
                  );
                })}
              </SizeBox>
            </InfoBox>
            <InfoBox style={{ marginBottom: "30px" }}>
              <InfoTitleBox>할인 금액</InfoTitleBox>
              <InfoInput type="text"></InfoInput>
            </InfoBox>
          </Modal>
        </>
      )}
    </>
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

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;

const CalendarText = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const TitleBox = styled.div`
  font-size: 18px;
  font-weight: 700;
`;
const ExplainBox = styled.div`
  margin-top: 0.5rem;
  color: #8c8c8c;
  font-size: 12px;
  font-weight: 400;
`;
const ImageUploadBox = styled.div`
  background-color: #d9d9d9;
  width: 159px;
  height: 159px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
  overflow: hidden;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const InfoTitleBox = styled.div`
  width: 72px;
  font-size: 15px;
  font-weight: 600;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;
const InfoInput = styled.input`
  border: none;
  border-bottom: 1px solid #c6c6c6;
  width: 40vw;
  font-size: 13px;

  :focus {
    outline: none;
    border: none;
  }
`;
const SizeBtn = styled.div`
  width: 47px;
  height: 29px;
  border-radius: 20px;
  border: 1px solid ${COLORS.mainColor};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.state ? "white" : COLORS.mainColor)};
  background-color: ${(props) => (props.state ? COLORS.mainColor : "none")};
  font-size: 15px;
  font-weight: ${(props) => (props.state ? "600" : "500")};
`;

const SizeBox = styled.div`
  width: 40vw;
  display: flex;
  justify-content: space-between;
`;

const DiaryHeaderBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const CustomFileInput = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  color: ${COLORS.mainColor};
  margin-bottom: 10px;
  margin-top: -10px;
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }

  label {
    text-decoration: underline;
    text-underline-position: under;
  }
`;

export default Home;
