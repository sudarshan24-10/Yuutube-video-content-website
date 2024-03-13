import React, { Suspense, useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from "axios"
import Loading from '../utils/loading';
import ErrorComponent from '../utils/Error';

const Container=styled.div`
display:flex;
justify-content:space-between;
flex-wrap:wrap;
`;

const Homepage = ({type}) => {

  const [O,setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Card = React.lazy(()=> import("../Components/Card"))

  useEffect(()=>{
    const fetchVideos = async()=>{
      try{
        const res= await axios.get(`/video/${type}`);
        setVideos(res.data);
        setLoading(false);
      }catch(err){
        console.log(err.message);
        setError(err.message); 
        setLoading(false);
      }
    }
    fetchVideos();
  },[type])
  return (
    <Container>
          {loading?(
          <Loading></Loading>
          ) : error ? (
            <ErrorComponent></ErrorComponent>
          ) :(O.map((video)=>{
            return <Suspense fallback="...loading"><Card key={video._id} video={video}></Card></Suspense>
          }))}
    </Container>
  )
}

export default Homepage