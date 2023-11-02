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

import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { BsConeStriped } from "react-icons/bs";
export default function Defuzzification({ defuzzification }) {
  const names = useSelector((state) => state.nameConfiguration);

  const [
    alternativesDefuzzificationNames,
    setalternativesDefuzzificationNames,
  ] = React.useState(["Alternative👑", ...names.alternativeNames]);

  React.useEffect(() => {
    setalternativesDefuzzificationNames([
      "Alternative👑",
      ...names.alternativeNames,
    ]);
  }, [names]);
  const MenuItemsConfines = alternativesDefuzzificationNames.map(
    (alternativeName, alternativeIndex) => {
      const itemId = `a${alternativeIndex + 1}`;

      const ratings = defuzzification[itemId].toFixed(4);

      return (
        <TableRow key={alternativeIndex}>
          <TableCell align="center">{alternativeName}</TableCell>
          <TableCell align="center">{ratings}</TableCell>
        </TableRow>
      );
    }
  );

  const [defuzzificationMethod, setDefuzzificationMethod] = React.useState(
    "Weighted Average Method"
  );

  const handleChange = (event) => {
    setDefuzzificationMethod(event.target.value);
  };

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
      <Typography variant="h5"> Defuzzification</Typography>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={defuzzificationMethod}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value={"Weighted Average Method"}>
            Weighted Average Method
          </MenuItem>
        </Select>
      </FormControl>

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
