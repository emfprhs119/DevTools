import { withStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import React from 'react'
import $ from "jquery";
import SelectableTable from "../components/SelectableTable";
import { encode, decode } from 'js-base64';
import {get,post} from "../appData/Connector"

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
    this.viewRef = React.createRef();
    this.aceEditRef = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.state = {
      func:((x)=>('App did not Loading !!!')),
      sample:null,
      config:{language:'json'},
      tableData:[[]]
    };
  }

  onChange(newValue) {
    const str = encode(newValue)
    /*
    $.get(this.api,{type:'convert',uid:sessionStorage.getItem('uid'),str:str},(res)=>{
      console.log(res.result);
      const processValue = decode(res.result);
      console.log(processValue);
      if (this.props.viewType === 'editer'){
        const view = this.viewRef.current.editor;
        view.setValue(processValue);
      }else if (this.props.viewType === 'table'){
        const data = JSON.parse(processValue);
        this.setState({tableData:data});
      }
    });
    */
    get({type:'convert',uid:sessionStorage.getItem('uid'),str:str},(res)=>{
      console.log(res.result);
      const processValue = decode(res.result);
      console.log(processValue);
      if (this.props.viewType === 'editer'){
        const view = this.viewRef.current.editor;
        view.setValue(processValue);
      }else if (this.props.viewType === 'table'){
        const data = JSON.parse(processValue);
        this.setState({tableData:data});
      }
    });
  };

  testSample(){
    const edit = this.aceEditRef.current.editor;
    /*
    $.get(sessionStorage.getItem('api'),{type:'sample',uid:sessionStorage.getItem('uid')},(res)=>{
      const processValue = decode(res.result)
      edit.setValue(processValue);
    })
    */
    get({type:'sample',uid:sessionStorage.getItem('uid')},(res)=>{
      const processValue = decode(res.result)
      edit.setValue(processValue);
    })
  }


  componentDidMount() {
    console.log(this.state.tableDat)}
  componentDidUpdate(prevProps,prevState){
    if (this.props.sampleCall === true){
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
    let viewer
    switch(this.props.viewType){
      case 'editer':
        viewer = <AceEditor ref={this.viewRef} 
        className={classes.ace_editer}
        mode={language?language:'text'}
        theme="tomorrow_night"
        fontSize={20}
        setOptions={{
        readOnly: true,
        }}/>
        break;
      case 'table':
        viewer = <SelectableTable
        tableData = {this.state.tableData}/>
        break;
      default:<div></div>
    }
    if (this.props.viewType === 'editer'){
      viewer = <AceEditor ref={this.viewRef} 
        className={classes.ace_editer}
        mode={language?language:'text'}
        theme="tomorrow_night"
        fontSize={20}
        setOptions={{
        readOnly: true,
        }}/>
    }else if (this.props.viewType === 'table') {
      viewer = <SelectableTable
      tableData = {this.state.tableData}/>
    }else{
      
    }

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
    {viewer}
  </div>
  </div>);
  }
}

export default withStyles(useStyles)(MyComponent);
