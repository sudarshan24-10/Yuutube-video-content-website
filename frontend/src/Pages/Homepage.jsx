import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../Components/Card";
import axios from "axios";
import Loading from "../utils/loading";
import ErrorComponent from "../utils/Error";
import { Helmet } from "react-helmet";


const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  scrollbar-width:none;
`;

const TrendTitles = styled.div`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color:#FFFFFF;
`;


const Homepage = ({type}) => {
  const [videos, setVideos] = useState([]);
  const [loading,setLoading]=useState(true);
  const [Error,setError]=useState(false);
  useEffect(() => {
    const fetchVideos = async () => {
      let res = null;
      try{
        if (type!=="getHistory") {
          res = await axios.get(`/api/videos/${type}`);
        }else{
          res = await axios.get(`/api/history/${type}`);
        }
        console.log(res.data);
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
    {type==='trend' && <TrendTitles>Trending Videos – Most Viewed & Popular Now!</TrendTitles>}
    {type==='random' && <TrendTitles>Checkout Videos – Watch, Discover, Enjoy!</TrendTitles>}
    {type==='sub' && <TrendTitles>Your Subscriptions – Latest Videos from Your Favorite Creators</TrendTitles>}
    {type==='getHistory' && <TrendTitles>Explore your viewing history and rewatch your favorites</TrendTitles>}
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