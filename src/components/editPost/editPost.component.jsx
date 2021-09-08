import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { UpdatePost } from "../updatePost/updatePost.component";

import { useAuth } from "./../../contexts/AuthContext";

export const EditPost = ({
  uid,
  author,
  date,
  text,
  id,
  approved,
  deleteCallback,
  updateCallback,
  approveCallback,
}) => {
  const { isMod } = useAuth();
  const approvePost = () => {
    approveCallback(uid, id, approved);
  };
  return (
    <Card sx={{ maxWidth: 345, marginBottom: "2rem" }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        title={author}
        subheader={date}
        action={
          approved ? (
            <CheckCircleIcon color="success" />
          ) : (
            <AccessTimeFilledIcon />
          )
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <UpdatePost
          value={text}
          id={id}
          uid={uid}
          updatePost={updateCallback}
        />
        <Button
          onClick={() => deleteCallback(uid, id)}
          size="small"
          color="error"
          variant="contained"
        >
          Delete
        </Button>
        {isMod ? (
          <Button
            onClick={approvePost}
            size="small"
            color={approved ? "warning" : "success"}
            variant="contained"
          >
            {approved ? "disapprove" : "approve"}
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};
