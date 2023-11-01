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
import CriteriaOptimalValued from "./OptimalValuedTransformer/CriteriaOptimalValued";
import AlternativesOptimalValued from "./OptimalValuedTransformer/AlternativesOptimalValued";
import NormalizedWeightedMatrix from "./NormalizedWeightedMatrix/NormalizedWeightedMatrix";
import PerformanceRatings from "./PerformanceRatings/PerformanceRatings";
import Defuzzification from "./Defuzzification/Defuzzification";
import UtilityDegree from "./UtilityDegree/UtilityDegree";
import Rank from "./Rank/Rank";

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
  const [
    alternativesOptimalValuedNumbers,
    setAlternativesOptimalValuedNumbers,
  ] = React.useState([]);
  const [normalizedWeightedMatrix, setNormalizedWeightedMatrix] =
    React.useState([]);
  const [performanceRatings, setPerformanceRatings] = React.useState([]);
  const [defuzzification, setDefuzzification] = React.useState({});
  const [utilityDegree, setUtilityDegree] = React.useState({});
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
              setAlternativesOptimalValuedNumbers={
                setAlternativesOptimalValuedNumbers
              }
              setNormalizedWeightedMatrix={setNormalizedWeightedMatrix}
              setPerformanceRatings={setPerformanceRatings}
              setDefuzzification={setDefuzzification}
              setUtilityDegree={setUtilityDegree}
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
                <AlternativesOptimalValued
                  alternativesOptimalValuedNumbers={
                    alternativesOptimalValuedNumbers
                  }
                />
                <NormalizedWeightedMatrix
                  normalizedWeightedMatrix={normalizedWeightedMatrix}
                />
                <PerformanceRatings performanceRatings={performanceRatings} />
                <Defuzzification defuzzification={defuzzification} />
                <UtilityDegree utilityDegree={utilityDegree} />
                <Rank utilityDegree={utilityDegree} />
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
