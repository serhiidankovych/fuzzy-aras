import React from "react";

import Container from "@mui/material/Container";
import { ToastContainer, toast } from "react-toastify";

import Header from "./Header/Header";
import Start from "./Start/Start";
import Footer from "./Footer/Footer";
import Setup from "./Setup/Setup";
import ExpertsEstimations from "./ExpertsEstimations/ExpertsEstimations";
import EstimationsAggregator from "./EstimationsAggregator/EstimationsAggregator";

export default function Dashboard() {
  const [isSetupOpen, setIsSetupOpen] = React.useState(false);
  const [isSetupFinised, setIsSetupFinised] = React.useState(false);
  const [isDatasetNotUsed, setIsDatasetNotUsed] = React.useState(true);

  const [aggregatedEstimations, setAggregatedEstimations] = React.useState([]);

  const handleDisplaySetup = () => {
    setIsSetupOpen((prev) => !prev);
  };
  return (
    <>
      <Header handleDisplaySetup={handleDisplaySetup} />
      <Container maxWidth="lg">
        {!isSetupFinised && <Start handleDisplaySetup={handleDisplaySetup} />}
        {isSetupFinised && (
          <>
            <ExpertsEstimations
              setAggregatedEstimations={setAggregatedEstimations}
            />{" "}
            <EstimationsAggregator
              aggregatedEstimations={aggregatedEstimations}
            />
          </>
        )}
      </Container>
      <Setup
        isDatasetNotUsed={isDatasetNotUsed}
        setIsDatasetNotUsed={setIsDatasetNotUsed}
        isSetupOpen={isSetupOpen}
        setIsSetupOpen={setIsSetupOpen}
        setIsSetupFinised={setIsSetupFinised}
      />
      <Footer />
      <ToastContainer />
    </>
  );
}
