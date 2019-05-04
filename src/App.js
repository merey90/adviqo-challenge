import React from 'react';
import {
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';

import AdvisorContainer from './modules/advisor/containers/AdvisorContainer';

import logo from './static/adviqo-logo-mobile.png';
import theme from './theme';

const styles = theme => ({
  appToolbar: {
    justifyContent: 'center'
  },
  appLogo: {
    height: '50px',
    pointerEvents: 'none',
    marginRight: '20px',
  },
  main: {
    textAlign: 'center',
    padding: theme.spacing.unit*2
  }
});

function App(props) {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar className={classes.appToolbar}>
            <img src={logo} className={classes.appLogo} alt="logo" />
            <Typography variant="title" color="inherit">
              Challenge
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.main}>
          <AdvisorContainer />
        </main>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(App);
