import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../Components/Card";
import axios from "axios";
import Loading from "../utils/loading";
import ErrorComponent from "../utils/Error";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

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

const MessageContainer = styled.div`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: rgb(255, 255, 255);
`;

const Homepage = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        let res = null;
        if (type !== "getHistory") {
          res = await axios.get(`/api/videos/${type}`);
        } else {
          res = await axios.get(`/api/history/${type}`);
        }
        setVideos(res.data);
        setLoading(false);
      } catch (e) {
        console.log("Error fetching videos:", e);
        setError(true);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [type]);


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
          <Loading />
        ) : error ? (
          <ErrorComponent />
        ) : type === "getHistory" || type === "sub" ? (
          currentUser ? (
            videos.length > 0 ? (
              videos.map((video) => <Card key={video._id} video={video} />)
            ) : (
              <MessageContainer>No videos found in {type === "getHistory" ? "your history" : "your subscriptions"}</MessageContainer>
            )
          ) : (
            <MessageContainer>
              Please log in to view {type === "getHistory" ? "your history" : "your subscriptions"}:{" "}
              <Link to="/signin">Login</Link>
            </MessageContainer>
          )
        ) : videos.length > 0 ? (
          videos.map((video) => <Card key={video._id} video={video} />)
        ) : (
          <MessageContainer>No videos available</MessageContainer>
        )}
      </Container>
    </>
  );
};

export default Homepage;
