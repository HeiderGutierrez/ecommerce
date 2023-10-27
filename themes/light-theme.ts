import { createTheme } from '@mui/material/styles';


export const lightTheme = createTheme({
  typography:{
    fontFamily: 'Source Sans pro, sans-serif',
    allVariants: {
      color: '#808080',
      fontSize: '14px'
    }
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#2E8B57'
    },
    secondary: {
      main: '#232323 '
    },
    info: {
      main: "#0099FF"
    },
    error: {
      main: "#F23847"
    },
    success: {
      main: "#5CB85C"
    },
    background: {
      default: "#ffffff"
    },
    warning: {
      main: "#FFCC00"
    },
    text: {
      primary: "#232323"
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          height: 60
        },
      }
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600,
          fontFamily: 'Poppins, sans-serif',
          color: '#232323'
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
          fontFamily: 'Poppins, sans-serif',
          color: '#232323'
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600,
          fontFamily: 'Poppins, sans-serif',
          color: '#232323'
        },
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          position: 'relative',
          transition: 'all .3s ease-in-out',
          boxShadow: 'none',
          '&:hover': {
            '.MuiBox-root': {
              bottom: 0,
            },
            '.MuiIconButton-root': {
              right: 10,
            }
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          borderRadius: 0,
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontSize: 11,
          textTransform: 'uppercase',
          boxShadow: 'none',
          ':hover': {
            boxShadow: 'none',
          }
        }
      }
    },
    MuiAlert: {
      styleOverrides:{
        root: {
          borderRadius: 0,
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        }
      }
    }
  }
});