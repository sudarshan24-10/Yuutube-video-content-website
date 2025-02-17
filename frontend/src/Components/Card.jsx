import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import {format} from 'timeago.js';
import { useSelector } from "react-redux";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "430px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "260px")};
  background-color: #999;
  flex: 1;
  border-radius:16px;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts =styled.div``;

const Title =styled.div`
font-size:16px;
font-weight: 500;
color: ${({ theme }) => theme.text};
`;

const ChannelName =styled.h2`
font-size: 14px;
color: ${({ theme }) => theme.textSoft};
margin: 9px 0px;
`;

const Info =styled.div`
font-size: 14px;
color: ${({ theme }) => theme.textSoft};
`;

const Card = (props) => {
  const video=props.video;
  const type=props.type;
  const [channel,setChannel] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const res = await axios.get(`/api/users/find/${video.userId}`);
        setChannel(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchChannels();
  }, [video.userId])
  const handleViews=async ()=>{
    try{
      await axios.put(`/api/videos/view/${video._id}`);
    }catch(e){
      console.log(e);
    }
  }

  const addHistoryRequest = {
    userId:currentUser._id ,
    videoId: video._id,
  }


  const handleUpdateHistory = async ()=>{
    try{
      await axios.post(`/api/history/storeHistory`,addHistoryRequest,{
        withCredentials: true,  // ✅ Allows cookies to be sent with request
      });
      // console.log(JSON.stringify(response));
    }catch(e){
      console.log(e);
    }
  }
  return (
    <Link to={`/video/${video._id}`} onClick={()=>{handleViews();handleUpdateHistory();}} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src={video.imgUrl}
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel.img}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.views} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;