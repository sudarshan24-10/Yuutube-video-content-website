import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: ${({ theme }) => theme.bgLighter};
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 120px;
  background: ${({ theme }) => theme.primary};
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const PlaylistCard = ({ title }) => {
  return (
    <Card>
      <Thumbnail />
      <Title>{title}</Title>
    </Card>
  );
};

export default PlaylistCard;
