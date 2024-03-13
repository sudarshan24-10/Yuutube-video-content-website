import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

const ErrorHeading = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: grey;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: grey;
`;

const ErrorComponent = ({ message }) => {
  return (
    <ErrorContainer>
      <ErrorHeading>Error</ErrorHeading>
      <ErrorMessage>{message}</ErrorMessage>
    </ErrorContainer>
  );
};

export default ErrorComponent;
