import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const params = useParams();
  const id = params.id;

  // 데이터를 다른 페이지(예를 들면 detail상세페이지)에서도 동일하게 가져올 수 있다.
  const { data } = useSelector((state) => state.diary);

  // param으로 넘어오는 id값이 문자형이라 ===로 비교하면 오류가 남
  const diary = data.find((item) => item.id == id);

  return (
    <StyledMain>
      <StyledTitle>{diary.title}</StyledTitle>
      <StyledDate>{diary.createdAt}</StyledDate>
      <StyledMood>Mood: {diary.modeCode}</StyledMood>
      <StyledContent>{diary.body}</StyledContent>
    </StyledMain>
  );
};

export default Detail;

const StyledMain = styled.main`
  flex: 1;
  padding: 20px;
`;

const StyledTitle = styled.h2`
  margin-top: 0;
  font-size: 24px;
  color: #293241;
`;

const StyledDate = styled.p`
  color: #888;
  font-size: 14px;
  margin-top: 5px;
`;

const StyledMood = styled.p`
  font-size: 16px;
  margin-top: 10px;
  color: #293241;
`;

const StyledContent = styled.p`
  font-size: 16px;
  margin-top: 10px;
  color: #293241;
`;
