import React from 'react'
import styled from 'styled-components'
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess, logout } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import {auth,provider} from "../firebase";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const Container = styled.div`
  margin-top:0.5rem;
  position: fixed;
  top: 50px;
  right: 50px;
  width: 15rem;
  max-height: 20rem;
  z-index:1000;
  background-color: ${({ theme }) => theme.bgLighter};
`;


const Wrapper = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
const EditAccount = styled.div`
  font-size:20px;
  margin-top: 20px;
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  gap:1rem;
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
    cursor: pointer;
    color: blue;
  }
`;

const SwitchAccount = styled.div`
  font-size:20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  width:100%;
  gap:7px;
  color: ${({ theme }) => theme.text};
  &:hover {
    background-color: ${({ theme }) => theme.soft};
    cursor: pointer;
    color: blue;
  }
`;


const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
  width:12rem;
  
`;

const Logout = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size:20px;
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  gap:1rem;
  margin-bottom:1rem;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
    cursor: pointer;
    color: blue;
  }
`;

const UserDropdown = (props) => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const signInWithGoogle = async () => {
    navigate("/signin");
  };
  

  const handleLogout=()=>{
    dispatch(logout());
    props.setShow(false);
  };
  return (
    <Container>
      <Wrapper>
        <Link to="account_overview">
        <EditAccount >
          <EditIcon></EditIcon>
          Edit Account
        </EditAccount></Link>
        <Hr></Hr>
        <SwitchAccount onClick={signInWithGoogle}>
          <SwitchAccountIcon></SwitchAccountIcon>
          SwitchAccount
        </SwitchAccount>
        <Hr></Hr>
        <Logout onClick={handleLogout}>
          <LogoutIcon></LogoutIcon>Logout</Logout>
      </Wrapper>
    </Container>
  )
}

export default UserDropdown;