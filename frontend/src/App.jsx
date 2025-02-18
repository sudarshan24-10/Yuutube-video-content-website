import styled, { ThemeProvider } from 'styled-components';
import Menu from './Components/Menu';
import Navbar from './Components/Navbar';
import { darkTheme, lightTheme } from './utils/Theme';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
  flex-direction: column;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  margin-left: 60px;
  padding: 22px;
  z-index: 10;
`;

const Main = styled.div`
  max-width: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.bg};
`;

const MessageContainer = styled.div`
  text-align: center;
  font-size: 24px;
  margin: 20px;
  color: rgb(255, 255, 255);
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser?.fromGoogle === true) {
      async function tokengenerateGoogle(currentUser) {
        const res = await axios.post("/api/auth/google", {
          name: currentUser.name,
          email: currentUser.email,
          img: currentUser.img,
        });
        dispatch(loginSuccess(res.data));
      }
      tokengenerateGoogle(currentUser);
    }
  }, [currentUser?.name]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Main>
            <Navbar setShow={setShow} show={show} toggle={toggle} />
            {show && <UserDropdown setShow={setShow} />}
            <Menu toggle={toggle} setToggle={setToggle} darkMode={darkMode} setDarkMode={setDarkMode} />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Homepage type="random" />} />
                  <Route path="trends" element={<Homepage type="trend" />} />
                  <Route path="games" element={<Homepage type="games" />} />
                  <Route path="movies" element={<Homepage type="movies" />} />
                  <Route path="songs" element={<Homepage type="songs" />} />
                  <Route path="sports" element={<Homepage type="sports" />} />
                  <Route path="news" element={<Homepage type="news" />} />
                  <Route path="live" element={<Homepage type="live" />} />
                  <Route path="subscriptions" element={currentUser ? <Homepage type="sub" /> : (
                    <MessageContainer>
                      Please log in to view your subscriptions: <Link to="/signin">Login</Link>
                    </MessageContainer>
                  )} />
                  <Route path="history" element={currentUser ? <Homepage type="getHistory" /> : (
                    <MessageContainer>
                      Please log in to view your history: <Link to="/signin">Login</Link>
                    </MessageContainer>
                  )} />
                  <Route path="search" element={<Search />} />
                  <Route path="account_overview" element={currentUser ? <AccountOverview /> : (
                    <MessageContainer>
                      Please log in to access your account: <Link to="/signin">Login</Link>
                    </MessageContainer>
                  )} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="video/:id" element={<VideoPage />} />
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
