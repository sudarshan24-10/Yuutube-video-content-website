import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
const LoadingContainer = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

const Loading = () => {
  return (
    <LoadingContainer>
        <CircularProgress></CircularProgress>
    </LoadingContainer>
  );
};

export default Loading;