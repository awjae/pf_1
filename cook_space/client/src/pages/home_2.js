import React from 'react';
import styled from 'styled-components';
import mapImage from '../assets/map.jpg';
import boardImage from '../assets/boards.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Wrapper_section>
      <Link to="/map">
        <Contents_div style={{ backgroundImage: `url(${mapImage})` }}>
          <Title_div>
            지도 보기
          </Title_div>
        </Contents_div>
      </Link>
      <Link to="/boards">
        <Contents_div style={{ backgroundImage: `url(${boardImage})` }}>
          <Title_div>
            소식 보기
          </Title_div>
        </Contents_div>
      </Link>
    </Wrapper_section>
  );
};

export default Home;

const Wrapper_section = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10%;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Contents_div = styled.div`
  width: 35vw;
  height: 30vw;
  background-repeat: round;
  position: relative;
  border-radius: 2vw;
  box-shadow: 0 0 8px #00000040;
  @media only screen and (max-width: 768px) {
    width: 70vw;
    height: 60vw;
    margin-bottom: 5vw;
  }
`;

const Title_div = styled.header`
  position: absolute;
  bottom: 0;
  font-size: 5vw;
  color: #ffffff;
  text-align: center;
  width: 100%;
  padding: 1vw 0;
  background-color: #009688d6;
  border-radius: 0 0 2vw 2vw;
  @media only screen and (max-width: 768px) {
    padding: 3vw 0;
    font-size: 8vw;
  }
`;