import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button  from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import $ from 'jquery'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    //backgroundColor: theme.palette.background.paper,
    
    marginLeft:10,
    marginRight:10
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
  const name = props.holder.name;
  const type = props.holder.type;
  const options = props.holder.options;
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    const configs = $.extend({}, props.configs);
    configs[name]=options[index];
    props.setConfigs(configs);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    console.log(selectedIndex)
    handleMenuItemClick(null,event.target.value)
    //setSelectedIndex(event.target.value);
  };
  if (type === 'select')
    return (
    <div className={classes.root}>
      <Button className={classes.menuitem}
         variant="outlined" size="small"
        onClick={handleClickListItem}
      >
        {options[selectedIndex]}
      </Button>

      <Menu size="small" 
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem className={classes.menuitem} size="small" 
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
  else if (type === 'toggle')
          return <div className={classes.root}>
          <RadioGroup row value={selectedIndex.toString()} onChange={(event)=>handleChange(event)}>
          {options.map((option,index)=>(
            <FormControlLabel value={(index).toString()} control={<Radio    color="default" />} label={option} />
            ))}
          </RadioGroup>
        </div>
}