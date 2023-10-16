import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Slider from "@mui/material/Slider";

import { IoArrowForward } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { setNumberConfiguration } from "../../../store/actions/numberConfigurationActions";

export default function NameConfiguration({ handleSetupStep }) {
  const [numberOfAlternatives, setNumberOfAlternatives] = React.useState(5);
  const [numberOfCriteria, setNumberOfCriteria] = React.useState(8);
  const [numberOfLinguisticTerms, setNumberOfLinguisticTerms] =
    React.useState(5);
  const [numberOfExperts, setNumberOfExperts] = React.useState(3);
  const dispatch = useDispatch();

  const handleSetNumbers = () => {
    dispatch(
      setNumberConfiguration(
        numberOfAlternatives,
        numberOfCriteria,
        numberOfLinguisticTerms,
        numberOfExperts
      )
    );
    handleSetupStep(true);
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
            value={numberOfLinguisticTerms}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={3}
            max={7}
            onChange={(e) => setNumberOfLinguisticTerms(e.target.value)}
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
            value={numberOfLinguisticTerms}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={3}
            max={7}
            onChange={(e) => setNumberOfLinguisticTerms(e.target.value)}
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
