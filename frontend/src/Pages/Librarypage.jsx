import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FaHistory, FaListUl } from "react-icons/fa";
import axios from "axios";
import Card from "../Components/Card";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const VideoList = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;
  max-height: 350px;
  overflow-y: hidden;
  cursor: grab;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.bg};
    border-radius: 3px;
  }
`;

const PlaylistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`;

const NoContentMessage = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-top: 10px;
`;

const LibraryPage = () => {
  const [historyVideos, setHistoryVideos] = useState([]);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const videoListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const [historyRes, playlistRes] = await Promise.all([
          axios.get("/api/history/getHistory"),
          axios.get("/api/playlists/getPlaylists"),
        ]);
        setHistoryVideos(historyRes.data);
        setPlaylistVideos(playlistRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDrag = (event) => {
    event.preventDefault();
    const slider = videoListRef.current;
    let startX = event.pageX;
    let scrollLeft = slider.scrollLeft;

    const onMouseMove = (e) => {
      const walk = (e.pageX - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <Container>
      {loading ? (
        <NoContentMessage>Loading...</NoContentMessage>
      ) : error ? (
        <NoContentMessage>Error loading data</NoContentMessage>
      ) : (
        <>
          {/* History Section */}
          <Section>
            <SectionHeader>
              <FaHistory size={24} color="currentColor" />
              <Title>Watch History</Title>
            </SectionHeader>
            {historyVideos.length > 0 ? (
              <VideoList ref={videoListRef} onMouseDown={handleDrag}>
                {historyVideos.map((video) => (
                  <Card key={video._id} video={video} />
                ))}
              </VideoList>
            ) : (
              <NoContentMessage>No history videos to show</NoContentMessage>
            )}
          </Section>

          {/* Playlist Section */}
          <Section>
            <SectionHeader>
              <FaListUl size={24} color="currentColor" />
              <Title>Playlists</Title>
            </SectionHeader>
            {playlistVideos && playlistVideos.length > 0 && Array.isArray(playlistVideos)  ? (
              <PlaylistGrid>
                {playlistVideos.map((video) => (
                  <Card key={video._id} video={video} />
                ))}
              </PlaylistGrid>
            ) : (
              <NoContentMessage>No playlists to show</NoContentMessage>
            )}
          </Section>
        </>
      )}
    </Container>
  );
};

export default LibraryPage;
