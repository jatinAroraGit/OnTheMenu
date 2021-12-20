import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box as GBox } from "grommet";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import navBackground from "../img/navbarBg.jpg";
import "../styles/forms.css";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FiltersForm from "../modules/FiltersForm";
type Inputs = {
  example: string;
  exampleRequired: string;
};
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 5,
  padding: 2,
};
export default function Homepage() {
  //const [showModal, setShowModal] = useState(false);
  //const [activeStep, setActiveStep] = React.useState(0);
  //const [value, setValue] = React.useState(0);
  /*
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
*/
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const searchRecipes = () => {
    console.log("Sending Request");
  };

  return (
    <Box style={{ padding: 0 }}>
      <GBox direction="row-responsive">
        <Box style={{ padding: 2, minWidth: 100 }}>
          <Chip color="warning" style={{ margin: 2 }} label="Filters" />
        </Box>
        <Box
          style={{
            background: "#F1EFEA",
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <form style={{ padding: 2 }} onSubmit={handleSubmit(onSubmit)}>
            <label style={{ fontSize: 20 }}>What's on the menu today ?</label>
            <Box flexDirection="row" style={{ padding: 2, minWidth: 100 }}>
              <h4 style={{ margin: 2 }}>Today's Top Searches</h4>
              <Chip
                onClick={() => console.log("Meow")}
                color="info"
                style={{ margin: 2, fontSize: 20 }}
                label="Pasta"
                size={"medium"}
              />
              <Chip
                color="info"
                style={{ margin: 2, fontSize: 20 }}
                label="Pizza"
              />
              <Chip
                color="info"
                style={{ margin: 2, fontSize: 20 }}
                label="Vegan"
              />
            </Box>
            <GBox direction="row">
              <input
                {...register("example")}
                color={"#F1EFEA"}
                placeholder="Search For Recipes"
              />
              <Button
                style={{ padding: 0, margin: 2, width: 60, marginBottom: 12 }}
                variant="contained"
              >
                Search
              </Button>
            </GBox>
            <GBox direction="row">
              <input
                style={{ width: "fit-content", marginTop: 7 }}
                type="checkbox"
                placeholder="Is in country"
              />
              <p style={{ padding: 0, margin: 0 }}>Is available</p>
            </GBox>
            <Grid container justifyContent="center">
              <Button
                style={{ padding: 0, background: "#A64A35" }}
                variant="contained"
                onClick={() => setShowModal(true)}
              >
                Filters
              </Button>
            </Grid>

            <Modal
              open={showModal}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <FiltersForm></FiltersForm>
                <Button
                  style={{ background: "#A64A35" }}
                  variant="contained"
                  onClick={() => setShowModal(true)}
                >
                  Apply Filters
                </Button>
              </Box>
            </Modal>
          </form>
        </Box>
      </GBox>
    </Box>
  );
}
