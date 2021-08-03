import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
    typography: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        allVariants: {
            color: "#323232"
        },
        button: {
            textTransform: "none",
        }    
    },
    
});

export default theme;