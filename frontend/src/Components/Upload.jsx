import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:50%;
    height:80%;
    background-color:#000000a7;
    position:fixed;
    top:8rem;
    left:30rem;
    border-radius:1rem;
    z-index:200;
`;

const Wrapper = styled.div`
  width: 800px;
  height: 700px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 20px;
  position: relative;
  padding:5px 5px 5px 5px;
  border-radius:10px;
`;
const Close = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
  position: absolute;
  top:20px;
  right: 20px;
  cursor: pointer;
  color: white;
  width: 2rem;
  height: 2rem;
  font-size:1.5rem;

  &:hover {
    background-color: grey;
    border-radius: 50%;
  }
}

`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  margin:15px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  margin:15px;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  margin:15px;
`;
const Label = styled.label`
  font-size: 14px;
`;
const Upload = ({setOpen}) => {

  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video , "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("/video", {...inputs, tags})
    setOpen(false)
    res.status===200 && navigate(`/video/${res.data._id}`)
    }catch(e){
      let message="Please fill all fields"
      toast.error(message);
    }
  }

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}><CloseIcon></CloseIcon></Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          "Uploading:" + videoPerc
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas."
          onChange={handleTags}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  )
}

export default Upload