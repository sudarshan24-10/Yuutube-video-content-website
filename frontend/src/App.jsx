import styled, { ThemeProvider } from 'styled-components';
import Menu from './Components/Menu';
import Navbar from './Components/Navbar';
import { darkTheme, lightTheme } from './utils/Theme';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Pages/Homepage';
import VideoPage from './Pages/VideoPage';
import SignIn from './Pages/SigninPage';
import { ToastContainer } from 'react-toastify';
import Search from './Pages/SearchPage';
import UserDropdown from './Components/UserDropdown';
import AccountOverview from './Pages/AccountOverview';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginSuccess } from './redux/userSlice';

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  padding: 22px 96px;
  overflow: hidden;
  z-index:10;
`;

const Main = styled.div`
  max-width: 100%;
  flex:1;
  background-color: ${({ theme }) => theme.bg};
`;
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [toggle,setToggle]=useState(true);
  const [show,setShow] = useState(false);
  const dispatch=useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if(currentUser.fromGoogle===true){
      async function tokengenerateGoogle(currentUser) {
        const res= await axios.post("/api/auth/google",{
            name:currentUser.name,
            email:currentUser.email,
            img:currentUser.img,
        });
        dispatch(loginSuccess(res.data));
      }

      tokengenerateGoogle(currentUser);
    }else{
      return;
    }
  },[currentUser?.name]);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <Container >
      <BrowserRouter>
      <Menu toggle={toggle} setToggle={setToggle} darkMode={darkMode} setDarkMode={setDarkMode} ></Menu>
      <Main>
      <Navbar setShow={setShow} show={show} toggle={toggle}></Navbar>
      {show && <UserDropdown setShow={setShow} ></UserDropdown>}
      <Wrapper>
        <Routes>
          <Route path='/'>
          <Route index element={<Homepage type="random" />} />
          <Route path="trends" element={<Homepage type="sub" />} />
          <Route path="subscriptions" element={<Homepage type="sub" />} />
          <Route path="search" element={<Search />} />
          <Route path="account_overview" element={<AccountOverview></AccountOverview>}></Route>
          <Route
                    path="signin"
                    element={<SignIn />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<VideoPage />} />
                  </Route>
          </Route>
        </Routes>
      </Wrapper>
    </Main>
    <ToastContainer position="bottom-center" className="toast" />
    </BrowserRouter>
    </Container>
    </ThemeProvider>
  );
}

export default App;
