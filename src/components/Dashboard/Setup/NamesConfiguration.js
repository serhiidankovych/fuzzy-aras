import * as React from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { IoArrowForward, IoArrowBackOutline } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { setNameConfiguration } from "../../../store/actions/nameConfigurationActions";
import { setCriteriaConfiguration } from "../../../store/actions/criteriaConfigurationActions";
import { setAlternativeConfiguration } from "../../../store/actions/alternativeConfigurationActions";
// import { setCriteriaEstimationConfiguration } from "../../../store/actions/criteriaEstimationConfigurationActions";

import { generateExpertEstimations } from "../../../utils/expertEstimations";
import { generateTriangularValues } from "../../../utils/linguisticTerms";

export default function NamesConfiguration({ handleSetupStep }) {
  const generatedNames = useSelector((state) => state.nameConfiguration);
  const [tab, setTab] = React.useState("1");
  const [names, setNames] = React.useState(generatedNames || []);

  const dispatch = useDispatch();

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleNameChange = (nameKey, index, value) => {
    setNames((prevNames) => {
      const updatedNames = {
        ...prevNames,
        [nameKey]: prevNames[nameKey].map((item, i) =>
          i === index ? value : item
        ),
      };
      return updatedNames;
    });
  };

  const renderNameInputs = (nameArray, nameType, label) => {
    return nameArray.map((name, index) => (
      <TextField
        id={`${label}${index + 1}`}
        label={`${label}${index + 1}`}
        key={`${label}-${index}`}
        value={name}
        variant="outlined"
        type="text"
        onChange={(event) =>
          handleNameChange(nameType, index, event.target.value)
        }
      />
    ));
  };

  const generateLinguisticTerms = (
    names,
    type,
    key,
    generatedTriangularValues
  ) => {
    const generatedLinguisticTerms = [];

    for (let i = 0; i < names[key]?.length; i++) {
      generatedLinguisticTerms.push({
        id: i,
        linguisticTerm: names[key][i],
        confines: generatedTriangularValues[i],
        type: type,
      });
    }

    return generatedLinguisticTerms;
  };

  const handleSetNames = () => {
    const {
      alternativeNames,
      criteriaNames,
      linguisticTermsForAlternativesNames,
      linguisticTermsForCriteriaNames,
      expertNames,
    } = names;

    const generatedCriteriaTriangularValues = generateTriangularValues(
      names?.linguisticTermsForCriteriaNames?.length,
      1
    );
    const generatedAlternativesTriangularValues = generateTriangularValues(
      names?.linguisticTermsForAlternativesNames?.length,
      1
    );

    const generatedCriteriaLinguisticTerms = generateLinguisticTerms(
      names,
      "lt-criteria",
      "linguisticTermsForCriteriaNames",
      generatedCriteriaTriangularValues
    );

    const generatedAlternativeLinguisticTerms = generateLinguisticTerms(
      names,
      "lt-alternative",
      "linguisticTermsForAlternativesNames",
      generatedAlternativesTriangularValues
    );

    dispatch(
      setNameConfiguration(
        alternativeNames,
        criteriaNames,
        linguisticTermsForAlternativesNames,
        linguisticTermsForCriteriaNames,
        expertNames
      )
    );
    dispatch(setCriteriaConfiguration([...generatedCriteriaLinguisticTerms]));

    dispatch(
      setAlternativeConfiguration([...generatedAlternativeLinguisticTerms])
    );
    // const generatedCriteriaExpertEstimations = generateExpertEstimations(
    //   names,
    //   "experts"
    // );

    // dispatch(
    //   setCriteriaEstimationConfiguration(generatedCriteriaExpertEstimations)
    // );

    handleSetupStep(true);
  };

  return (
    <>
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
        <Typography variant="h6">Provide input names</Typography>
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
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="generatedNames"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                textColor="inherit"
                indicatorColor="secondary"
              >
                <Tab label="Alternatives" value="1" />
                <Tab label="Criteria" value="2" />
                <Tab label="Alternatives LT" value="3" />
                <Tab label="Criteria LT" value="4" />
                <Tab label="Experts" value="5" />
              </TabList>
            </Box>
            <Box
              component="span"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TabPanel value="1">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {names?.alternativeNames?.length > 0 &&
                    renderNameInputs(
                      names?.alternativeNames,
                      "alternativeNames",
                      "a"
                    )}
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {names?.criteriaNames?.length > 0 &&
                    renderNameInputs(
                      names?.criteriaNames,
                      "criteriaNames",
                      "c"
                    )}
                </Box>
              </TabPanel>
              <TabPanel value="3">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {names?.linguisticTermsForAlternativesNames?.length > 0 &&
                    renderNameInputs(
                      names?.linguisticTermsForAlternativesNames,
                      "linguisticTermsForAlternativesNames",
                      "aLT"
                    )}
                </Box>
              </TabPanel>
              <TabPanel value="4">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {names?.linguisticTermsForCriteriaNames?.length > 0 &&
                    renderNameInputs(
                      names?.linguisticTermsForCriteriaNames,
                      "linguisticTermsForCriteriaNames",
                      "cLT"
                    )}
                </Box>
              </TabPanel>
              <TabPanel value="5">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {names?.expertNames?.length > 0 &&
                    renderNameInputs(names.expertNames, "expertNames", "e")}
                </Box>
              </TabPanel>
            </Box>
          </TabContext>
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
            onClick={handleSetNames}
            endIcon={<IoArrowForward />}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}
