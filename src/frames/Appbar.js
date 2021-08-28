import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import SelectMenu from '../components/SelectMenu';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
const useStyles = makeStyles((theme) => ({
  root: {
    position:'fixed',
    zIndex: 20,
    right:'0vw',
    textAlign:'right',
    paddingTop:10
  },
  setting:{

    //paddingRight:10,
    margin: theme.spacing(1.5),
  },
  sampleBtn:{
    width : 120,
    margin: theme.spacing(1.5),
  }
  }));

function GenerateConfigEle(props){
  if (props.configEle.type === 'select')
    return <SelectMenu 
    name={props.configEle.name} 
    configs={props.configs} 
    setConfigs={props.setConfigs} 
    options={props.configEle.options} />
  else if (props.configEle.type === 'switch')
    return <SelectMenu 
    name={props.configEle.name} 
    configs={props.configs} 
    setConfigs={props.setConfigs} 
    options={['encoder','decoder']} />
}

export default function Appbar(props) {
  const classes = useStyles();
  return (
     <div className={classes.root}>
      
        <Toolbar>
          
          <div className={classes.setting}>
          {props.configHolders.map((configEle,index)=>(
            <GenerateConfigEle 
            key={configEle.name}
            configs={props.configs} 
            setConfigs={props.setConfigs} 
            configEle={configEle} />
          ))}
          </div>
          <Divider orientation="vertical" flexItem />
          <Button className={classes.sampleBtn} variant="outlined" size="large" onClick={()=>props.setSampleCall(true)}>Sample</Button>
          
        </Toolbar>
      </div>
  );
}