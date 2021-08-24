import { withStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import React from 'react'

const useStyles = ((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  ace_wrapper:{
    flexGrow: 1,
    width: '100%',
    height: '100vh', 
  },
  ace_editer:{
    width: 'inherit !important',
    height: 'inherit !important'
  },
}));

const sample = `{"apps" : [{"na me":"Beautify-json","url":"Beautifyjson"}]}`;

function tryConvert(jsStr){
  try{
  const jsObj = JSON.parse(jsStr);
  return JSON.stringify(jsObj, null, 2);
  }catch(e){
    return 'Wrong Json String !!!';
  }
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.aceViewRef = React.createRef();
    this.aceEditRef = React.createRef();
    this.onChange = this.onChange.bind(this);
  }
  onChange(newValue) {
    const node = this.aceViewRef.current.editor;
    const replaceValue = tryConvert(newValue);
    node.setValue(replaceValue);
  };
  render() {
    const { classes } = this.props;
    return (<div className={classes.root}>
      <div className={classes.ace_wrapper}>
        <AceEditor ref={this.aceEditRef}
        onChange={this.onChange}
        className={classes.ace_editer}
        mode="json"
        theme="tomorrow_night"
        fontSize={20}
        value={sample}
        setOptions={{
        readOnly: false,
        tabSize: 4,
        }}/>
  </div>

  <div className={classes.ace_wrapper}>
        <AceEditor
        ref={this.aceViewRef}
        className={classes.ace_editer}
        mode="json"
        theme="tomorrow_night"
        fontSize={20}
        value={tryConvert(sample)}
        setOptions={{
        readOnly: true,
        }}/>
  </div>

  </div>);
  }
}
export default withStyles(useStyles)(MyComponent);
