import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../Components/Card";
import axios from "axios";
import Loading from "../utils/loading";
import ErrorComponent from "../utils/Error";
import { Helmet } from "react-helmet";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Homepage = ({type}) => {
  const [videos, setVideos] = useState([]);
  const [loading,setLoading]=useState(true);
  const [Error,setError]=useState(false);
  useEffect(() => {
    const fetchVideos = async () => {
      try{
        const res = await axios.get(`/api/videos/${type}`);
        setVideos(res.data);
        setLoading(false);
      }catch(e){
        setError(true);
      }
    };
    fetchVideos();
  }, [type]);

  return (
    <>
    <Helmet><title>Yuutube</title></Helmet>
    <Container>
      {loading?<Loading></Loading>:Error?<ErrorComponent></ErrorComponent>:videos.map((video)=>(
        <Card  key={video._id} video={video}></Card>
      ) 
      )}
    </Container>
    </>
  );
};

export default Homepage;