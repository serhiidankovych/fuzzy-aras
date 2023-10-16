import React from "react";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Slider from "@mui/material/Slider";

import { IoArrowForward } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { setNumberConfiguration } from "../../../store/actions/numberConfigurationActions";
import { setNameConfiguration } from "../../../store/actions/nameConfigurationActions";

export default function NumberConfiguration({ handleSetupStep }) {
  const [numberOfAlternatives, setNumberOfAlternatives] = React.useState(5);
  const [numberOfCriteria, setNumberOfCriteria] = React.useState(8);
  const [
    numberOfLinguisticTermsForAlternatives,
    setNumberOfLinguisticTermsForAlternatives,
  ] = React.useState(5);
  const [
    numberOfLinguisticTermsForCriteria,
    setNumberOfLinguisticTermsForCriteria,
  ] = React.useState(5);
  const [numberOfExperts, setNumberOfExperts] = React.useState(3);

  const dispatch = useDispatch();

  const handleSetNumbers = () => {
    dispatch(
      setNumberConfiguration(
        numberOfAlternatives,
        numberOfCriteria,
        numberOfLinguisticTermsForAlternatives,
        numberOfLinguisticTermsForCriteria,
        numberOfExperts
      )
    );
    generateNames();
    handleSetupStep(true);
  };

  const generateNames = () => {
    const generatedAlternativeNames = Array.from(
      { length: numberOfAlternatives },
      (_, index) => `Alternative ${index + 1}`
    );
    const generatedCriteriaNames = Array.from(
      { length: numberOfCriteria },
      (_, index) => `Criteria ${index + 1}`
    );
    const generatedLinguisticTermsForAlternativesNames = Array.from(
      { length: numberOfLinguisticTermsForAlternatives },
      (_, index) => `Linguistic term ${index + 1}`
    );
    const generatedLinguisticTermsForCriteriaNames = Array.from(
      { length: numberOfLinguisticTermsForCriteria },
      (_, index) => `Linguistic term ${index + 1}`
    );
    const generatedExpertsNames = Array.from(
      { length: numberOfExperts },
      (_, index) => `Expert ${index + 1}`
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
  };

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "900" }}>
        Provide input numbers
      </Typography>
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
