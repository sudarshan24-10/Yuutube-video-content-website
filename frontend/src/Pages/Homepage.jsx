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
  scrollbar-width: none;
`;

const TrendTitles = styled.div`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #ffffff;
`;

const Homepage = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);  // Set loading to true initially
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);  // Set loading true when starting the API call
        // if (type !== "getHistory") {
        //   res = await axios.get(`/api/videos/${type}`);
        // } else {
        //   res = await axios.get(`/api/history/${type}`);
        // }
        const res = await axios.get(`/api/videos/${type}`);
        setVideos(res.data);
        setLoading(false);  // Set loading false when the data is fetched
      } catch (e) {
        console.log("Error fetching videos:", e);
        setError(true);
        setLoading(false);  // Set loading false in case of error
      }
    };

    fetchVideos();
  }, [type]);
  console.log(videos);
  return (
    <>
      <Helmet>
        <title>Yuutube</title>
      </Helmet>
      {type === "trend" && (
        <TrendTitles>Trending Videos – Most Viewed & Popular Now!</TrendTitles>
      )}
      {type === "random" && (
        <TrendTitles>Checkout Videos – Watch, Discover, Enjoy!</TrendTitles>
      )}
      {type === "sub" && (
        <TrendTitles>Your Subscriptions – Latest Videos from Your Favorite Creators</TrendTitles>
      )}
      {type === "getHistory" && (
        <TrendTitles>Explore your viewing history and rewatch your favorites</TrendTitles>
      )}
      <Container>
  {loading ? (
    <Loading /> // Show loading spinner or indicator
  ) : error ? (
    <ErrorComponent /> // Show error message
  ) : videos.length > 0 ? (
    videos.map((video) => <Card key={video._id} video={video} />) // Render cards only if videos length > 0
  ) : (
    <div>No videos available</div> // Display a message if there are no videos
  )}
</Container>
    </>
  );
};

export default Homepage;
