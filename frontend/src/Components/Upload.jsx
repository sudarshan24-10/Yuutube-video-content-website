import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%; /* Adjusted for better fitting */
    height: auto;
    background-color: #000000a7;
    position: absolute;
    left: 25%;
    top: -0.5rem;
    border-radius: 1rem;
    z-index: 200;
    padding: 20px; /* Added padding to ensure elements aren't touching the borders */
    overflow-y: auto; /* To handle content overflow */
    overflow-x: hidden; /* To hide horizontal scrollbars */
`;

const Wrapper = styled.div`
  width: 95%;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Adjusted alignment */
  gap: 15px; /* Reduced gap between items */
  position: relative;
  border-radius: 10px;
`;

const Close = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  width: 2rem;
  height: 2rem;
  font-size: 1.5rem;

  &:hover {
    background-color: grey;
    border-radius: 50%;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem; /* Adjusted font size for better fit */
  margin-bottom: 10px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 5px;
  padding: 10px;
  margin: 8px 0;
  background-color: transparent;
  width: 100%; /* Adjusted to take full width */
  box-sizing: border-box; /* To include padding in width calculation */
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 5px;
  padding: 10px;
  background-color: transparent;
  margin: 8px 0;
  width: 100%;
  box-sizing: border-box; /* To include padding in width calculation */
`;

const Button = styled.button`
  border-radius: 5px;
  border: none;
  padding: 12px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px; /* Adjusted spacing */
`;

const TagDropdown = styled.div`
  position: absolute;
  top: 14rem; /* Adjusted position */
  left: 1rem;
  background-color: #2c2f38;
  border-radius: 5px;
  width: 95%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 5px;
  max-height: 150px;
  overflow: hidden;  
  overflow-y:scroll;
  scrollbar-width: none;  
`;


const TagOption = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

const TagChip = styled.span`
  background-color: #ddd;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 5px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;

  & > svg {
    margin-left: 5px;
  }
`;

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const availableTags = ['games', 'movies', 'sports', 'songs', 'news', 'health', 'news'];

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const videoUpload = (e) => {
    const file = e.target.files[0];
    if (file.type !== 'video/mp4') {
      toast.error('Please upload an MP4 file.');
      e.target.value = null;
    } else {
      setVideo(file);
    }
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(','));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
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
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/videos", { ...inputs, tags });
      setOpen(false);
      res.status === 200 && window.location.reload();
    } catch (e) {
      toast.error('Please fill all fields');
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>
          <CloseIcon />
        </Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          `Uploading: ${videoPerc}%`
        ) : (
          <Input type="file" accept="video/*" onChange={videoUpload} />
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
          rows={2}
          onChange={handleChange}
        />
        <Label>Tags:</Label>
        <Input
          type="text"
          placeholder="Click to select tags"
          value={tags.join(', ')}
          onClick={toggleDropdown}
          readOnly
        />
        {showDropdown && (
          <TagDropdown>
            {availableTags.map((tag) => (
              <TagOption key={tag} onClick={() => addTag(tag)}>
                {tag}
              </TagOption>
            ))}
          </TagDropdown>
        )}
        <div>
          {tags.map((tag, index) => (
            <TagChip key={index} onClick={() => removeTag(tag)}>
              {tag}
              <CloseIcon fontSize="small" />
            </TagChip>
          ))}
        </div>
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          `Uploading: ${imgPerc}%`
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
  );
};

export default Upload;
