import React from "react";
import {ThemeProvider} from "@material-ui/core/styles";
import Navbar from "./components/Navbar";
import Theme from "./Theme";
import Currency from "./sections/Currency";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Navbar />
    <Currency />
    </ThemeProvider>
  )
}

export default App;
