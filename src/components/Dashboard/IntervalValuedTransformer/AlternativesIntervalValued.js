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
  aggregatedEstimations,
}) {
  const criteriaEstimation = useSelector(
    (state) => state.criteriaEstimationConfiguration
  );

  const names = useSelector((state) => state.nameConfiguration);

  const [isDetailsShown, setIsDetailsShown] = React.useState(false);

  const itemsPerPage = names.criteriaNames.length;
  const [currentPage, setCurrentPage] = React.useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const MenuItemsIntervalValuedNumbers = Object.keys(
    alternativesIntervalValuedNumbers
  ).map((alternativeKey, index) => {
    const currentItem = alternativesIntervalValuedNumbers[alternativeKey];
    const [, criteriaKey] = alternativeKey.split("-")[1];

    const intervalValued = currentItem.map((estimation, index) => (
      <TableCell align="center" key={index}>
        {estimation.toFixed(2)}
      </TableCell>
    ));

    return (
      <TableRow key={index}>
        <TableCell align="center">
          {names.criteriaNames[criteriaKey - 1]}
        </TableCell>
        {intervalValued}
      </TableRow>
    );
  });

  const slicedMenuItems = MenuItemsIntervalValuedNumbers.slice(
    startIndex,
    endIndex
  );

  const MenuItemsConfines = names.alternativeNames.map(
    (alternativeName, alternativeIndex) => {
      const criterionCells = names.criteriaNames.map(
        (criteriaName, criteriaIndex) => {
          const itemId = `a${alternativeIndex + 1}-c${criteriaIndex + 1}`;
          const normalizedConfines = aggregatedEstimations[itemId]?.data?.map(
            (estimation, estimationIndex) => (
              <div
                key={estimationIndex}
                style={{
                  textAlign: "center",
                }}
              >
                [
                {estimation?.normalizedConfines
                  ?.map((number) => number.toFixed(2))
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
              {normalizedConfines}
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
          {/* <TableHead>
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
          </TableHead> */}
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

      {isDetailsShown && (
        <>
          <Typography variant="h6">
            Alternatives aggregated estimations
          </Typography>
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
