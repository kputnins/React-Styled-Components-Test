import React from 'react';
import styled from 'styled-components';
import reactImage from '../../../img/react.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IMG = styled.img`
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  width: 300px;
  height: 300px;
  animation: rotation 25s infinite linear;
`;

const HomePage = () => {
  return (
    <Container>
      <h1>Single-page-app using React</h1>
      <IMG src={reactImage} alt="React logo" />
      <h2>With styled-components</h2>
      <h2>And JSON-server</h2>
    </Container>
  );
};

export default HomePage;
