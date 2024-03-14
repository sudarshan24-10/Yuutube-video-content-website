import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../Components/Card";
import { Helmet } from "react-helmet";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/api/videos/search${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return (
    <>
    <Helmet><title>YuuTube</title></Helmet>
     <Container>
    {videos.map(video=>(
      <Card key={video._id} video={video}/>
    ))}
  </Container>
    </>
   
  );
};

export default Search;