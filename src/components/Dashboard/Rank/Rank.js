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

import { IoArrowBack } from "react-icons/io5";

export default function Rank({ utilityDegree }) {
  const names = useSelector((state) => state.nameConfiguration);

  const [alternativesUtilityDegreeNames, setalternativesUtilityDegreeNames] =
    React.useState(["Alternative👑", ...names.alternativeNames]);

  React.useEffect(() => {
    setalternativesUtilityDegreeNames([
      "Alternative👑",
      ...names.alternativeNames,
    ]);
  }, [names]);

  const dataArray = Object.entries(utilityDegree);

  // Sort the array based on the numerical values
  dataArray.sort((a, b) => b[1] - a[1]);

  dataArray.shift();

  const sortedObject = Object.fromEntries(dataArray);
  const [, alternativeIndex] = dataArray[1][0].split("");

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
      <Typography variant="h5"> Ranked alternatives</Typography>
      <Box
        component={Paper}
        sx={{
          p: 1.5,
          border: "1px solid  #d5d5d5",
          backgroundColor: "#ebebeb",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {dataArray.map((item, index) => {
          const [, alternativeKey] = item[0].split("");

          return (
            <div key={`${index}`}>
              {names.alternativeNames[alternativeKey - 2]}{" "}
              {dataArray[index + 1] ? (
                dataArray[index][1] === dataArray[index + 1][1] ? (
                  "="
                ) : (
                  <IoArrowBack />
                )
              ) : null}
            </div>
          );
        })}
      </Box>
    </Box>
  );
}
