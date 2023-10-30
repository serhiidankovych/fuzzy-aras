import React from "react";

import Container from "@mui/material/Container";
import { ToastContainer, toast } from "react-toastify";

import Header from "./Header/Header";
import Start from "./Start/Start";
import Footer from "./Footer/Footer";
import Setup from "./Setup/Setup";
import ExpertsEstimations from "./ExpertsEstimations/ExpertsEstimations";
import EstimationsAggregator from "./EstimationsAggregator/EstimationsAggregator";
import CriteriaIntervalValued from "./IntervalValuedTransformer/CriteriaIntervalValued";
import AlternativesIntervalValued from "./IntervalValuedTransformer/AlternativesIntervalValued";
import CriteriaOptimalValued from "./CriteriaOptimalValued/CriteriaOptimalValued";

export default function Dashboard() {
  const [isSetupOpen, setIsSetupOpen] = React.useState(false);
  const [isSetupFinised, setIsSetupFinised] = React.useState(false);
  const [isDatasetNotUsed, setIsDatasetNotUsed] = React.useState(true);
  const [isResultsShown, setIsResultsShown] = React.useState(false);

  const [aggregatedEstimations, setAggregatedEstimations] = React.useState([]);
  const [criteriaIntervalValuedNumbers, setCriteriaIntervalValuedNumbers] =
    React.useState([]);
  const [
    alternativesIntervalValuedNumbers,
    setAlternativesIntervalValuedNumbers,
  ] = React.useState([]);

  const [criteriaOptimalValuedNumbers, setCriteriaOptimalValuedNumbers] =
    React.useState([]);

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
              setCriteriaIntervalValuedNumbers={
                setCriteriaIntervalValuedNumbers
              }
              setAlternativesIntervalValuedNumbers={
                setAlternativesIntervalValuedNumbers
              }
              setCriteriaOptimalValuedNumbers={setCriteriaOptimalValuedNumbers}
              setIsResultsShown={setIsResultsShown}
            />
            {isResultsShown && (
              <>
                <EstimationsAggregator
                  aggregatedEstimations={aggregatedEstimations}
                />
                <CriteriaIntervalValued
                  criteriaIntervalValuedNumbers={criteriaIntervalValuedNumbers}
                />
                <AlternativesIntervalValued
                  aggregatedEstimations={aggregatedEstimations}
                  alternativesIntervalValuedNumbers={
                    alternativesIntervalValuedNumbers
                  }
                />
                <CriteriaOptimalValued
                  criteriaOptimalValuedNumbers={criteriaOptimalValuedNumbers}
                />
              </>
            )}
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
