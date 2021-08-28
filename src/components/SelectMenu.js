import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button  from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import $ from 'jquery'

const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    //backgroundColor: theme.palette.background.paper,
    
  },
  menuitem : {
      width : 120,
  },
  typo : {
    paddingTop: 3, 
    paddingRight: 6, 
    textAlign:'middle',
}
}));
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
    const configs = $.extend({}, props.configs);
    configs[props.name]=options[index];
    props.setConfigs(configs);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.typo} variant="h6">{props.name} :</Typography>
      <Button className={classes.menuitem}
        variant="outlined" size="large" 
        onClick={handleClickListItem}
      >
        {options[selectedIndex]}
      </Button>

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