/* eslint-disable default-case */
var JsonDB= require('../data/json-db');
var Samples= require('../data/sample');

var express = require('express');
var router = express.Router();

var beautify_js = require('js-beautify').js;
var beautify_css = require('js-beautify').css;
var beautify_html = require('js-beautify').html;

const beautify_json = (str) => {
  if (str === '')
    return ''
  try{
    const jsObj = JSON.parse(str);
    return JSON.stringify(jsObj, null, 2);
  }catch(e){
    return 'Wrong Json String !!!';
  }
}

const appFuncs = {};
const appSamples = {};
appFuncs['Beautify'] = (str,config) => {
  let result = "Error !!!";
  switch(config.language){
    case 'json':result = beautify_json(str);break;
    case 'javascript':result = beautify_js(str);break;
    case 'css':result = beautify_css(str);break;
    case 'html':result = beautify_html(str);break;
  }
  return result;
};
appFuncs['Formater'] = (str,config) => {
  let result = "Error !!!";
  switch(config.format){
    case 'base64':
      if (config.type === 'encoder')
        result = Buffer.from(str, 'binary').toString('base64');
      else
        result = Buffer.from(str, 'base64').toString('binary');
      break;
  }
  return result
}
appFuncs['Viewer'] = (str,config) => {
  let result = "Error !!!";
  switch(config.target){
    case 'csv':result = Buffer.from(str, 'binary').toString('base64');break;
  }
  return result
}


appSamples['Beautify'] = (config) => {
  let result = "Error !!!";
  console.log(config)
  switch(config.language){
    case 'json':result = Samples.json;break;
    case 'javascript':result = Samples.javascript;break;
    case 'css':result =Samples.css;break;
    case 'html':result = Samples.html;break;
    
  }
  return result;
};
appSamples['Formater'] = (config) => {
  let result = 'Error !!!'
  console.log(config.format+config.type)
  switch(config.format+config.type){
  case 'base64encoder':result = Samples.base64encode;break;
  case 'base64decoder':result = Samples.base64decode;break;
}
return result
}
/*
JsonDB.setAppDefaultConfigs('Beautify',{"language":"json"});
JsonDB.setConfigHolders('Beautify',
  [{
    "name": "language",
    "type": "select",
    "options": [
      "json",
      "html",
      "css",
      "javascript"
    ]
  }]
);
*/

router.get('/', function(req, res) {
  const uid = req.query.uid;
  const reqType = req.query.type;
  console.log('[ ** get ** ]','['+uid+']','['+reqType+']');
  const base64str = req.query.str;
  const appName = JsonDB.getCurrAppName(uid);
  const configs = JsonDB.getAppConfigs(uid);
  let resultStr;
  //console.log(JsonDB.getApps());
  switch (reqType){
    case 'convert':
      const str = Buffer.from(base64str, 'base64').toString('binary');
      console.log(appName)
      const convert = appFuncs[appName](str,configs);
      resultStr = Buffer.from(convert, 'binary').toString('base64');
      break;
    case 'sample':
      const sample = appSamples[appName](configs);
      resultStr = Buffer.from(sample, 'binary').toString('base64');
      break;
    case 'configs':
      resultStr = JSON.stringify(configs);
      break;
    case 'appList':
      const apps = JsonDB.getApps();
      resultStr = JSON.stringify(apps);
      break;
    case 'configHolders':
      resultStr = JSON.stringify(JsonDB.getAppProps(appName,'configHolders'));
      break;
  };

  

  res.send({result:resultStr});
  res.end();
});


router.post('/',function(req, res) {
  const uid = req.body.uid;
  const appName = req.body.appName;
  const appConfigs = req.body.appConfigs;
  console.log('[ ** post ** ]',uid,appName,appConfigs)
  if (appName){
    JsonDB.setCurrAppName(uid,appName);
  }else if (appConfigs){
    JsonDB.setAppConfigs(uid,JSON.parse(appConfigs));
  }
  res.end();
});

module.exports = router;