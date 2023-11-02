import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  FormControl,
} from "@mui/material";

import { IoArrowForward, IoArrowBackOutline } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { setExpertsEstimationConfiguration } from "../../../store/actions/expertsEstimationConfigurationActions";
import {
  getCriteriaIntervalValuedNumbers,
  aggregateEstimations,
  getAlternativesIntervalValuedNumbers,
  getCriteriaOptimalValue,
  getAlternativesOptimalValue,
  getNormalizedWeightedMatrix,
  getPerfomanceRatings,
  getWeightedAverageDefuzzification,
  getUtilityDegree,
} from "../../../utils/expertEstimationsUtils";

export default function ExpertsEstimations({
  setAggregatedEstimations,
  setCriteriaIntervalValuedNumbers,
  setAlternativesIntervalValuedNumbers,
  setCriteriaOptimalValuedNumbers,
  setAlternativesOptimalValuedNumbers,
  setNormalizedWeightedMatrix,
  setPerformanceRatings,
  setDefuzzification,
  setUtilityDegree,
  setIsResultsShown,
}) {
  const alternativesLinguisticTerms = useSelector(
    (state) => state.alternativeConfiguration
  );

  const names = useSelector((state) => state.nameConfiguration);

  const expertsEstimations = useSelector(
    (state) => state.expertsEstimationConfiguration
  );

  const criteriaEstimation = useSelector(
    (state) => state.criteriaEstimationConfiguration
  );
  const maxMin = useSelector((state) => state.maxMinConfiguration);

  const [linguisticTerms, setLinguisticTerms] = React.useState(
    alternativesLinguisticTerms.alternativeLinguisticTerms || {}
  );
  const [selectedItems, setSelectedItems] = React.useState(
    expertsEstimations.expertsEstimation || {}
  );

  React.useEffect(() => {
    setLinguisticTerms(alternativesLinguisticTerms.alternativeLinguisticTerms);
  }, [alternativesLinguisticTerms]);

  React.useEffect(() => {
    setSelectedItems(expertsEstimations.expertsEstimation);
  }, [expertsEstimations]);

  const dispatch = useDispatch();
  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = React.useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExpert = names.expertIndices.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSetExpertEstimations = () => {
    dispatch(setExpertsEstimationConfiguration(selectedItems));

    const aggregatedEstimations = aggregateEstimations(selectedItems);
    setAggregatedEstimations(aggregatedEstimations);

    const criteriaIntervalValuedNumbers = getCriteriaIntervalValuedNumbers(
      criteriaEstimation.criteriaEstimation,
      names.expertIndices.length
    );
    setCriteriaIntervalValuedNumbers(criteriaIntervalValuedNumbers);

    const alternativesIntervalValuedNumbers =
      getAlternativesIntervalValuedNumbers(
        aggregateEstimations(selectedItems),
        names.expertIndices.length
      );
    setAlternativesIntervalValuedNumbers(alternativesIntervalValuedNumbers);

    const criteriaOptimalValuedNumbers = getCriteriaOptimalValue(
      alternativesIntervalValuedNumbers,
      maxMin.maxMin
    );
    setCriteriaOptimalValuedNumbers(criteriaOptimalValuedNumbers);

    const alternativesOptimalValuedNumbers = getAlternativesOptimalValue(
      alternativesIntervalValuedNumbers,
      criteriaOptimalValuedNumbers,
      maxMin.maxMin
    );
    setAlternativesOptimalValuedNumbers(alternativesOptimalValuedNumbers);

    const normalizedWeightedMatrix = getNormalizedWeightedMatrix(
      criteriaIntervalValuedNumbers,
      alternativesOptimalValuedNumbers
    );
    setNormalizedWeightedMatrix(normalizedWeightedMatrix);

    const perfomanceRatings = getPerfomanceRatings(normalizedWeightedMatrix);
    setPerformanceRatings(perfomanceRatings);
    setIsResultsShown(true);

    const defuzzifiedRatings =
      getWeightedAverageDefuzzification(perfomanceRatings);
    setDefuzzification(defuzzifiedRatings);

    const utilityDegree = getUtilityDegree(defuzzifiedRatings);
    setUtilityDegree(utilityDegree);
  };

  const handleSelectChange = (event, id) => {
    const { value } = event.target;
    const selectedOption = linguisticTerms.find(
      (option) => option.linguisticTerm === value
    );

    const updatedSelectedItems = { ...selectedItems };
    if (updatedSelectedItems[id]) {
      updatedSelectedItems[id].data = selectedOption; // Store the entire selected option object.
    }
    setSelectedItems(updatedSelectedItems);
  };

  const MenuItems = currentExpert.map((expertName, expertIndex) => {
    return names.alternativeNames.map((alternativeName, alternativeIndex) => {
      const criterionCells = names.criteriaNames.map(
        (criteriaName, criteriaIndex) => {
          const itemId = `e${Number(expertName) + 1}-a${
            alternativeIndex + 1
          }-c${criteriaIndex + 1}`;
          return (
            <TableCell key={criteriaIndex} align="center">
              <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
                <Select
                  value={selectedItems[itemId]?.data?.linguisticTerm || ""}
                  onChange={(event) => handleSelectChange(event, itemId)}
                >
                  {linguisticTerms.map((option, optionIndex) => (
                    <MenuItem key={optionIndex} value={option.linguisticTerm}>
                      {option.linguisticTerm}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
          );
        }
      );

      return (
        <TableRow key={alternativeIndex}>
          <TableCell align="center">{alternativeName}</TableCell>
          {criterionCells}
        </TableRow>
      );
    });
  });

  return (
    <Box
      component={Paper}
      sx={{
        p: 1.5,
        border: "1px solid #d5d5d5",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "flex-start",
        marginTop: "20px",
      }}
    >
      <Typography variant="h3">Experts estimations</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
          paddingLeft: "8px",
        }}
      >
        <Typography variant="h4" sx={{ fontFamily: "Reenie Beanie" }}>
          {names.expertNames[currentExpert]}
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Alternatives</TableCell>

              {names.criteriaNames.map((criteriaName, criteriaIndex) => (
                <TableCell align="center" key={criteriaIndex}>
                  {criteriaName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{MenuItems}</TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          onClick={handleSetExpertEstimations}
          variant="contained"
          color="gray"
        >
          Use Fuzzy Aras magic ✨🧙🏻‍♂️
        </Button>

        <Pagination
          count={Math.ceil(names.expertNames.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}
