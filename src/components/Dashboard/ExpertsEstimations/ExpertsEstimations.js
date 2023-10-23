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
import { expertsEstimations } from "../../../templates/dataset1";

export default function ExpertsEstimations({ handleSetupStep }) {
  const alternativesLinguisticTerms = useSelector(
    (state) => state.alternativeConfiguration
  );

  const names = useSelector((state) => state.nameConfiguration);
  // const expertsEstimations = useSelector(
  //   (state) => state.expertsEstimationConfiguration
  // );
  const dispatch = useDispatch();
  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = React.useState(1);
  // const [selectedItems, setSelectedItems] = React.useState(
  //   expertsEstimations.expertsEstimation || {}
  // );
  const [selectedItems, setSelectedItems] = React.useState(expertsEstimations);
  console.log(selectedItems);

  React.useEffect(() => {
    setSelectedItems(expertsEstimations);
  }, [expertsEstimations]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExpert = names.expertIndices.slice(startIndex, endIndex);

  const handleSetExpertEstimations = () => {
    console.log("transform");
    dispatch(setExpertsEstimationConfiguration(selectedItems));
  };
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSelectChange = (event, itemId) => {
    const { value } = event.target;
    const updatedSelectedItems = { ...selectedItems };
    updatedSelectedItems[itemId].data.linguisticTerm = value;
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
                  value={selectedItems[itemId]?.data.linguisticTerm}
                  onChange={(event) => handleSelectChange(event, itemId)}
                >
                  {alternativesLinguisticTerms.alternativeLinguisticTerms.map(
                    (option) => (
                      <MenuItem
                        key={option.linguisticTerm}
                        value={option.linguisticTerm}
                      >
                        {option.linguisticTerm}
                      </MenuItem>
                    )
                  )}
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
        margin: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <Pagination
          count={Math.ceil(names.expertNames.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
        <Typography variant="h6">Expert: </Typography>
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

      <Button
        onClick={handleSetExpertEstimations}
        variant="contained"
        color="gray"
      >
        Use Fuzzy Aras magic ✨🧙🏻‍♂️
      </Button>
    </Box>
  );
}
