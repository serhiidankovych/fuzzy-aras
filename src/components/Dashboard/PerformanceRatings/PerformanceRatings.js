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
  TablePagination,
  Pagination,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { BsConeStriped } from "react-icons/bs";
export default function PerformanceRatings({ performanceRatings }) {
  const names = useSelector((state) => state.nameConfiguration);

  const [criteriaIntervalValuedNames, setCriteriaIntervalValuedNames] =
    React.useState(["Criteria👑", ...names.criteriaNames]);

  React.useEffect(() => {
    setCriteriaIntervalValuedNames(["Criteria👑", ...names.criteriaNames]);
  }, [names]);

  const MenuItemsConfines = names.alternativeNames.map(
    (alternativeName, alternativeIndex) => {
      const itemId = `a${alternativeIndex + 1}`;
      console.log(itemId);

      const ratings = performanceRatings[itemId]?.map((estimation) => (
        <TableCell align="center">{estimation.toFixed(2)}</TableCell>
      ));

      return (
        <TableRow key={alternativeIndex}>
          <TableCell align="center">{alternativeName}</TableCell>
          {ratings}
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
      <Typography variant="h5">Overall performance ratings</Typography>

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
              <TableCell align="center">Alternatives</TableCell>

              {criteriaIntervalValuedNames.map(
                (criteriaName, criteriaIndex) => (
                  <TableCell align="center" key={criteriaIndex}>
                    {criteriaName}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>{MenuItemsConfines}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
