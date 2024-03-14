import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Visibility from "@mui/icons-material/Visibility";
import { loginStart,loginFailure,loginSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { signInWithRedirect } from "firebase/auth";
import {auth,provider} from "../firebase";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
width:30rem;
gap:10px;
padding: 20px;
align-items: center;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding:10px;
  background-color: transparent;
  width: 15rem;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const PasswordToggle = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  transform: translateX(17px);
`;

const ToggleButton1 = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.textSoft};
`;

const ToggleButton2 = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.textSoft};
`;

const SignIn = () => {
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const togglePasswordVisibility1 = () => {
    setPasswordVisible1((prev) => !prev);
  };

  const togglePasswordVisibility2 = () => {
    setPasswordVisible2((prev) => !prev);
  };

  const handleSignIn=async (e) =>{
    e.preventDefault();
    dispatch(loginStart());
    try{
      const res=await axios.post("/api/auth/signin",{name,password});
      dispatch(loginSuccess(res.data));
      if(res.data){
        navigate("/");
      }
    }catch(e){
      dispatch(loginFailure());
      console.log(e);
      toast.error(e.response.data);
    }
  }

  const signInWithGoogle = async () => {
    signInWithRedirect(auth, provider)
      .then((result) => {
        axios
          .post("/api/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            navigate("/");
          });
      })
      .catch((error) => {
        console.log(error.message)
        dispatch(loginFailure());
      });
  };

  const handleSignup=async()=>{
    try{
      const res=await axios.post("/api/auth/signup",{
        name,email,password
      })
      if(res){
        toast.success("User Signup successfull");
        setTimeout(()=>{
          window.location.reload();
        },4000);
      }
    }catch(e){
      toast.error(e.message);
    }
  }
  return (
    <>
    <Helmet><title>Sign In</title></Helmet>
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to VidTube</SubTitle>
        <Input onChange={(e)=>setName(e.target.value)} placeholder="username" />
        <PasswordToggle>
          <Input
            type={passwordVisible1 ? "text" : "password"}
            placeholder="password"
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <ToggleButton1 onClick={togglePasswordVisibility1}>
            {passwordVisible1 ? <Visibility></Visibility>:<VisibilityOffIcon></VisibilityOffIcon>}
          </ToggleButton1>
        </PasswordToggle>
        <Button onClick={(e)=>{handleSignIn(e)}}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Sign in with google</Button>
        <Title>or</Title>
        <Input onChange={(e)=>setName(e.target.value)} placeholder="username" />
        <Input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" />
        <PasswordToggle>
          <Input
            onChange={(e)=>setPassword(e.target.value)}
            type={passwordVisible2 ? "text" : "password"}
            placeholder="password"
          />
          <ToggleButton2 onClick={togglePasswordVisibility2}>
            {passwordVisible2 ?<Visibility></Visibility>:<VisibilityOffIcon></VisibilityOffIcon>}
          </ToggleButton2>
        </PasswordToggle>
        <Button onClick={handleSignup}>Sign up</Button>
      </Wrapper>
      <More>
        <Link style={{ fontSize: "19px" }} to="forgotPassword">Forgot password?</Link>
      </More>
    </Container></>
  );
};

export default SignIn;
