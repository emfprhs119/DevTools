

import AppList from "../../CompAppList.json";
function findTarget (appNameStr,matchPropNameStr) {
    const target =  AppList.reduce((acc, cur, i) => {
        if (appNameStr === acc[matchPropNameStr])
        return acc
        else if (appNameStr === cur[matchPropNameStr])
        return cur;
        else{
        return acc;
        }
    });
    return target;
}

export default function findAppInfoFromName(appName){
    const target =  AppList.reduce((acc, cur, i) => {
        if (appName === acc.name)
        return acc
        else if (appName === cur.name)
        return cur;
        else{
        return acc;
        }
    });
    return target;
}
