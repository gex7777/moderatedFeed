import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./../../contexts/AuthContext";

export const TemporaryDrawer = forwardRef((props, ref) => {
  const anchor = "left";
  const [state, setState] = React.useState(false);
  const { currentUser, isMod } = useAuth();
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };
  useImperativeHandle(ref, () => ({
    showDrawer() {
      setState(true);
    },
  }));
  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link to="/">
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItem>
        </Link>
        <Link to="/myposts">
          <ListItem button disabled={!currentUser}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="My Posts" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      {isMod ? (
        <List>
          <Link to="/allposts">
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="All Posts" />
            </ListItem>
          </Link>
        </List>
      ) : null}
    </Box>
  );

  return (
    <div>
      <Drawer anchor={anchor} open={state} onClose={toggleDrawer(false)}>
        {list(anchor)}
      </Drawer>
    </div>
  );
});
