import React from "react";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import { setNumberConfiguration } from "../../../store/actions/numberConfigurationActions";
import { setNameConfiguration } from "../../../store/actions/nameConfigurationActions";
import { setCriteriaConfiguration } from "../../../store/actions/criteriaConfigurationActions";
import { setAlternativeConfiguration } from "../../../store/actions/alternativeConfigurationActions";
import { setCriteriaEstimationConfiguration } from "../../../store/actions/criteriaEstimationConfigurationActions";
import { setExpertsEstimationConfiguration } from "../../../store/actions/expertsEstimationConfigurationActions";
import { useDispatch, useSelector } from "react-redux";
import {
  numberOfAlternatives,
  numberOfCriteria,
  numberOfLinguisticTermsForAlternatives,
  numberOfLinguisticTermsForCriteria,
  numberOfExperts,
  names,
  criteriaLinguisticTerms,
  alternativesLinguisticTerms,
  criteriaEstimations,
  expertsEstimations,
} from "../../../templates/dataset1";

export default function DatasetConfiguration({ setIsSetupFinised }) {
  const dispatch = useDispatch();

  const handleSetDataset = () => {
    dispatch(
      setNumberConfiguration(
        numberOfAlternatives,
        numberOfCriteria,
        numberOfLinguisticTermsForAlternatives,
        numberOfLinguisticTermsForCriteria,
        numberOfExperts
      )
    );
    const {
      alternativeNames,
      criteriaNames,
      linguisticTermsForAlternativesNames,
      linguisticTermsForCriteriaNames,
      expertNames,
    } = names;
    console.log(alternativeNames);

    dispatch(
      setNameConfiguration(
        alternativeNames,
        criteriaNames,
        linguisticTermsForAlternativesNames,
        linguisticTermsForCriteriaNames,
        expertNames
      )
    );
    dispatch(setCriteriaConfiguration(criteriaLinguisticTerms));
    dispatch(setAlternativeConfiguration(alternativesLinguisticTerms));
    dispatch(setCriteriaEstimationConfiguration(criteriaEstimations));
    dispatch(setExpertsEstimationConfiguration(expertsEstimations));
    setIsSetupFinised(true);
  };

  return (
    <div>
      <Typography>Data templates:</Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
        sx={{
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <Button
          variant="contained"
          color="gray"
          onClick={() => handleSetDataset()}
        >
          Dataset #1
        </Button>
        <Button variant="contained" disabled={true} color="gray">
          Dataset #2
        </Button>
      </Stack>
    </div>
  );
}
