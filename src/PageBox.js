import React from "react";
import Box from "@mui/material/Box";

const PageBox = ({sx = [], children}) => {
  return (
    <Box
      sx={[
        {
          py: 2,
          px: {xs: 1, sm: 4},
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        },
        (theme) => ({
          bgcolor: theme.palette.mode === "dark" ? "#101010" : "#e0d7d2",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};

export default PageBox;
