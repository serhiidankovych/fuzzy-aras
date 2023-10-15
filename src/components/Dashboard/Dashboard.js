import React from "react";

import Container from "@mui/material/Container";

import Header from "./Header/Header";
import Start from "./Start/Start";
import Footer from "./Footer/Footer";

export default function Dashboard() {
  return (
    <>
      {" "}
      <Header />
      <Container maxWidth="lg">
        <Start />
      </Container>
      <Footer />
    </>
  );
}
