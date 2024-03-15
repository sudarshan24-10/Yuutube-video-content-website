import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({tags,currentVideoId}) => {
  const [videos,setVideos]=useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const res=await axios.get(`/api/videos/tags?tags=${tags}`);
      const updatedData = res.data.filter((obj)=>
        obj._id!==currentVideoId
      );
      setVideos(updatedData);
    };
    fetchVideos();
  }, [tags,currentVideoId]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;