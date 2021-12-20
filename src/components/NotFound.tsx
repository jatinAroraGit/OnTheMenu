import React from "react";
import logo from "./logo.svg";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";

export default function NotFound() {
  return (
    <Container>
      <Card
        style={{
          textAlign: "center",
          margin: 100,
          alignItems: "center",
          alignContent: "center",
        }}
        variant={"outlined"}
      >
        <CardContent
          style={{
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Oops!
          </Typography>
          <Typography variant="h5" component="div">
            404
          </Typography>
          <Typography variant="body2">Page was not found.</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
