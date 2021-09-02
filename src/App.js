import './App.css';
import React,{useEffect} from 'react';
import Sidebar from "./frames/Sidebar";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/box';
import clsx from 'clsx';
import { BrowserRouter as Router} from "react-router-dom";
import DynamicGoto from './frames/Contents';
import Appbar from './frames/Appbar';
import {get,post} from "./appData/Connector"

// 디자인 투톤 material
const drawerWidth = 200;
const sidebarMargin = 57;
const topMargin = 45;
const useStyles = makeStyles((theme) => ({
  content: {
    marginLeft:sidebarMargin,
    marginTop:topMargin,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    marginLeft: drawerWidth,
    marginTop:topMargin,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

function App() {
  const classes = useStyles();
  const [sideBarExpend, setSideBarExpend] = React.useState(false);
  const [sideBarFix, setSideBarFix] = React.useState(false);
  const [currAppName, setCurrAppName] = React.useState('Beautify');
  const [configs=[], setConfigs] = React.useState();
  const [appList=[], setAppList] = React.useState();
  const [appInfo={configHolders:[]}, setAppInfo] = React.useState();
  const [sampleCall=false,setSampleCall] = React.useState();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

/*
  const themeMode = createTheme({
    
    
    
    palette: {
      primary: {
        light:'#333333',
        main:'#181818'
      },
      secondary: {
        light:'#DCDCAA',
        main:'#CFCF11'
      },
      button:{
        main: '#F1DCA3'
      },
      error: {
        main: '#009688'
      },
      
      text: {
        primary: '#e91e63',
        secondary: '#2196f3',
        disabled: '#4caf50',
        hint: '#ffc107',
        myTextColor : '#039be5'
      }
      
    },
  })
  */
  
  const themeMode = React.useMemo(
    () =>
      createTheme({
        /*
        typography: {
          allVariants: {
            color: "red"
          },
        },
        */
        
        palette: {primary: {
          main:'#333333',
        },
        secondary:{
          main:'#414141',
        },
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  
  const configSetting = (conf) => {    
    setConfigs(conf)
    post({uid:sessionStorage.getItem('uid'),appConfigs:JSON.stringify(conf)},null);
  }
  useEffect(()=>{
    get({type:'appList'},(res)=>{
      const appListFromServer = JSON.parse(res.result); 
      setAppList(appListFromServer)
    })
  },[])
  useEffect(()=>{
   const uid = sessionStorage.getItem('uid');
    post({ uid: uid,appName: currAppName},null);
    console.log(currAppName)
    get({type:'configs',uid:uid},(res)=>{
      const appConfigs = JSON.parse(res.result); 
      setConfigs(appConfigs)
    });
    get({type:'appInfo',uid},(res)=>{
      const appInfo = JSON.parse(res.result); 
      setAppInfo(appInfo)});
   },[currAppName]);

  return (
    <ThemeProvider theme={themeMode} >
      <CssBaseline/>
      <Box bgcolor='primary.dark'>
      <Sidebar
        sideBarExpend={sideBarExpend} 
        setSideBarExpend={setSideBarExpend}
        sideBarFix={sideBarFix} 
        setSideBarFix={setSideBarFix}
        currAppName={currAppName} 
        appList={appList}
        setCurrAppName={setCurrAppName}
      />


      <Appbar className={classes.appbar} // TopBar
        currAppName={currAppName} 
        configHolders={appInfo.configHolders}
        configs = {configs}
        setConfigs={configSetting}
        setSampleCall = {setSampleCall}
      />
      <main className={clsx(classes.content, {
          [classes.contentShift]: sideBarExpend,
        })}>
      <DynamicGoto 
        configs={configs}
        viewType={appInfo.viewType}
        sampleCall = {sampleCall}
        setSampleCall = {setSampleCall}
        
      />
      </main>
      </Box>
    </ThemeProvider>
  );
}

export default App;
