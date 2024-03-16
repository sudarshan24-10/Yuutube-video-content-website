import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import VidTube from "../img/logo.png";
import { useSelector } from "react-redux";
import Upload from './Upload';
import axios from 'axios';
import Loading from "../utils/loading";
import useDebounce from '../customHooks/useDebounceHook.js';


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
  justify-content: space-between;
`;
const Img = styled.img`
  height: 25px;
`;

const Search = styled.div`
  width: 30%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 50px;
  margin-top: -15px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
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

const DropDownSearch = styled.div`
    max-height:30rem;
    background-color: ${({ theme }) => theme.bgLighter};
    width: 29%;
    position: absolute;
    left: 0px;
    right: 0px;
    margin: auto;
    display: flex;
    padding: 10px;
    border-radius: 20px;
    margin-top:25px;
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
`;

const SearchDiv= styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items:center;
  gap:5px;
`;

const Title=styled.div`
cursor: pointer;
&:hover {
  text-decoration: underline;
}
pointer-events: auto; /* Add this line */
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
  const [Dsearch,setDsearch]=useState([]);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const Dq=useDebounce(q,1000);
  const dropDownRef=useRef(null);
  const location = useLocation();
  const currentUrl = location.pathname + location.search + location.hash;

  useEffect(()=>{
      setQ("");
  },[currentUrl])
  
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await axios.get("/api/videos/titles", {
          params: { q: Dq },
        });
        const filteredTitles = response.data.filter((title) =>
          title.toLowerCase().includes(Dq.toLowerCase())
        );
        setDsearch(filteredTitles);
      } catch (e) { 
        console.log(e.message);
      }
    };

    

    if (Dq !== "") {
      fetchTitles();
    } else {
      setDsearch([]);
    }
  }, [Dq]);

  const handleInputchange=(e)=>{
    setQ(e.target.value);
  }

  const handleDropdown=()=>{
    props.setShow(!props.show);
  }

  const dropDownhandler=(result)=>{
    setQ(result);
    setShowDropdown(false);
    navigate(`/search?q=${result}`);
  } 

  const handleOutsideClick=(e)=>{
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  }

  useEffect(()=>{
    document.addEventListener("click",handleOutsideClick,true);

    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  },[])

    return (
      <>
      <Container>
        <Wrapper>
        {props.toggle?<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={VidTube} />
            YuuTube
          </Logo>
        </Link>:<></>}
          <SearchDiv ref={dropDownRef}>
          <Search>
            <Input value={q} onFocus={() => setShowDropdown(true)} placeholder="Search" onChange={(e)=>{handleInputchange(e)}}/>
            <SearchOutlinedIcon style={{cursor:"pointer"}} onClick={()=>navigate(`/search?q=${q}`)}/>
          </Search>
          {showDropdown &&Dsearch.length>0 && <DropDownSearch >{Dsearch?Dsearch.map((result,i)=><Title  onClick={()=>{dropDownhandler(result)}} key={i}>{result}</Title>):<Loading></Loading>}</DropDownSearch>}
          
          </SearchDiv>
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