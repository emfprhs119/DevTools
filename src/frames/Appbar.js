import React, { Fragment } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import SelectMenu from '../components/SelectMenu';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Hidden } from '@material-ui/core';

function AddDivider(props){
  if (props.visible === true)
    return <Divider orientation="vertical" flexItem />
  else
    return <></>
}

const useStyles = makeStyles((theme) => ({
  root: {
    position:'fixed',
    //width:`calc(100vw - ${57}px)`,
    width:'100vw',
    zIndex: 20,
    right:0,
    height:45,
    overflow:"Hidden",
  },
  appbar:{
  },
  appname:{
    flexGrow:1,
    margin: 10,
  },
  configHolder:{
    display:"flex",
    margin: theme.spacing(0.3),
  },
  }));

 

export default function Appbar(props) {
  const classes = useStyles();
  return (
     <Box className={classes.root}>
       <AppBar disableGutters={true} position="static" className={classes.appbar}>
        <Toolbar disableGutters={true}  variant="dense">
       <Typography variant="h5" className={classes.appname}>{props.currAppName}</Typography>
          {props.configHolders.map((configHolder,index)=>(
            <Fragment  key={index}>
          <SelectMenu 
              holder={configHolder}
              configs={props.configs} 
              setConfigs={props.setConfigs} />
              <AddDivider visible={(props.configHolders.length-1)!==index}/>
            </Fragment>
          ))}
          </Toolbar>
          </AppBar>
      </Box>
  );
}
//
<Divider orientation="vertical" flexItem />
//<Button className={classes.sampleBtn} variant="outlined" size="large" onClick={()=>props.setSampleCall(true)}>Sample</Button>
          