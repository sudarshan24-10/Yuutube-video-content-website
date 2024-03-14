import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from "axios"
import Loading from '../utils/loading';
import ErrorComponent from '../utils/Error';
import Card from "../Components/Card";
import { Helmet } from 'react-helmet';
const Container=styled.div`
display:flex;
justify-content:space-between;
flex-wrap:wrap;
`;

const Homepage = ({type}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/video/${type}`);
        console.log('Response data:', res.data); // Log the response data
        setVideos(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message); 
        setLoading(false);
      }
    }
    fetchVideos();
  }, [type]);

  return (
    <>
    <Helmet><title>YuuTube</title></Helmet>
    <Container>
      {
        loading?<Loading></Loading>:error?<ErrorComponent></ErrorComponent>:videos ? videos.map((video)=>{
          return <Card key={video._id} video={video}></Card>
        }):<>No video Found</>
      }
    </Container>
    </>
    
  );
}

export default Homepage