import React, {   } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box'
//import AutoComplete from '../components/AutoComplate';

const drawerWidth = 200;
const drawerWidthMin = 57;
const drawerTop = 45;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    position : 'fixed',
    zIndex: 10,
    width: drawerWidth,
    flexShrink: 0,
    height:`calc(100vh - ${drawerTop}px)`,
    whiteSpace: 'nowrap',
    top: drawerTop,
  },
  drawerOpen: {
    width: drawerWidth,
    
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide:{
    display:'none',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: drawerWidthMin,
  },
  expender: {
    position : 'fixed',
    alignItems: 'center',
    //marginLeft: drawerWidth-theme.spacing(3),
    marginTop: '30vh',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  expenderClose: {
    //marginLeft: theme.spacing(4),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));


export default function MiniDrawer(props) {
  const classes = useStyles();
  let listClick = false;
  /*
  const handleDrawerOpen = () => {
    props.setSideBarExpend(true);
  };

  const handleDrawerClose = () => {
    props.setSideBarExpend(false);
  };
  */
  return (
    <>
    <Box className={classes.root}
    onMouseOver={(event) =>{if(!props.sideBarFix)props.setSideBarExpend(true);}}
    onMouseOut={(event) => {if(!props.sideBarFix)props.setSideBarExpend(false);}}
    onClick={(event) =>{ 
      if (!listClick){
        props.setSideBarFix(!props.sideBarFix);
        props.setSideBarExpend(!props.sideBarFix);
        console.log('root');
      }
      listClick = false;
    }}
    >
      <Box bgcolor='primary.main'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.sideBarExpend,
          [classes.drawerClose]: !props.sideBarExpend,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.sideBarExpend,
            [classes.drawerClose]: !props.sideBarExpend,
          }),
        }}
      >
        
        <List>
          {props.appList.map((menu, index) => (
            <ListItem  button key={menu.name} onClick={(e)=>{
              props.setCurrAppName(menu.name);
              props.setSideBarFix.bind(this,false);
              listClick = true;}
            }>
              <ListItemIcon>{index % 2 === 0 ? <AcUnitIcon /> : <AcUnitIcon />}</ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Box>
    </>
  );
}


/*
<div className={clsx(classes.expender,classes.drawer,
          {[classes.expenderClose]:!props.sideBarExpend})}>
          <IconButton onClick={props.sideBarExpend?handleDrawerClose:handleDrawerOpen}>
            {props.sideBarExpend ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
 */