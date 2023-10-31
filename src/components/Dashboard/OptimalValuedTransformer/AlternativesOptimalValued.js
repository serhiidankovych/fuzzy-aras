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
export default function AlternativesOptimalValued({
  alternativesOptimalValuedNumbers,
}) {
  const criteriaEstimation = useSelector(
    (state) => state.criteriaEstimationConfiguration
  );

  const names = useSelector((state) => state.nameConfiguration);

  const [isDetailsShown, setIsDetailsShown] = React.useState(false);
  const [criteriaOptimalValuedNames, setCriteriaOptimalValuedNames] =
    React.useState(["Criteria👑", ...names.criteriaNames]);
  const [alternativesOptimalValuedNames, setAlternativesOptimalValuedNames] =
    React.useState(["Alternative👑", ...names.alternativeNames]);

  React.useEffect(() => {
    setCriteriaOptimalValuedNames(["Criteria👑", ...names.criteriaNames]);
  }, [names]);
  React.useEffect(() => {
    setAlternativesOptimalValuedNames([
      "Alternative👑",
      ...names.alternativeNames,
    ]);
  }, [names]);

  const itemsPerPage = 1;
  console.log(itemsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const MenuItemsOptimalValuedNumbers = Object.keys(
    alternativesOptimalValuedNumbers
  ).map((itemId, itemIndex) => {
    const alternativeKey = itemId.charAt(1);
    console.log(alternativeKey);
    const alternativeName = alternativesOptimalValuedNames[alternativeKey - 1];
    const subArrays = alternativesOptimalValuedNumbers[itemId];
    const elementsReversed = subArrays.map((subArray, rowIndex) => (
      <TableRow key={rowIndex}>
        <TableCell align="center">
          {alternativesOptimalValuedNames[rowIndex]}
        </TableCell>
        {subArray.map((element, columnIndex) => (
          <TableCell align="center" key={columnIndex}>
            {element.toFixed(5)}
          </TableCell>
        ))}
      </TableRow>
    ));

    return elementsReversed; // Make sure to return the components to render
  });

  const slicedMenuItems = MenuItemsOptimalValuedNumbers.slice(
    startIndex,
    endIndex
  );
  //   const slicedMenuItems = MenuItemsOptimalValuedNumbers;

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
      <Typography variant="h5">Alternatives optimal-valued numbers</Typography>

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
      <Typography variant="h4" fontFamily={"Reenie Beanie"}>
        {names.criteriaNames[currentPage - 1]}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Alternatives</TableCell>

              {criteriaOptimalValuedNames.map((criteriaName, criteriaIndex) => (
                <TableCell align="center" key={criteriaIndex}>
                  {criteriaName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{slicedMenuItems}</TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(
          Object.keys(alternativesOptimalValuedNumbers).length / itemsPerPage
        )}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
}
