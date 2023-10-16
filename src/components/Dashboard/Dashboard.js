import React from "react";

import Container from "@mui/material/Container";
import { ToastContainer, toast } from "react-toastify";

import Header from "./Header/Header";
import Start from "./Start/Start";
import Footer from "./Footer/Footer";
import Setup from "./Setup/Setup";

export default function Dashboard() {
  const [isSetupOpen, setIsSetupOpen] = React.useState(false);

  const handleDisplaySetup = () => {
    setIsSetupOpen((prev) => !prev);
  };
  return (
    <>
      <Header handleDisplaySetup={handleDisplaySetup} />
      <Container maxWidth="lg">
        <Start handleDisplaySetup={handleDisplaySetup} />
      </Container>
      <Setup isSetupOpen={isSetupOpen} setIsSetupOpen={setIsSetupOpen} />
      <Footer />
      <ToastContainer />
    </>
  );
}
