import DynamicRoute from 'react-dynamic-route';
import React from 'react';
const useStyles = ((theme) => ({
  root: {
    position : 'fixed',
  },
}))

export default function DynamicGoto(props){
  const classes = useStyles();
    return <div className={classes.root}><DynamicRoute
    page={path => (
      import('../pages' + (path==='/'?'/Home':path))).then(module => module.default)}
    loading={<div>Loading..</div>}
    props={{
      configs:props.configs,
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
};