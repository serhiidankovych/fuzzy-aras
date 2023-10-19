import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { IoArrowForward, IoArrowBackOutline } from "react-icons/io5";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useDispatch, useSelector } from "react-redux";
import { setNumberConfiguration } from "../../../store/actions/numberConfigurationActions";
import { setNameConfiguration } from "../../../store/actions/nameConfigurationActions";
import { setCriteriaConfiguration } from "../../../store/actions/criteriaConfigurationActions";

export default function CriteriaConfiguration({ handleSetupStep }) {
  const generatedCriteriaLinguisticTerms = useSelector(
    (state) => state.criteriaConfiguration
  );
  const dispatch = useDispatch();

  const [criteria, setCriteria] = React.useState(
    generatedCriteriaLinguisticTerms.criteriaLinguisticTerms || []
  );

  useEffect(() => {
    transformToTriangleForm();
  }, []);

  const normalizeValue = (value, minTriangularNumber, maxTriangularNumber) => {
    if (value === 0 && minTriangularNumber === 0 && maxTriangularNumber === 0) {
      return 0;
    } else {
      return (
        (value - minTriangularNumber) /
        (maxTriangularNumber - minTriangularNumber)
      );
    }
  };
  //refactor code
  const transformToTriangleForm = () => {
    let minTriangularNumber = Infinity; // Initialize with a high value
    let maxTriangularNumber = -Infinity; // Initialize with a low value

    const triangularNumbers = criteria?.map((linguisticTerm) => {
      const { confines } = linguisticTerm;
      return {
        ...linguisticTerm,
        triangularChart: [
          { x: confines[0], y: 0 },
          { x: confines[1], y: 1 },
          { x: confines[2], y: 0 },
        ],
      };
    });

    triangularNumbers?.forEach((triangularNumber) => {
      const { triangularChart } = triangularNumber;
      triangularChart.forEach((point) => {
        minTriangularNumber = Math.min(minTriangularNumber, point.x);
        maxTriangularNumber = Math.max(maxTriangularNumber, point.x);
      });
    });

    const triangularNumbersNormalized = triangularNumbers?.map(
      (linguisticTerm) => {
        const { confines } = linguisticTerm;
        return {
          ...linguisticTerm,
          normalizedConfines: [
            normalizeValue(
              confines[0],
              minTriangularNumber,
              maxTriangularNumber
            ),
            normalizeValue(
              confines[1],
              minTriangularNumber,
              maxTriangularNumber
            ),
            normalizeValue(
              confines[2],
              minTriangularNumber,
              maxTriangularNumber
            ),
          ],
          normalizedTriangularChart: [
            {
              x: normalizeValue(
                confines[0],
                minTriangularNumber,
                maxTriangularNumber
              ),
              y: 0,
            },
            {
              x: normalizeValue(
                confines[1],
                minTriangularNumber,
                maxTriangularNumber
              ),
              y: 1,
            },
            {
              x: normalizeValue(
                confines[2],
                minTriangularNumber,
                maxTriangularNumber
              ),
              y: 0,
            },
          ],
        };
      }
    );
    console.log(triangularNumbersNormalized);
    setCriteria(triangularNumbersNormalized);
  };

  const renderInputs = (criteria, nameType) => {
    console.log(criteria);
    return criteria?.map((linguisticTerm, index) => (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        key={index}
      >
        <TextField
          id={`${nameType}${index + 1}-left`}
          label={`${linguisticTerm.linguisticTerm}`}
          key={`${nameType}-${index}-left`}
          variant="outlined"
          type="number"
          value={linguisticTerm.confines[0]}
          //   onChange={(e) =>
          //     handleLinguisticTermsChange(index, e.target.value, 0)
          //   }
        />
        <TextField
          id={`${nameType}${index + 1}`}
          key={`${nameType}-${index}-middle`}
          variant="outlined"
          type="number"
          value={linguisticTerm.confines[1]}
          //   onChange={(e) =>
          //     handleLinguisticTermsChange(index, e.target.value, 1)
          //   }
        />
        <TextField
          id={`${nameType}${index + 1}-right`}
          key={`${nameType}-${index}-right`}
          variant="outlined"
          type="number"
          value={linguisticTerm.confines[2]}
          //   onChange={(e) =>
          //     handleLinguisticTermsChange(index, e.target.value, 2)
          //   }
        />
      </Stack>
    ));
  };

  function generateContrastColor(index, total) {
    // Calculate hue to evenly distribute colors in the color spectrum
    const hue = (360 / total) * index;

    // Convert HSL to RGB color
    const h = hue / 360;
    const r = Math.round(255 * hue2rgb(h + 1 / 3));
    const g = Math.round(255 * hue2rgb(h));
    const b = Math.round(255 * hue2rgb(h - 1 / 3));

    return `rgb(${r}, ${g}, ${b})`;
  }

  function hue2rgb(p) {
    if (p < 0) p += 1;
    if (p > 1) p -= 1;
    if (p < 1 / 6) return 6 * p;
    if (p < 0.5) return 1;
    if (p < 2 / 3) return (2 / 3 - p) * 6;
    return 0;
  }

  const numberOfSets = criteria?.length;
  const contrastColors = Array.from({ length: numberOfSets }, (_, index) =>
    generateContrastColor(index, numberOfSets)
  );

  return (
    <Box
      sx={{
        p: 1.5,
        border: "1px solid #d5d5d5",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Typography variant="h6">Provide input criteria LT</Typography>
      <Box
        sx={{
          p: 1.5,
          border: "1px solid #d5d5d5",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {renderInputs(criteria, "criteria", "lt")}
      </Box>
      <Typography>Linguistic terms:</Typography>
      <Box
        component="span"
        sx={{
          p: 1.5,
          border: "1px solid #d5d5d5",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        <ResponsiveContainer width="80%" height={150}>
          <ScatterChart>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" />
            <YAxis type="number" dataKey="y" />
            <ZAxis type="number" range={[100]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />

            {criteria.map((linguisticTerm, index) => (
              <Scatter
                key={index}
                fill={contrastColors[index]}
                data={linguisticTerm.triangularChart}
                line
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </Box>
      <Typography>~Linguistic terms:</Typography>
      <Box
        component="span"
        sx={{
          p: 1.5,
          border: "1px solid #d5d5d5",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        <ResponsiveContainer width="80%" height={150}>
          <ScatterChart>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" />
            <YAxis type="number" dataKey="y" />
            <ZAxis type="number" range={[100]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />

            {criteria.map((linguisticTerm, index) => (
              <Scatter
                key={index}
                fill={contrastColors[index]}
                data={linguisticTerm.normalizedTriangularChart}
                line
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          color="gray"
          onClick={() => handleSetupStep(false)}
          startIcon={<IoArrowBackOutline />}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="gray"
          // onClick={handleSetNames}
          endIcon={<IoArrowForward />}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
