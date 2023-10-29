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
export default function AlternativesIntervalValued({
  alternativesIntervalValuedNumbers,
}) {
  const criteriaEstimation = useSelector(
    (state) => state.criteriaEstimationConfiguration
  );

  const names = useSelector((state) => state.nameConfiguration);

  const [isDetailsShown, setIsDetailsShown] = React.useState(false);
  const [criteriaIntervalValuedNames, setCriteriaIntervalValuedNames] =
    React.useState(["Criteria 👑", ...names.criteriaNames]);

  React.useEffect(() => {
    setCriteriaIntervalValuedNames(["Criteria 👑", ...names.criteriaNames]);
  }, [names]);

  const itemsPerPage = names.criteriaNames.length;
  const [currentPage, setCurrentPage] = React.useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const MenuItemsIntervalValuedNumbers = Object.keys(
    alternativesIntervalValuedNumbers
  ).map((itemId, itemIndex) => {
    return (
      <TableRow key={itemIndex}>
        {criteriaIntervalValuedNames.map((criteriaName, criteriaIndex) => (
          <TableCell align="center" key={criteriaIndex}>
            {alternativesIntervalValuedNumbers[itemId][criteriaIndex].toFixed(
              2
            )}
          </TableCell>
        ))}
      </TableRow>
    );
  });

  const slicedMenuItems = MenuItemsIntervalValuedNumbers.slice(
    startIndex,
    endIndex
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
      <Typography variant="h5">Alternatives interval-valued numbers</Typography>

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
        {names.alternativeNames[currentPage - 1]}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Criteria</TableCell>

              {criteriaIntervalValuedNames.map(
                (criteriaName, criteriaIndex) => (
                  <TableCell align="center" key={criteriaIndex}>
                    {criteriaName}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>{slicedMenuItems}</TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(
          Object.keys(alternativesIntervalValuedNumbers).length / itemsPerPage
        )}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />

      {isDetailsShown && <></>}

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
