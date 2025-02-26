import React from "react";
import styled from "styled-components";
import VidTube from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// const Container = styled.div`
// max-width: 17rem ;
// background-color: ${({ theme }) => theme.bgLighter};
// height: 100vh;
// color: ${({ theme }) => theme.text};
// font-size: 14px;
// position: sticky;
// top: 0;
// display:flex;
// transfrom:translateX(${(props) => (props.$toggle ? "-80%" : "0")});
// transition: left 0.05s ease-in-out;
// `;

const Container = styled.div`
  max-width: ${(props) => (props.$toggle ? "3.5rem" : "17rem")};
  width: ${(props) => (props.$toggle ? "3.5rem" : "17rem")};
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none; /* Hide scrollbar in Firefox */
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  transition: max-width 0.3s ease, width 0.3s ease;
`;





const HoverableIcon = styled.div`
  padding: 5px 5px 5px 5px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
    cursor: pointer;
  }
`;

const ToggleOff =styled.div`
position:absolute;
top:17px;
right:12px;
height: 15rem;
display:flex;
flex-direction: column;
align-items: flex-end;
justify-content: space-between;
`

const StyledMenuIcon = styled.div`
padding: 5px 5px 5px 5px;
border-radius:20px;
&:hover {
  background-color: ${({ theme }) => theme.soft};
}
`;

const Wrapper = styled.div`
  padding: 18px 26px;
  width:12rem;
  margin-right:2rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;


const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;



const Button = styled.button`
  padding: 10px 10px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = (props) => {
  

  const {currentUser}=useSelector(state=>state.user);
  const handleToggleMenu=()=>{
    props.setToggle(!props.toggle);
}
  
  return (
    <Container $toggle={props.toggle}>
      {!props.toggle && <Wrapper>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={VidTube} />
            YuuTube
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Item>
          <HomeIcon />
          Home
        </Item>
        </Link>
        
        <Link to="/trends" style={{ textDecoration: "none", color: "inherit" }} >
        <Item>
          <ExploreOutlinedIcon />
          Explore
        </Item>
        </Link>
        <Link to="/subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
        <Item>
          <SubscriptionsOutlinedIcon />
          Subscriptions
        </Item>
        </Link>
        <Hr />
        <Link to="/library" style={{ textDecoration: "none", color: "inherit" }} >
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        </Link>
        <Link to="/history" style={{ textDecoration: "none", color: "inherit" }} >
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item></Link>
        <Hr />
        {!currentUser &&
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        }
        <Title>BEST OF YUUTUBE</Title>
        <Link to="songs" style={{ textDecoration: "none",color: "inherit" }}>
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        </Link>
        <Link to="sports" style={{ textDecoration: "none",color: "inherit" }}>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item></Link>

        <Link to="games" style={{ textDecoration: "none",color: "inherit" }}>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item></Link>
        
        <Link to="movies" style={{ textDecoration: "none",color: "inherit" }}>
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item></Link>
        
        <Link to="news" style={{ textDecoration: "none",color: "inherit" }}>
        <Item>
          <ArticleOutlinedIcon />
          News
        </Item></Link>
        
        <Link to="live" style={{ textDecoration: "none",color: "inherit" }}>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item></Link>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        <Item onClick={() => props.setDarkMode(!props.darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {props.darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>}
      <ToggleOff><StyledMenuIcon style={{cursor:"pointer"}} onClick={handleToggleMenu}><MenuIcon></MenuIcon></StyledMenuIcon>
      {props.toggle && <><Link  style={{ textDecoration: "none", color: "inherit" }} to="/"><HoverableIcon><HomeIcon></HomeIcon></HoverableIcon></Link>
      <Link style={{ textDecoration: "none", color: "inherit" }} to="trends"><HoverableIcon><ExploreOutlinedIcon></ExploreOutlinedIcon></HoverableIcon></Link>
      <Link  style={{ textDecoration: "none", color: "inherit" }} to="subscriptions"><HoverableIcon><SubscriptionsOutlinedIcon></SubscriptionsOutlinedIcon></HoverableIcon></Link></>}
      </ToggleOff>
    </Container>
  );
};

export default Menu;