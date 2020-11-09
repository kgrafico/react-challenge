  
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LandingPage from './components/LandingPage/LandingPage';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./style/theme";

const styles = theme => ({});


const Landing = () => (
  <LandingPage />
);

const App = props => {
  const { classes } = props;

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className={`App ${classes.app}`}>
          <Route path="/" component={Landing} />
        </div>
      </MuiThemeProvider>
    </Router>
  );
}

export default withStyles(styles)(App);