import { withStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import React, { Fragment } from 'react'
import SelectableTable from "../components/SelectableTable";
import { encode, decode } from 'js-base64';
import {get} from "../appData/Connector"

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography  from '@material-ui/core/Typography';
import Box  from '@material-ui/core/Box';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import DeleteIcon from '@material-ui/icons/Delete';
import {setToClipboard} from '../Tools/clipboard'
import Snackbar from '../Tools/snackbar'

let copyData = '';

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
  customToolbar:{
    minHeight: 24
  }
}));

function clipboardCopy(root,isEdit,target){
  let data = '';
  if (isEdit){
    const view = target.current.editor;
    data = view.getValue();
  }
  else {
  if (typeof copyData == 'object'){
    let maxCols = 0
    let rows = copyData.length;
    for(var i=0;i<rows;i++){
        maxCols = (maxCols<copyData[i].length)?copyData[i].length:maxCols;
    }
    for(var i=0;i<rows;i++){
      for(var j=0;j<maxCols;j++){
        if (j<copyData[i].length)
        data+=copyData[i][j]
        if (j !== copyData[i].length-1)
        data+='\t'
      }
      data+='\n'
    }
  }else
    data = copyData;
}
  if (data !== ''){
      setToClipboard(navigator,data);
      root.setState({clipboardPopup:true});
      window.setTimeout(function(){
        root.setState({clipboardPopup:false});
      }, 2000);
      //"클립보드에 저장되었습니다."
  }
}

function testSample(target){
  const edit = target.current.editor;
  get({type:'sample',uid:sessionStorage.getItem('uid')},(res)=>{
    const processValue = decode(res.result)
    edit.setValue(processValue);
  })
}

function clear(target){
  const edit = target.current.editor;
  edit.setValue('');
}

function EditToolbar(props){
  const target = props.target;
  function EditButtons(props){
    if (props.isEdit){
      return <>
      <IconButton title='Clear' aria-label="clear" size='small'  onClick={()=>clear(target)}>
    <DeleteIcon />
  </IconButton>
      <IconButton title='Demo' aria-label="sample" size='small' onClick={()=>testSample(target)}>
      <FlashOnIcon />
    </IconButton>
    </>
    }else
      return <></>
  }
  return <Toolbar  disableGutters={true} style={{width:'inherit',minHeight:24}}>
    <Typography style={{marginLeft:10}} variant="h6"> {props.typo}</Typography >
    <Box  display='flex' flexGrow={1}  style={{direction:'rtl'}}>
    <EditButtons isEdit = {props.isEdit}/>
    <IconButton title='Copy to Clipboard' aria-label="copy" size='small' onClick={()=>clipboardCopy(props.parent,props.isEdit,target)}>
      <FileCopyIcon />
    </IconButton>
    </Box>
    </Toolbar>
}

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
      clipboardPopup:false,
      config:{language:'json'},
      tableData:[[]]
    };
  }

  onChange(newValue) {
    const str = encode(newValue)
    get({type:'convert',uid:sessionStorage.getItem('uid'),str:str},(res)=>{
      const processValue = decode(res.result);
      if (this.props.viewType === 'editer'){
        const view = this.viewRef.current.editor;
        view.setValue(processValue);
        copyData = processValue;
      }else if (this.props.viewType === 'table'){
        const data = JSON.parse(processValue);
        this.setState({tableData:data});
        copyData = data;
      }
    });
  };

  testSample(){
    const edit = this.aceEditRef.current.editor;
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
        viewer = <SelectableTable ref={this.viewRef} 
        tableData = {this.state.tableData}/>
        break;
      default:<div></div>
    }

    return (<Box className={classes.root}  bgcolor='secondary.main'>
      <Box className={classes.ace_wrapper}>
        
          <EditToolbar typo='INPUT' isEdit={true} parent={this} target={this.aceEditRef}/>
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
  </Box>
      <Divider  orientation="vertical" flexItem  />
  <Box className={classes.ace_wrapper}>
  <EditToolbar typo='OUTPUT' isEdit={false} parent={this} target={this.viewRef}/>
    {viewer}
  </Box>
  <Snackbar open={this.state.clipboardPopup} message='클립보드에 복사되었습니다.' />
  </Box>);
  }
}

export default withStyles(useStyles)(MyComponent);
