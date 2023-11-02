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
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

export default function UtilityDegree({ utilityDegree }) {
  const names = useSelector((state) => state.nameConfiguration);

  const [alternativesUtilityDegreeNames, setalternativesUtilityDegreeNames] =
    React.useState(["Alternative👑", ...names.alternativeNames]);

  React.useEffect(() => {
    setalternativesUtilityDegreeNames([
      "Alternative👑",
      ...names.alternativeNames,
    ]);
  }, [names]);
  const MenuItemsConfines = alternativesUtilityDegreeNames.map(
    (alternativeName, alternativeIndex) => {
      const itemId = `a${alternativeIndex + 1}`;

      const ratings = utilityDegree[itemId].toFixed(4);

      return (
        <TableRow key={alternativeIndex}>
          <TableCell align="center">{alternativeName}</TableCell>
          <TableCell align="center">{ratings}</TableCell>
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
      <Typography variant="h5"> Utility degree</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Alternatives</TableCell>
              <TableCell align="center">Crisp values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{MenuItemsConfines}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
