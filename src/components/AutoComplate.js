/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import AppList from "../CompAppList.json";
import {useHistory} from 'react-router-dom';


export default function Highlights(props) {
  const useStyles = ((theme) => ({
  }));
  const history = useHistory();
  
  const appName = window.location.pathname.replace('/','');
  
  const classes = useStyles();
  return (
    <Autocomplete
      id="searchApp"
      style={{position : 'fixed',paddingLeft:15,width: 280,fullWidth:false }}
      classes={classes}
      onChange={(event,selectApp)=>{if(selectApp)history.push(selectApp.url)}}
      options={AppList}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label={appName} variant="outlined" margin="normal" />
      )}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.name, inputValue);
        const parts = parse(option.name, matches);

        return (
          <div>
            {parts.map((part, index) => (
              <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                {part.text}
              </span>
            ))}
          </div>
        );
      }}
    />
  );
}
