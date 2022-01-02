import React from "react";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { Avatar, Box as GBox } from "grommet";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <GBox
      style={{
        height: "100%",

        textAlign: "center",
        justifySelf: "center",
      }}
    >
      <Card
        style={{
          textAlign: "center",
          margin: 100,
          width: 300,
          minWidth: 300,
          background: "#faba2c",
          alignSelf: "center",
          alignItems: "center",
          alignContent: "center",
          borderRadius: 20,
        }}
        variant={"outlined"}
      >
        <CardContent
          style={{
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            Oops!
          </Typography>
          <Typography variant="h4" component="div">
            404
          </Typography>
          <Typography variant="h6">Page was not found.</Typography>

          <Typography variant="body2">
            <Button
              variant="contained"
              style={{ margin: 10 }}
              color="secondary"
              onClick={() => navigate("/home")}
            >
              {" "}
              Go To Homepage
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </GBox>
  );
}
