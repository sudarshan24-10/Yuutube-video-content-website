import React, { useState } from 'react'
import styled from 'styled-components';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from 'react-router-dom';
import VidTube from "../img/logo.png";
import { useSelector } from "react-redux";
import Upload from './Upload';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 99;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;
const Img = styled.img`
  height: 25px;
`;

const Search = styled.div`
  width: 40%;
  position: relative;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 50px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  font-size: 17px;
  margin-left: 10px;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const SearchOutlinedIconStyled = styled(SearchOutlinedIcon)`
  cursor: pointer;
`;
const Logo = styled.div`
  margin-top:1.5rem;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
  align-self: flex-start;
  color: ${({ theme }) => theme.text};
`;



const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const handleDropdown=()=>{
    props.setShow(!props.show);
  }
    return (
      <>
      <Container>
        <Wrapper>
        {props.toggle?<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={VidTube} />
            VidTube
          </Logo>
        </Link>:<></>}
          <Search>
            <Input placeholder="Search" onChange={(e)=>{setQ(e.target.value)}}/>
            <SearchOutlinedIcon onClick={()=>navigate(`/search?q=${q}`)}/>
          </Search>
          {currentUser?(<User>
            <VideoCallOutlinedIcon  style={{cursor:"pointer",width:"2rem",height:"2rem"}} onClick={() => setOpen(true)} />
            <Avatar style={{cursor:"pointer"}} onClick={handleDropdown} src={currentUser.img} />
              {currentUser.name}
          </User>):(<Link to="signin" style={{ textDecoration: "none",order:"3" }}>
          <Button>
            <AccountCircleOutlinedIcon />
            SIGN IN
          </Button>
        </Link>)}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen}></Upload>}
      </>
    );
  };

export default Navbar