import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import NumbersConfiguration from "./NumbersConfiguration";
import NameConfiguration from "./NameConfiguration";

export default function Setup({ isSetupOpen, setIsSetupOpen }) {
  const [setupStep, setSetupStep] = React.useState(0);

  const handleSetupStep = (step) => {
    if (step) {
      setSetupStep(setupStep + 1);
    } else {
      setSetupStep(setupStep - 1);
    }
  };

  const setupMenu = (step) => {
    const steps = {
      0: <NumbersConfiguration handleSetupStep={handleSetupStep} />,
      1: <NameConfiguration handleSetupStep={handleSetupStep} />,
    };
    return steps[step];
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsSetupOpen(open);
  };
  const list = () => (
    <Box
      sx={{
        width: 400,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
      role="presentation"
    >
      {setupMenu(setupStep)}
    </Box>
  );
  return (
    <Drawer
      anchor="right"
      open={isSetupOpen}
      onClose={toggleDrawer(false)}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    >
      {list()}
    </Drawer>
  );
}
