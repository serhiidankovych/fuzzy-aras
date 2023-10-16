import * as React from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function NameConfiguration({ handleSetupStep }) {
  const [tab, setTab] = React.useState("1");

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const [alternativeNames, setAlternativeNames] = React.useState([]);
  const [criteriaNames, setCriteriaNames] = React.useState([]);
  const [
    linguisticTermsForAlternativesNames,
    setLinguisticTermsForAlternativesNames,
  ] = React.useState([]);
  const [linguisticTermsForCriteriaNames, setLinguisticTermsForCriteriaNames] =
    React.useState([]);
  const [expertNames, setExpertNames] = React.useState([]);

  //generated names
  const names = useSelector((state) => state.nameConfiguration);

  React.useEffect(() => {
    if (names) {
      setAlternativeNames(names.alternativeNames || []);
      setCriteriaNames(names.criteriaNames || []);
      setLinguisticTermsForAlternativesNames(
        names.linguisticTermsForAlternativesNames || []
      );
      setLinguisticTermsForCriteriaNames(
        names.linguisticTermsForCriteriaNames || []
      );
      setExpertNames(names.expertNames || []);
    }
  }, [names]);

  const handleNameChange = (index, event, nameType) => {
    if (nameType == "alternative") {
      const updatedNames = [...alternativeNames];
      updatedNames[index] = event.target.value;
      setAlternativeNames(updatedNames);
    }

    if (nameType == "criteria") {
      const updatedNames = [...criteriaNames];
      updatedNames[index] = event.target.value;
      setCriteriaNames(updatedNames);
    }

    if (nameType == "lt-alternative") {
      const updatedNames = [...linguisticTermsForAlternativesNames];
      updatedNames[index] = event.target.value;
      setLinguisticTermsForAlternativesNames(updatedNames);
    }
    if (nameType == "lt-criteria") {
      const updatedNames = [...linguisticTermsForCriteriaNames];
      updatedNames[index] = event.target.value;
      setLinguisticTermsForCriteriaNames(updatedNames);
    }
    if (nameType == "expert") {
      const updatedNames = [...expertNames];
      updatedNames[index] = event.target.value;
      setExpertNames(updatedNames);
    }
  };

  const renderNameInputs = (nameArray, nameType, handleNameChange) => {
    return nameArray.map((name, index) => (
      <TextField
        id={`${nameType}${index + 1}`}
        label={`${nameType}-${index + 1}`}
        key={`${nameType}-${index}`}
        value={name}
        variant="outlined"
        type="text"
        onChange={(event) => handleNameChange(index, event, nameType)}
      />
    ));
  };

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "900", textAlign: "center" }}>
        Provide input names
      </Typography>
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
          <Box>
            <TabList
              onChange={handleTabChange}
              aria-label="names"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              textColor="inherit"
              indicatorColor="#292626"
            >
              <Tab label="Alternatives" value="1" />
              <Tab label="Criteria" value="2" />
              <Tab label="Linguistic terms" value="3" />
              <Tab label="Linguistic terms" value="4" />
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
                component="span"
                sx={{
                  p: 1.5,
                  border: "1px solid #d5d5d5",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {renderNameInputs(
                  alternativeNames,
                  "alternative",
                  handleNameChange
                )}
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Box
                component="span"
                sx={{
                  p: 1.5,
                  border: "1px solid #d5d5d5",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {renderNameInputs(criteriaNames, "criteria")}
              </Box>
            </TabPanel>
            <TabPanel value="3">
              <Box
                component="span"
                sx={{
                  p: 1.5,
                  border: "1px solid #d5d5d5",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {renderNameInputs(
                  linguisticTermsForAlternativesNames,
                  "lt-alternative"
                )}
              </Box>
            </TabPanel>
            <TabPanel value="4">
              <Box
                component="span"
                sx={{
                  p: 1.5,
                  border: "1px solid #d5d5d5",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {renderNameInputs(
                  linguisticTermsForCriteriaNames,
                  "lt-criteria"
                )}
              </Box>
            </TabPanel>
            <TabPanel value="5">
              <Box
                component="span"
                sx={{
                  p: 1.5,
                  border: "1px solid #d5d5d5",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {renderNameInputs(expertNames, "expert")}
              </Box>
            </TabPanel>
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
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="gray"
                onClick={() => handleSetupStep(false)}
              >
                Next
              </Button>
            </Box>
          </Box>
        </TabContext>
      </Box>
    </>
  );
}
