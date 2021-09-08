import React from "react";
//for material card
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";

export const Post = ({ author, date, text }) => {
  return (
    <Card sx={{ minWidth: "40%", maxWidth: "40%", marginBottom: "2rem" }}>
      <CardHeader
        avatar={<Avatar>R</Avatar>}
        title={author || "mewow"}
        subheader={date || "date September 14, 2016"}
      />
      <CardContent>
        <Typography>
          {text ||
            " Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fugit ipsum qui perferendis ratione non earum, consequatur consectetur autquidem voluptas obcaecati, quis quasi officiis assumenda placeatdolore natus ipsa!"}
        </Typography>
      </CardContent>
    </Card>
  );
};
