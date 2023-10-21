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
} from "@mui/material";

import { IoArrowForward, IoArrowBackOutline } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";

export default function CriteriaEstimationConfiguration({
  handleSetupStep,
  setIsSetupFinised,
}) {
  const generatedCriteriaEstimation = useSelector(
    (state) => state.criteriaEstimationConfiguration
  );

  const criteriaLinguisticTerms = useSelector(
    (state) => state.criteriaConfiguration
  );

  const names = useSelector((state) => state.nameConfiguration);

  const [criteriaEstimations, setCriteriaEstimations] = React.useState(
    generatedCriteriaEstimation.criteriaEstimation || []
  );

  const itemsPerPage = 1;

  const [currentPage, setCurrentPage] = React.useState(1);

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page's data
  const currentExpert = names.expertIndices.slice(startIndex, endIndex);

  const handleSetCriteriaEstimations = () => {
    setIsSetupFinised(true);
  };
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const [selectedItems, setSelectedItems] = React.useState({});

  const handleSelectChange = (event, id) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };

  const MenuItems = currentExpert.map((expertName, expertIndex) =>
    names.criteriaNames.map((criteriaName, criteriaIndex) => (
      <TableRow key={`${currentExpert}-${criteriaIndex}`}>
        <TableCell>{names.expertNames[expertName]}</TableCell>
        <TableCell>{criteriaName}</TableCell>
        <TableCell>
          <Select
            value={
              selectedItems[
                `e${Number(currentExpert) + 1}-c${criteriaIndex + 1}`
              ] || ""
            }
            onChange={(event) =>
              handleSelectChange(
                event,
                `e${Number(currentExpert) + 1}-c${criteriaIndex + 1}`
              )
            }
          >
            {criteriaLinguisticTerms.criteriaLinguisticTerms.map((option) => (
              <MenuItem key={option.linguisticTerm} value={option}>
                {option.linguisticTerm}
              </MenuItem>
            ))}
          </Select>
        </TableCell>
      </TableRow>
    ))
  );

  return (
    <Box
      sx={{
        p: 1.5,
        border: "1px solid #d5d5d5",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Typography variant="h6">Provide criteria estimations</Typography>
      <TableContainer sx={{ border: "1px solid #d5d5d5", borderRadius: "8px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Experts</TableCell>
              <TableCell align="center">Criteria</TableCell>
              <TableCell align="center">LT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{MenuItems}</TableBody>
        </Table>
      </TableContainer>
      <Typography>Experts:</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={Math.ceil(names.expertNames.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          color="gray"
          onClick={() => handleSetupStep(false)}
          startIcon={<IoArrowBackOutline />}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="gray"
          onClick={handleSetCriteriaEstimations}
          endIcon={<IoArrowForward />}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
