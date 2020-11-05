import { MuiThemeProvider, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";


const theme = createMuiTheme({
    overrides: {
        MuiOutlinedInput: {
            root: {
                position: 'relative',
                '& $notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    borderColor: '#86BC25',
                    // Reset on touch devices, it doesn't add specificity
                    '@media (hover: none)': {
                        borderColor: '#86BC25',
                    },
                },
                '&$focused $notchedOutline': {
                    borderColor: '#86BC25',
                    borderWidth: 1,
                },
            },
        },
        MuiFormLabel: {
            root: {
              "&$focused": {
                color: "#86BC25",
                fontWeight: "bold"
              }
            }, 
            
            focused: {}
          }
    }
});

export default theme;
