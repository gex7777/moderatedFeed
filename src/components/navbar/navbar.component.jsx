import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "./../../contexts/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { TemporaryDrawer } from "./../drawer/drawer.component";
import { useRef } from "react";
//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const Navbar = ({ title }) => {
  const { currentUser, signInWithGoogle, logout, addAdminEmail, isMod } =
    useAuth();
  const [isLoading, setLoading] = useState(false);

  const childRef = useRef();

  const Login = async () => {
    setLoading(true);

    await signInWithGoogle();

    setLoading(false);
  };
  const Logout = async () => {
    await logout();
  };
  const activateMod = (email) => {
    setLoading(true);
    console.log(email);
    addAdminEmail(email);
    setLoading(false);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <TemporaryDrawer ref={childRef} />
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={() => {
                childRef.current.showDrawer();
              }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            {isLoading && <CircularProgress color="secondary" />}
            {currentUser ? (
              <>
                <Button disabled={isLoading} onClick={Logout} color="inherit">
                  Logout
                </Button>
                {isMod ? null : (
                  <AlertDialog
                    email={currentUser.email}
                    activateMod={activateMod}
                  >
                    Activate Mod Features
                  </AlertDialog>
                )}
              </>
            ) : (
              <Button disabled={isLoading} onClick={Login} color="inherit">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
const AlertDialog = ({ email, activateMod }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callback = () => {
    activateMod(email);
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} color="success" variant="contained">
        Activate Moderator
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Enable Moderator features?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This cannot be reversed
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={callback} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
