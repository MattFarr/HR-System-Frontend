import { createTheme, Theme } from "@material-ui/core/styles";
export const theme: Theme = createTheme({
  typography: {
    fontFamily: "Open Sans, Arial",
    fontWeightBold: "bold",
    h1: {
      fontSize: "32px",
    },
    h2: {
      fontSize: "22px",
    },
    h3: {
      fontSize: "20px",
    },
    body1: {
      fontSize: "16px",
    },
    body2: {
      fontSize: "14px",
    },
  },
  overrides: {
    MuiCard: {
      root: {
        backgroundColor: "#F0F0F0",
      },
    },
    MuiCardContent: {
      root: {
        backgroundColor: "#E0E0E0",
      },
    },
    MuiAvatar: {
      colorDefault: {
        backgroundColor: "#003366",
      },
    },
    MuiButtonBase: {
      root: {
        "&:focus": {
          outline: "none",
        },
      },
    },
    MuiButton: {
      root: {
        textTransform: "none",
      },
      containedPrimary: {
        backgroundColor: "#003366",
        "&:hover": {
          backgroundColor: "#000033",
        },
      },
    },
  },
});
