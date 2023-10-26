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
  Button,
} from "@mui/material";

import { IoChevronDown, IoChevronUp } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";

export default function ExpertsEstimations({ aggregatedEstimations }) {
  const names = useSelector((state) => state.nameConfiguration);

  const [isDetailsShown, setIsDetailsShown] = React.useState(false);

  const MenuItemsTerms = names.alternativeNames.map(
    (alternativeName, alternativeIndex) => {
      const criterionCells = names.criteriaNames.map(
        (criteriaName, criteriaIndex) => {
          const itemId = `a${alternativeIndex + 1}-c${criteriaIndex + 1}`;
          const linguisticTerms = aggregatedEstimations[itemId]?.data.map(
            (estimation) => (
              <div
                style={{
                  textAlign: "center",
                  padding: "5px",
                  border: "1px solid #d5d5d5",
                  backgroundColor: "#ebebeb",
                  margin: "3px",
                  borderRadius: "5px",
                }}
              >
                {estimation.linguisticTerm}
              </div>
            )
          );

          return (
            <TableCell
              key={criteriaIndex}
              align="center"
              sx={{ minWidth: "115px" }}
            >
              {linguisticTerms}
            </TableCell>
          );
        }
      );

      return (
        <TableRow key={alternativeIndex}>
          <TableCell align="center" sx={{ minWidth: "115px" }}>
            {alternativeName}
          </TableCell>
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
          const confines = aggregatedEstimations[itemId]?.data.map(
            (estimation) => (
              <div
                style={{
                  textAlign: "center",
                }}
              >
                [
                {estimation.confines
                  .map((number) => number.toFixed(2))
                  .join(", ")}
                ]
              </div>
            )
          );

          return (
            <TableCell
              key={criteriaIndex}
              align="center"
              sx={{ minWidth: "115px" }}
            >
              {confines}
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

      {isDetailsShown && (
        <>
          <Typography variant="h6">Triangular form:</Typography>
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
        </>
      )}

      <Button
        color="gray"
        startIcon={isDetailsShown ? <IoChevronUp /> : <IoChevronDown />}
        onClick={() => setIsDetailsShown((prev) => !prev)}
      >
        {isDetailsShown ? "Hide" : "Show"} details
      </Button>
    </Box>
  );
}
