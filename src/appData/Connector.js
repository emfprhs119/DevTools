/* eslint-disable default-case */
var Samples= require('./sample');
const {Base64} = require('js-base64');
var Papa = require('papaparse')
var beautify_js = require('js-beautify').js;
var beautify_css = require('js-beautify').css;
var beautify_html = require('js-beautify').html;
var dataStorage = require('./dataStorage')

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
appFuncs['Beautifier'] = (str,config) => {
  let result = "Error !!!";
  switch(config.language){
    case 'json':result = beautify_json(str);break;
    case 'javascript':result = beautify_js(str);break;
    case 'css':result = beautify_css(str);break;
    case 'html':result = beautify_html(str);break;
  }
  return result;
};
appFuncs['Formatter'] = (str,config) => {
  let result = "Error !!!";
  switch(config.format){
    case 'base64':
      if (config.type === 'encoder')
        result = Base64.encode(str)
      else{
        try{
          result = Base64.decode(str)
        }catch{
          result = 'InvalidCharacterError !!!'
        }
      }
      break;
  }
  return result
}


const csvStringToArray = (strData) =>
{
  var results = Papa.parse(strData);
  return results.data;
}

appFuncs['Viewer'] = (str,config) => {
  let result = "Error !!!";
  switch(config.format){
    case 'csv':result = csvStringToArray(str);break;
  }
  return JSON.stringify(result)
}


appSamples['Beautifier'] = (config) => {
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
appSamples['Formatter'] = (config) => {
  let result = 'Error !!!'
  switch(config.format+config.type){
  case 'base64encoder':result = Samples.base64encode;break;
  case 'base64decoder':result = Samples.base64decode;break;
}
return result
}

appSamples['Viewer'] = (config) => {
  let result = 'Error !!!'
  console.log(config.format)
  switch(config.format){
  case 'csv':result = Samples.csv;break;
}
return result
}


const get = (req, res) => {
    console.log('[ ** get ** ]','['+req.uid+']','['+req.type+']');
    const appName = dataStorage.getCurrAppName(req.uid);
    const configs = dataStorage.getAppConfigs(req.uid);
    let resultStr;
    switch (req.type){
      case 'convert':
        const str = Base64.decode(req.str);
        const convert = appFuncs[appName](str,configs);
        resultStr = Base64.encode(convert);
        break;
      case 'sample':
        const sample = appSamples[appName](configs);
        resultStr = Base64.encode(sample);
        break;
      case 'configs':
        resultStr = JSON.stringify(configs);
        break;
      case 'appList':
        const apps = dataStorage.getApps();
        resultStr = JSON.stringify(apps);
        break;
      case 'appInfo':
        resultStr = JSON.stringify(dataStorage.getAppInfo(appName));
        break;
    };
    res({result:resultStr});
  };

const post = (req,callback) => {
    const uid = req.uid;
  const appName = req.appName;
  const appConfigs = req.appConfigs;
  console.log('[ ** post ** ]',uid,appName,appConfigs)
  if (appName){
    dataStorage.setCurrAppName(uid,appName);
  }else if (appConfigs){
    dataStorage.setAppConfigs(uid,JSON.parse(appConfigs));
  }
  if (callback)
    callback();
}

module.exports = {get,post}