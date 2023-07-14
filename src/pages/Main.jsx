import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { __getDiaries } from '../redux/modules/diarySlice';

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [diary, setDiary] = useState([]);

  // 최초에 한번만. db의 데이터를 리덕스에 넣어주는 코드
  useEffect(() => {
    const fetchData = async () => {
      // const response = await axios.get('http://localhost:4000/diary')
      // setDiary(response.data);

      // 청크 이용하기
      dispatch(__getDiaries());
    };

    fetchData();
  }, []);

  // "리덕스에 들어있는 데이터"를 가져와서 쓸 거
  // state만 return 해주는게 아니라 state안의 diary를 리턴해줘야 함
  // configStore에서 리듀서를 {diary: diary}의 모양으로 넣어놨기 때문에 시킨대로 뱉은것 뿐
  const { data, isLoading, isError, error } = useSelector((state) => state.diary);

  // 쟉스 부분은 데이터를 다 가지고 온 다음에 처리 해주는게 좋음
  // 예외 사항이 생기면 밑으로 안흐르면서 문제가 안생길 수 있게 함
  if (isLoading) {
    return <h1>아직 로딩중이에요..!</h1>;
  }

  if (isError) {
    return <h1>오류가 발생했어요!</h1>;
  }

  const handleDiaryItemClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <StyledMain>
      {data.map((_, index) => (
        <StyledDiaryBox
          key={index}
          onClick={() => {
            handleDiaryItemClick(item.id);
          }}
        >
          <StyledTitle>Diary {index + 1}</StyledTitle>
          <StyledDate>July 7, 2023</StyledDate>
        </StyledDiaryBox>
      ))}
    </StyledMain>
  );
};

export default Main;

const StyledMain = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 0.5fr));
  grid-gap: 20px;
  padding: 20px;
`;

const StyledDiaryBox = styled.div`
  padding: 20px;
  background-color: #dbe9f6;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const StyledTitle = styled.h2`
  margin-top: 0;
  font-size: 18px;
  font-weight: bold;
  color: #293241;
`;

const StyledDate = styled.p`
  color: #888;
  font-size: 14px;
  margin-top: 5px;
`;
