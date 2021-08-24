import './App.css';
import React from 'react';
import Sidebar from "./components/Sidebar";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { BrowserRouter as Router} from "react-router-dom";
import DynamicGoto from './components/GotoPage';

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  content: {
    marginLeft:theme.spacing(7) + 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

function App() {
  const classes = useStyles();
  const [sideBarExpend, setSideBarExpend] = React.useState(true);
  const [currAppName, setCurrAppName] = React.useState('Home');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const themeMode = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    
    <ThemeProvider theme={themeMode}>
      <CssBaseline/>
      <Router>
      <Sidebar 
        sideBarExpend={sideBarExpend} 
        setSideBarExpend={setSideBarExpend}
        currAppName={currAppName} 
        setCurrAppName={setCurrAppName}
      />
      <main className={clsx(classes.content, {
          [classes.contentShift]: sideBarExpend,
        })}>
      <DynamicGoto func={()=>''} appName={currAppName}/>
      </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
