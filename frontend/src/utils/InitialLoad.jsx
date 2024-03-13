import React from 'react';
import styled from 'styled-components';
import Loading from './loading';

const FallbackContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Dark background */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const loadPage = () => {
  return (
    <FallbackContainer>
      <Loading></Loading>
    </FallbackContainer>
  );
};

export default loadPage;