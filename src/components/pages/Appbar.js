import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import SelectMenu from '../SelectMenu';
import { makeStyles } from '@material-ui/core/styles';
import AppList from "../../CompAppList.json";

import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    position:'fixed',
    zIndex: 20,
    right:'50vw',
  },
  appLabel:{
  },
  }));

  const findTarget = (targetList,appNameStr,matchPropNameStr) => {
    const target =  targetList.reduce((acc, cur, i) => {
      if (appNameStr === acc[matchPropNameStr])
        return acc
      else if (appNameStr === cur[matchPropNameStr])
        return cur;
      else{
        return acc;
      }
    });
    return target;
  }

function GenerateConfigEle(props){
  if (props.configEle.type === 'select')
    return <SelectMenu 
    name={props.configEle.name} 
    config={props.config} 
    setConfig={props.setConfig} 
    options={props.configEle.list} />
}
export default function Appbar(props) {
  const classes = useStyles();
  const appName = window.location.pathname.replace('/','');
  return (
     <div className={classes.root}>
      
        <Toolbar>
          <div className={classes.appLabel}/>
          <Button variant="outlined">Sample</Button>
          {findTarget(AppList,appName,'name').configs.map((configEle,index)=>(
            <GenerateConfigEle 
            key={configEle.name}
            config={props.config}
            setConfig={props.setConfig} 
            configEle={configEle} />
          ))}


        </Toolbar>
      </div>
  );
}