import React from "react";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Slider from "@mui/material/Slider";

import { IoArrowForward } from "react-icons/io5";

import DatasetConfiguration from "./DatasetConfiguration";

import { useDispatch, useSelector } from "react-redux";
import { setNumberConfiguration } from "../../../store/actions/numberConfigurationActions";
import { setNameConfiguration } from "../../../store/actions/nameConfigurationActions";
import { setMaxMinConfiguration } from "../../../store/actions/maxMinConfigurationActions";

export default function NumberConfiguration({
  handleSetupStep,
  setIsSetupFinised,
  setIsDatasetNotUsed,
  isDatasetNotUsed,
}) {
  const initialNumbers = useSelector((state) => state.numberConfiguration);
  const [numberOfAlternatives, setNumberOfAlternatives] = React.useState(
    initialNumbers.numberOfAlternatives || 3
  );
  const [numberOfCriteria, setNumberOfCriteria] = React.useState(
    initialNumbers.numberOfCriteria || 3
  );

  React.useEffect(() => {
    setNumberOfCriteria(initialNumbers.numberOfCriteria || 3);
    setNumberOfAlternatives(initialNumbers.numberOfAlternatives || 3);
    setNumberOfLinguisticTermsForAlternatives(
      initialNumbers.numberOfLinguisticTermsForAlternatives || 3
    );
    setNumberOfLinguisticTermsForCriteria(
      initialNumbers.numberOfLinguisticTermsForCriteria || 3
    );

    setNumberOfExperts(initialNumbers.numberOfExperts || 3);
  });
  const [
    numberOfLinguisticTermsForAlternatives,
    setNumberOfLinguisticTermsForAlternatives,
  ] = React.useState(
    initialNumbers.numberOfLinguisticTermsForAlternatives || 3
  );
  const [
    numberOfLinguisticTermsForCriteria,
    setNumberOfLinguisticTermsForCriteria,
  ] = React.useState(initialNumbers.numberOfLinguisticTermsForCriteria || 3);
  const [numberOfExperts, setNumberOfExperts] = React.useState(
    initialNumbers.numberOfExperts || 3
  );

  const dispatch = useDispatch();

  const generateNames = (prefix, count) => {
    return Array.from({ length: count }, (_, index) => `${prefix}${index + 1}`);
  };
  const generateMaxMin = (count) => {
    const result = {};
    for (let i = 1; i <= count; i++) {
      result[`c${i}`] = "Max";
    }
    console.log(result);
    return result;
  };

  const generatedAlternativeNames = generateNames(
    "Alternative",
    numberOfAlternatives
  );
  const generatedCriteriaNames = generateNames("Criteria", numberOfCriteria);
  const generatedLinguisticTermsForAlternativesNames = generateNames(
    "aLT",
    numberOfLinguisticTermsForAlternatives
  );
  const generatedLinguisticTermsForCriteriaNames = generateNames(
    "cLT",
    numberOfLinguisticTermsForCriteria
  );
  const generatedExpertsNames = generateNames("Expert", numberOfExperts);
  const generatedMaxMin = generateMaxMin(numberOfCriteria);

  const handleSetNumbers = () => {
    if (isDatasetNotUsed) {
      dispatch(
        setNumberConfiguration(
          numberOfAlternatives,
          numberOfCriteria,
          numberOfLinguisticTermsForAlternatives,
          numberOfLinguisticTermsForCriteria,
          numberOfExperts
        )
      );
      dispatch(
        setNameConfiguration(
          [...generatedAlternativeNames],
          [...generatedCriteriaNames],
          [...generatedLinguisticTermsForAlternativesNames],
          [...generatedLinguisticTermsForCriteriaNames],
          [...generatedExpertsNames]
        )
      );
    }

    dispatch(setMaxMinConfiguration(generatedMaxMin));

    handleSetupStep(true);
  };

  return (
    <>
      <Box
        component="span"
        sx={{
          p: 1.5,
          border: "1px solid #d5d5d5",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <DatasetConfiguration
          setIsSetupFinised={setIsSetupFinised}
          setIsDatasetNotUsed={setIsDatasetNotUsed}
        />
        <Typography variant="h6">Provide input numbers</Typography>
        <Box
          component="span"
          sx={{
            p: 1.5,
            border: "1px solid #d5d5d5",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Typography id="alternatives-slider" gutterBottom>
            Alternatives
          </Typography>
          <Slider
            aria-labelledby="alternatives-slider"
            value={numberOfAlternatives}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={3}
            max={10}
            onChange={(e) => setNumberOfAlternatives(e.target.value)}
            color="gray"
            disabled={!isDatasetNotUsed}
          />
        </Box>
        <Box
          component="span"
          sx={{
            p: 1.5,
            border: "1px solid #d5d5d5",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Typography id="criteria-slider" gutterBottom>
            Criteria
          </Typography>
          <Slider
            aria-labelledby="criteria-slider"
            value={numberOfCriteria}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={3}
            max={10}
            onChange={(e) => setNumberOfCriteria(e.target.value)}
            color="gray"
            disabled={!isDatasetNotUsed}
          />
        </Box>
        <Box
          component="span"
          sx={{
            p: 1.5,
            border: "1px solid #d5d5d5",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Typography id="linguistic-terms-slider" gutterBottom>
            Linguistic terms for alternatives
          </Typography>
          <Slider
            aria-labelledby="linguistic-terms-slider"
            value={numberOfLinguisticTermsForAlternatives}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={3}
            max={7}
            onChange={(e) =>
              setNumberOfLinguisticTermsForAlternatives(e.target.value)
            }
            color="gray"
            disabled={!isDatasetNotUsed}
          />
        </Box>
        <Box
          component="span"
          sx={{
            p: 1.5,
            border: "1px solid #d5d5d5",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Typography id="linguistic-terms-slider" gutterBottom>
            Linguistic terms for criteria
          </Typography>
          <Slider
            aria-labelledby="linguistic-terms-slider"
            value={numberOfLinguisticTermsForCriteria}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={3}
            max={7}
            onChange={(e) =>
              setNumberOfLinguisticTermsForCriteria(e.target.value)
            }
            color="gray"
            disabled={!isDatasetNotUsed}
          />
        </Box>
        <Box
          component="span"
          sx={{
            p: 1.5,
            border: "1px solid #d5d5d5",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Typography id="experts-slider" gutterBottom>
            Experts
          </Typography>
          <Slider
            aria-labelledby="experts-slider"
            value={numberOfExperts}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
            onChange={(e) => setNumberOfExperts(e.target.value)}
            color="gray"
            disabled={!isDatasetNotUsed}
          />
        </Box>

        <Button
          variant="contained"
          color="gray"
          sx={{
            marginTop: "20px",
          }}
          endIcon={<IoArrowForward />}
          onClick={handleSetNumbers}
        >
          Next step
        </Button>
      </Box>
    </>
  );
}
