import React from "react";

import {
  alpha,
  getContrastRatio,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import backgroundImage from "../assets/background.png";

export default function ThemeContainer({ dashboard }) {
  const grayBase = "#292626";
  const grayMain = alpha(grayBase, 1);

  const darkTheme = createTheme({
    palette: {
      gray: {
        main: grayMain,
        light: alpha(grayBase, 0.5),
        dark: alpha(grayBase, 0.9),
        contrastText:
          getContrastRatio(grayMain, "#fff") > 4.5 ? "#fff" : "#111",
      },
    },
    typography: {
      fontFamily: "Montserrat",
    },
  });
  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    minHeight: "100%",
    backgroundAttachment: "fixed",
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={backgroundStyles}>{dashboard}</div>
    </ThemeProvider>
  );
}
