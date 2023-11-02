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

import { IoTrendingUp, IoTrendingDown } from "react-icons/io5";
export default function CriteriaOptimalValued({
  criteriaOptimalValuedNumbers,
}) {
  const maxMin = useSelector((state) => state.maxMinConfiguration);

  const names = useSelector((state) => state.nameConfiguration);

  const MenuItemsOptimalValuedNumbers = names.criteriaNames.map(
    (criteriaName, criteriaIndex) => {
      const itemId = `c${criteriaIndex + 1}`;

      const optimalValued = criteriaOptimalValuedNumbers[itemId]?.map(
        (estimation, index) => (
          <TableCell align="center" key={index}>
            {estimation.toFixed(2)}
          </TableCell>
        )
      );

      return (
        <TableRow key={criteriaIndex}>
          <TableCell align="center">{criteriaName}</TableCell>
          {optimalValued}

          <TableCell align="center">
            {maxMin.maxMin[itemId] == "Max" ? (
              <IoTrendingUp />
            ) : (
              <IoTrendingDown />
            )}
          </TableCell>
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
      <Typography variant="h5">Criteria optimal-valued numbers</Typography>

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
          <TableBody>{MenuItemsOptimalValuedNumbers}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
