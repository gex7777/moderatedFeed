import { useState } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { useAuth } from "./../../contexts/AuthContext";
import { useDatabase } from "./../../contexts/DbContext";
const ParentContainer = styled.div`
  padding: 3rem 3rem;
  display: flex;
  height: 10rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;
export const InputPost = () => {
  const { currentUser } = useAuth();
  const { addPost, getAllPosts } = useDatabase();
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = async () => {
    await addPost({
      uid: currentUser.uid,
      date: new Date().toUTCString(),
      author: currentUser.displayName,
      approved: false,
      text: value,
    });

    await getAllPosts();
    setValue("");
  };

  return (
    <ParentContainer>
      <TextField
        sx={{ paddingBottom: "1rem" }}
        label={currentUser ? "Whats on your mind.." : "login to post"}
        multiline
        value={value}
        onChange={handleChange}
        rows={4}
        fullWidth
        variant="outlined"
      />
      <Button
        onClick={handleSubmit}
        disabled={!currentUser || value === ""}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Post
      </Button>
    </ParentContainer>
  );
};
