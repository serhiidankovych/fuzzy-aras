import React from "react";

import Container from "@mui/material/Container";
import { ToastContainer, toast } from "react-toastify";

import Header from "./Header/Header";
import Start from "./Start/Start";
import Footer from "./Footer/Footer";
import Setup from "./Setup/Setup";
import ExpertsEstimations from "./ExpertsEstimations/ExpertsEstimations";

export default function Dashboard() {
  const [isSetupOpen, setIsSetupOpen] = React.useState(false);
  const [isSetupFinised, setIsSetupFinised] = React.useState(false);

  const handleDisplaySetup = () => {
    setIsSetupOpen((prev) => !prev);
  };
  return (
    <>
      <Header handleDisplaySetup={handleDisplaySetup} />
      <Container maxWidth="lg" sx={{ height: "100vh" }}>
        {!isSetupFinised && <Start handleDisplaySetup={handleDisplaySetup} />}
        {isSetupFinised && <ExpertsEstimations />}
      </Container>
      <Setup
        isSetupOpen={isSetupOpen}
        setIsSetupOpen={setIsSetupOpen}
        setIsSetupFinised={setIsSetupFinised}
      />
      <Footer />
      <ToastContainer />
    </>
  );
}
