import './App.css';
import React,{useEffect} from 'react';
import Sidebar from "./frames/Sidebar";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { BrowserRouter as Router} from "react-router-dom";
import DynamicGoto from './frames/Contents';
import Appbar from './frames/Appbar';
import {get,post} from "./appData/Connector"
import $ from "jquery";

// 디자인 투톤 material
const drawerWidth = 300;
const sidebarMargin = 58;
const topMargin = 80;
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
  const [currAppName, setCurrAppName] = React.useState('Home');
  const [configs=[], setConfigs] = React.useState();
  const [appList=[], setAppList] = React.useState();
  const [appInfo={configHolders:[]}, setAppInfo] = React.useState();
  const [sampleCall=false,setSampleCall] = React.useState();
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
  const configSetting = (conf) => {    
    setConfigs(conf)
    // $.post(sessionStorage.getItem('api'), {uid:sessionStorage.getItem('uid'),appConfigs:JSON.stringify(conf)});
    post({uid:sessionStorage.getItem('uid'),appConfigs:JSON.stringify(conf)},null);
  }
  useEffect(()=>{
    /*
    $.get(sessionStorage.getItem('api'),{type:'appList'},(res)=>{
      const appListFromServer = JSON.parse(res.result); 
      setAppList(appListFromServer)
    })
    */
    get({type:'appList'},(res)=>{
      const appListFromServer = JSON.parse(res.result); 
      setAppList(appListFromServer)
    })
  },[])
  useEffect(()=>{
      /*
      $.post(sessionStorage.getItem('api'), { uid: sessionStorage.getItem('uid'),appName: currAppName},()=>{
      $.get(sessionStorage.getItem('api'),{type:'configs',uid:sessionStorage.getItem('uid')},(res)=>{
        const appConfigs = JSON.parse(res.result); 
        setConfigs(appConfigs)
      })
      $.get(sessionStorage.getItem('api'),{type:'appInfo',uid:sessionStorage.getItem('uid')},(res)=>{
        const appInfo = JSON.parse(res.result); 
        setAppInfo(appInfo)
      })
    });
    */
   const uid = sessionStorage.getItem('uid');
    post({ uid: uid,appName: currAppName},null);
    get({type:'configs',uid:uid},(res)=>{
      const appConfigs = JSON.parse(res.result); 
      setConfigs(appConfigs)
    });
    get({type:'appInfo',uid},(res)=>{
      const appInfo = JSON.parse(res.result); 
      setAppInfo(appInfo)});
   },[currAppName]);

  return (
    <ThemeProvider theme={themeMode}>
      <CssBaseline/>
      <Router>
      <Sidebar // Sidebar
        sideBarExpend={sideBarExpend} 
        setSideBarExpend={setSideBarExpend}
        sideBarFix={sideBarFix} 
        setSideBarFix={setSideBarFix}
        currAppName={currAppName} 
        appList={appList}
        setCurrAppName={setCurrAppName}
      />


      <Appbar className={classes.appbar} // TopBar
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
      </Router>
    </ThemeProvider>
  );
}

export default App;
