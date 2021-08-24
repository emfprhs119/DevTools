import { withStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import React from 'react'
import Appbar from './Appbar';
import GetApp from '../usefulFunc/ioAppList';
import { config } from 'ace-builds';
const useStyles = ((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  ace_wrapper:{
    flexGrow: 1,
    marginTop:'90px',
    width: '100%',
    height: `calc(100vh - ${90}px)`, 
  },
  ace_editer:{
    width: 'inherit !important',
    height: 'inherit !important'
  },
  appbar:{
  }
}));

const sample = `{"apps" : [{"name":"Beautify-json","url":"Beautifyjson"}]}`;

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.aceViewRef = React.createRef();
    this.aceEditRef = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.setFunc = this.setFunc.bind(this);
    this.setSample = this.setSample.bind(this);
    this.setConfig = this.setConfig.bind(this);
    this.state = {
      func:((x)=>('App did not Loading !!!')),
      sample:null,
      config:props.defaultConfigs
    };
    
    
  }

  componentDidMount() {
    /*import('../appFuncs/Beautify_json').then(data => 
      this.setFunc((s)=>data.default(s)));
      console.log(this.state.config);*/
      this.setConfig(this.state.config);
  }

  
  onChange(newValue) {
    const node = this.aceViewRef.current.editor;
    const replaceValue = this.state.func(newValue);
    node.setValue(replaceValue);
  };

  setFunc(newFunc){
    this.setState({func:newFunc});
  }
  setSample(newSample){
    this.setState({sample:newSample});
  }
  setConfig(newConfig){
    import('../appFuncs/Beautify').then(data => 
      this.setFunc((s)=>data[newConfig.language](s)));
    this.setState({config:newConfig});
  }


  render() {
    const { classes } = this.props;
    return (<div className={classes.root}>
      
      <Appbar className={classes.appbar} 
      setFunc={this.setFunc} 
      setSample={this.setSample}
      config={this.state.config}
      setConfig={this.setConfig}

      />
      <div className={classes.ace_wrapper}>
        <AceEditor ref={this.aceEditRef}
        onChange={this.onChange}
        className={classes.ace_editer}
        mode={this.state.config.language}
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
        mode={this.state.config.language}
        theme="tomorrow_night"
        fontSize={20}
        //value={this.props.tryConvert(sample)}
        setOptions={{
        readOnly: true,
        }}/>
  </div>
  </div>);
  }
}
export default withStyles(useStyles)(MyComponent);
