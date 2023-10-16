import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { IoMenu } from "react-icons/io5";

export default function Header({ handleDisplaySetup }) {
  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          background: "rgba(255, 255, 255, 0.2)",
          flexDirection: "row",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          color="gray"
          sx={{
            fontWeight: "900",
            textAlign: "center",
            color: "#292626",
          }}
        >
          FUZZY ARAS
        </Typography>
        <IconButton onClick={handleDisplaySetup}>
          <IoMenu />
        </IconButton>
      </AppBar>
    </Box>
  );
}
