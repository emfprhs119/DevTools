import { withStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import React from 'react'
import SelectableTable from "../components/SelectableTable";
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
    this.aceViewRef = React.createRef();
    //this.aceEditRef = React.createRef();
    //this.onChange = this.onChange.bind(this);
    this.state = {
      func:((x)=>('App did not Loading !!!')),
      sample:null,
      config:{language:'json'}
    };
  }

  onChange(newValue) {
    /*
    const view = this.aceViewRef.current.editor;
    const str = Buffer.from(newValue, 'binary').toString('base64')
    $.get(sessionStorage.getItem('api'),{type:'convert',uid:sessionStorage.getItem('uid'),str:str},(res)=>{
      const processValue = Buffer.from(res.result, 'base64').toString('binary')
      view.setValue(processValue);
    })
    */
  };

  componentDidMount() {}
  componentDidUpdate(prevProps,prevState){
    /*
    if (prevProps.configs !== this.props.configs){
      const newValue = this.aceEditRef.current.editor.getValue();
      this.onChange(newValue); 
    } 
    */ 
  }

  render() {
    const { classes } = this.props;
    return (<div className={classes.root}>
      <div className={classes.ace_wrapper}>
        <AceEditor 
        ref={this.aceEditRef}
        onChange={this.onChange}
        className={classes.ace_editer}
        theme="tomorrow_night"
        fontSize={20}
        setOptions={{
        readOnly: false,
        tabSize: 4,
        }}/>
  </div>
      
  <div className={classes.ace_wrapper}>
        <SelectableTable rows={4} cols={6}/>
  </div>
  </div>);
  }
}

export default withStyles(useStyles)(MyComponent);
