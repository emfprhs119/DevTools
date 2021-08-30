var Apps = require('./AppList.json')

//db.push('/Apps',Apps);
sessionStorage.setItem('/Apps',JSON.stringify(Apps));

module.exports.getApps = function getApps(){
    console.log('[getApps]');
    //const apps = db.getData('/Apps')
    const appsData = sessionStorage.getItem('/Apps');
    const apps = JSON.parse(appsData)
    console.log(apps)
    return apps;
}

module.exports.getAppInfo = function getAppInfo(appName){
    console.log('[getAppInfo]');
    const apps = this.getApps()
    for (let index = 0; index < apps.length; index++) {
        const element = apps[index];
        if (element.name === appName)
            return element;
    }
    return 'dontfind'
}

module.exports.getAppProps = function getAppProps(appName,propName){
    console.log('[getAppProps]');
    const apps = this.getApps()
    for (let index = 0; index < apps.length; index++) {
        const element = apps[index];
        if (element.name === appName)
            return element[propName];
    }
    return 'dontfind'
}

module.exports.setAppConfigs = function setAppConfigs(uid,config){
    console.log('[setAppConfigs]');
    const appName = this.getCurrAppNameBase64(uid);
    //db.push('/'+uid+'/'+appName+'/config',config);
    const configStr = JSON.stringify(config);
    sessionStorage.setItem('/'+uid+'/'+appName+'/config',configStr);
}

module.exports.getAppConfigs = function getAppConfigs(uid){
    console.log('[getAppConfigs]');
    let v = undefined;
    try{
        //v = db.getData('/'+uid+'/'+this.getCurrAppNameBase64(uid)+'/config')
        const configStr = sessionStorage.getItem('/'+uid+'/'+this.getCurrAppNameBase64(uid)+'/config');
        v = JSON.parse(configStr);
    }catch(e){} // didn't found elements
    return v;
}

module.exports.setCurrAppName = function setCurrAppName(uid,appName){
    const str64 = Buffer.from(appName, 'binary').toString('base64');
    console.log('[setCurrAppName]','/'+uid+'/currAppName',str64);
    //db.push('/'+uid+'/currAppName',str64);
    sessionStorage.setItem('/'+uid+'/currAppName',str64);
    if (!this.getAppConfigs(uid))
        this.setAppConfigs(uid,this.getAppProps(this.getCurrAppName(uid),'defaultConfigs'));
}

module.exports.getCurrAppNameBase64 = function getCurrAppName(uid){
    console.log('[getCurrAppNameBase64]','/'+uid+'/currAppName');
    if (!uid)
        return undefined
    //return db.getData('/'+uid+'/currAppName');
    return sessionStorage.getItem('/'+uid+'/currAppName');
}

module.exports.getCurrAppName = function getCurrAppName(uid){
    console.log('[getCurrAppName]','/'+uid+'/currAppName');
    if (!uid)
        return undefined
    //const str64 = db.getData('/'+uid+'/currAppName');
    const str64 = sessionStorage.getItem('/'+uid+'/currAppName');
    const appName = Buffer.from(str64, 'base64').toString('binary');
    return appName;
}

//export {getSessionInfo,initSession}