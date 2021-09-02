import DynamicRoute from 'react-dynamic-route';
import React from 'react';
import ConvertApp from '../pages/ConvertApp';
const useStyles = ((theme) => ({
  root: {
    position : 'fixed',
  },
}))

export default function DynamicGoto(props){
  const classes = useStyles();
  return <ConvertApp 
    configs={props.configs}
      viewType={props.viewType}
      sampleCall={props.sampleCall}
      setSampleCall={props.setSampleCall} />
  /*
    return <div className={classes.root}><DynamicRoute
    page={path => (
      import('../pages' + (path==='/'?'/Home':path))).then(module => module.default)}
    loading={<div>Loading..</div>}
    props={{
      configs:props.configs,
      viewType:props.viewType,
      sampleCall:props.sampleCall,
      setSampleCall:props.setSampleCall}
    }
    onError={(e, history) => {
      if (
        /not find module/.test(e.message) &&
        window.location.pathname !== '/404'
      ) {
        history.push('/404')
        return
      }
      throw e
    }}
  /></div>
  */
};