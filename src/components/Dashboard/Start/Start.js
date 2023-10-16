import React from "react";
import HeroModel from "../../Models/HeroModel";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

function Start({ handleDisplaySetup }) {
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            borderRadius: "15px",
            height: "90vh",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "500px",
              alignItems: "flex-start",
              justifyContent: " center",
              textAlign: "justify",
              gap: "7px",
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: "900" }}>
              FUZZY ARAS
            </Typography>
            <Typography>
              The ARAS method helps decision-makers to assess the performance of
              alternatives as well as the ratio of each alternative to the ideal
              alternative
            </Typography>
            <Typography variant="h5" sx={{ fontFamily: "Reenie Beanie" }}>
              by Zavadskas and Turskis
            </Typography>
            <Button
              variant="contained"
              color="gray"
              endIcon={<IoArrowForwardCircleOutline />}
              onClick={handleDisplaySetup}
            >
              Get Started
            </Button>
          </Box>

          <HeroModel />
        </Box>
      </Box>
    </>
  );
}

export default Start;
