import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    
  },
  menuitem : {
      width : 120,
  }
}));
/*
const options = [
  'json',
  'html',
  'javascript',
  'css',
];
*/
export default function SimpleListMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const options = props.options;
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    /*
    import('./appFuncs/Beautify_json').then(data => 
    props.setFunc((s)=>data.default(s)));
    */
    //props.config[props.name] = options[index];
    props.config[props.name]=options[index];
    props.setConfig(props.config);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <MenuItem className={classes.menuitem}
        aria-haspopup="true"
        onClick={handleClickListItem}
      >
        {options[selectedIndex]}
      </MenuItem>

      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem className={classes.menuitem} 
            key={option}
            //disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}