import React from "react";

import Box from "@mui/material/Box";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

export default function ExpertsEstimations({ aggregatedEstimations }) {
  const names = useSelector((state) => state.nameConfiguration);

  const MenuItemsTerms = names.alternativeNames.map(
    (alternativeName, alternativeIndex) => {
      const criterionCells = names.criteriaNames.map(
        (criteriaName, criteriaIndex) => {
          const itemId = `a${alternativeIndex + 1}-c${criteriaIndex + 1}`;
          const linguisticTerms = aggregatedEstimations[itemId]?.data
            .map((estimation) => estimation.linguisticTerm)
            .join(", ");

          return (
            <TableCell key={criteriaIndex} align="left">
              {linguisticTerms}
            </TableCell>
          );
        }
      );

      return (
        <TableRow key={alternativeIndex}>
          <TableCell align="left">{alternativeName}</TableCell>
          {criterionCells}
        </TableRow>
      );
    }
  );

  const MenuItemsConfines = names.alternativeNames.map(
    (alternativeName, alternativeIndex) => {
      const criterionCells = names.criteriaNames.map(
        (criteriaName, criteriaIndex) => {
          const itemId = `a${alternativeIndex + 1}-c${criteriaIndex + 1}`;
          const confines = aggregatedEstimations[itemId]?.data
            .map((estimation) => `[${estimation.confines}]`)
            .join(", ");

          return (
            <TableCell key={criteriaIndex} align="left">
              {confines}
            </TableCell>
          );
        }
      );

      return (
        <TableRow key={alternativeIndex}>
          <TableCell align="left">{alternativeName}</TableCell>
          {criterionCells}
        </TableRow>
      );
    }
  );

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
      <Typography variant="h5">Aggregated estimations</Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
          paddingLeft: "8px",
        }}
      ></Box>
      {/* <Typography variant="h6">Linguistic terms form:</Typography> */}
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
          <TableBody>{MenuItemsTerms}</TableBody>
        </Table>
      </TableContainer>
      {/* <Typography variant="h6">Triangular form:</Typography> */}
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
          <TableBody>{MenuItemsConfines}</TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "left",
          gap: "8px",
          flexWrap: "wrap",
        }}
      ></Box>
    </Box>
  );
}
