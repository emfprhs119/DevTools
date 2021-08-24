import DynamicRoute from 'react-dynamic-route';
import AppList from "../CompAppList.json";
import React from 'react';
import GetApp from './usefulFunc/ioAppList';
const useStyles = ((theme) => ({
  root: {
    position : 'fixed',
  },
}))

const getUrl = (urlData) => {
  const appName = urlData.replace('/','')
  const target =  AppList.reduce((acc, cur, i) => {
      if (appName === acc.name)
        return acc
      else if (appName === cur.name)
        return cur;
      else{
        return acc;
      }
    });
  return '/'+target.url;
}


export default function DynamicGoto(props){
  const classes = useStyles();
  const appName = window.location.pathname.replace('/','');
  //const appName = window.location.pathname.replace('/','');
    return <div className={classes.root}><DynamicRoute
    page={path => (
      import('./pages' + getUrl(path))).then(module => module.default)}
    //func={path => import('./appFuncs' + getFunc(path)).then(module => module.default)}
    loading={<div>Loading..</div>}
    props={{defaultConfigs:GetApp(appName).defaultConfigs} // `someProp1` and `someProp2` are transfered to `module.dedault` above finally
    }
    onError={(e, history) => {
      if (
        /not find module/.test(e.message) &&
        window.location.pathname !== '/404'
      ) {
        history.push('/404')
        return
      }
      throw e
    }}
  /></div>
};