import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const UpdatePost = ({ value, id, uid, updatePost }) => {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState(value);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleUpdate = async (uid, id, text) => {
    await updatePost(uid, id, text);
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} maxWidth="md" fullWidth onClose={handleClose}>
        <DialogTitle>Edit post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="email"
            rows={4}
            fullWidth
            onChange={handleChange}
            variant="outlined"
            defaultValue={value}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleUpdate(uid, id, text)}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
