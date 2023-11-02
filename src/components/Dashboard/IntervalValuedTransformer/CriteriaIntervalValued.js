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

import { useDispatch, useSelector } from "react-redux";

import { IoChevronDown, IoChevronUp } from "react-icons/io5";
export default function CriteriaIntervalValued({
  criteriaIntervalValuedNumbers,
}) {
  const criteriaEstimation = useSelector(
    (state) => state.criteriaEstimationConfiguration
  );

  const names = useSelector((state) => state.nameConfiguration);

  const [isDetailsShown, setIsDetailsShown] = React.useState(false);

  const MenuItemsCriteriaEstimation = names.expertNames.map(
    (expertName, expertIndex) => {
      const criterionCells = names.criteriaNames.map(
        (criteriaName, criteriaIndex) => {
          const itemId = `e${expertIndex + 1}-c${criteriaIndex + 1}`;
          const normalizedConfines = criteriaEstimation.criteriaEstimation[
            itemId
          ]?.normalizedConfines
            .map((border) => border.toFixed(2))
            .join(",");

          return (
            <TableCell
              key={criteriaIndex}
              align="center"
              sx={{ minWidth: "115px" }}
            >
              [{normalizedConfines}]
            </TableCell>
          );
        }
      );

      return (
        <TableRow key={expertIndex}>
          <TableCell align="center">{expertName}</TableCell>
          {criterionCells}
        </TableRow>
      );
    }
  );

  const MenuItemsIntervalValuedNumbers = names.criteriaNames.map(
    (criteriaName, criteriaIndex) => {
      const itemId = `c${criteriaIndex + 1}`;

      const intervalValued = criteriaIntervalValuedNumbers[itemId]?.map(
        (estimation, index) => (
          <TableCell align="center" key={index}>
            {estimation.toFixed(2)}
          </TableCell>
        )
      );

      return (
        <TableRow key={criteriaIndex}>
          <TableCell align="center">{criteriaName}</TableCell>
          {intervalValued}
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
      <Typography variant="h5">Criteria interval-valued numbers</Typography>

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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell align="center">Criteria</TableCell> */}

              {/* {criteriaIntervalValuedNames.map(
                (criteriaName, criteriaIndex) => (
                  <TableCell align="center" key={criteriaIndex}>
                    {criteriaName}
                  </TableCell>
                )
              )} */}
            </TableRow>
          </TableHead>
          <TableBody>{MenuItemsIntervalValuedNumbers}</TableBody>
        </Table>
      </TableContainer>

      {isDetailsShown && (
        <>
          <Typography variant="h6">Criteria estimations</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Experts</TableCell>

                  {names.criteriaNames.map((criteriaName, criteriaIndex) => (
                    <TableCell align="center" key={criteriaIndex}>
                      {criteriaName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{MenuItemsCriteriaEstimation}</TableBody>
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
