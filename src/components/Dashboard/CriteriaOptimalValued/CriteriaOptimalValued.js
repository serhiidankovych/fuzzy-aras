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
export default function CriteriaOptimalValued({
  criteriaOptimalValuedNumbers,
}) {
  const criteriaEstimation = useSelector(
    (state) => state.criteriaEstimationConfiguration
  );

  const names = useSelector((state) => state.nameConfiguration);

  const [isDetailsShown, setIsDetailsShown] = React.useState(false);
  const [criteriaOptimalValuedNames, setCriteriaOptimalValuedNames] =
    React.useState(["Criteria👑", ...names.criteriaNames]);

  React.useEffect(() => {
    setCriteriaOptimalValuedNames(["Criteria👑", ...names.criteriaNames]);
  }, [names]);

  const MenuItemsOptimalValuedNumbers = Object.keys(
    criteriaOptimalValuedNumbers
  ).map((itemId, itemIndex) => (
    <TableRow key={itemIndex}>
      <TableCell align="center">{names.criteriaNames[itemIndex]}</TableCell>
      {criteriaOptimalValuedNames.map((criteriaName, criteriaIndex) => (
        <TableCell align="center" key={criteriaIndex}>
          {criteriaOptimalValuedNumbers[itemId][criteriaIndex].toFixed(2)}
        </TableCell>
      ))}
    </TableRow>
  ));

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
      <Typography variant="h5">Criteria optimal-valued</Typography>

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
              <TableCell align="center">Criteria</TableCell>

              {criteriaOptimalValuedNames.map((criteriaName, criteriaIndex) => (
                <TableCell align="center" key={criteriaIndex}>
                  {criteriaName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{MenuItemsOptimalValuedNumbers}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
