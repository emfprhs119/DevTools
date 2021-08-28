import { withStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import React from 'react'
import $ from "jquery";

const useStyles = ((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  ace_wrapper:{
    flexGrow: 1,
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

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.api = sessionStorage.getItem('api');
    this.aceViewRef = React.createRef();
    this.aceEditRef = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.state = {
      func:((x)=>('App did not Loading !!!')),
      sample:null,
      config:{language:'json'}
    };
  }

  onChange(newValue) {
    const view = this.aceViewRef.current.editor;
    const str = Buffer.from(newValue, 'binary').toString('base64')
    $.get(this.api,{type:'convert',uid:sessionStorage.getItem('uid'),str:str},(res)=>{
      const processValue = Buffer.from(res.result, 'base64').toString('binary')
      view.setValue(processValue);
    })
  };

  testSample(){
    console.log('TestSample');
    const edit = this.aceEditRef.current.editor;
    $.get(sessionStorage.getItem('api'),{type:'sample',uid:sessionStorage.getItem('uid')},(res)=>{
      const processValue = Buffer.from(res.result, 'base64').toString('binary')
      edit.setValue(processValue);
    })
  }
  componentDidMount() {}
  componentDidUpdate(prevProps,prevState){
    if (this.props.sampleCall === true){
      console.log(this.props.sampleCall)
      this.testSample();
      this.props.setSampleCall(false);
      //this.props.setSampleCall(false);
    }
    if (JSON.stringify(prevProps.configs) !== JSON.stringify(this.props.configs)){
      const newValue = this.aceEditRef.current.editor.getValue();
      this.onChange(newValue); 
    }  
  }

  render() {
    const { classes } = this.props;
    const language = this.props.configs.language;
    return (<div className={classes.root}>
      <div className={classes.ace_wrapper}>
        <AceEditor 
        ref={this.aceEditRef}
        onChange={this.onChange}
        className={classes.ace_editer}
        mode={language?language:'text'}
        theme="tomorrow_night"
        fontSize={20}
        setOptions={{
        readOnly: false,
        tabSize: 4,
        }}/>
  </div>
      
  <div className={classes.ace_wrapper}>
        <AceEditor
        ref={this.aceViewRef}
        className={classes.ace_editer}
        mode={language?language:'text'}
        theme="tomorrow_night"
        fontSize={20}
        setOptions={{
        readOnly: true,
        }}/>
  </div>
  </div>);
  }
}

export default withStyles(useStyles)(MyComponent);
