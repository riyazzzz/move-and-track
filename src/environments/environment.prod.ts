import { WebAppInterface } from 'src/app/interfaces/AndroidNative';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false
};
let urlValue: string;
let cacheURL: string;
let webSocketUrl: string;
let adminSocketUrl: string;

const applicationPackNames = {
  //"GE":"com.eit.gelement",
  "GE" : "com.goldenelement.avl",
  "APM":"com.eit.apmkingstrack",
  "tracalogic":"com.eittracalogic.tracalogic",
  "Move and track": "com.mvt.apmkt",
  "Upcot-mvt" : "com.upcotmvt.upcot"
};

// let packageName = applicationPackNames.moveandtrack;
let loginImgUrl: string;
let appName = 'remoncloud';
let appVersion = '1.1.9';
const host = {
  staticIp: '122.165.187.106',
  localIp: '192.168.1.31',
  apmKT: 'apmkingstrack.com',
  localHost: 'localhost',
  //GE: 'ntrack.thegoldenelement.com',
  GE: 'mobs.thegoldenelement.com',
  GE_QA: 'gps.thegoldenelement.com',
  QA: '34.232.238.80:8090',
  SKT: 'armoronapi.apmkingstrack.com:8080',
  BeanStalk: 'us-east-1.elasticbeanstalk.com',
  lnt : 'lnt.tracalogic.co'
};

// declare var Android : WebAppInterface;

// if (/(android|iPhone|iPad|iPod)/i.test(navigator.userAgent)) {  
//  // packageName = Android.getAppId();
//   packageName = applicationPackNames.moveandtrack;
// } else {
//   urlValue = '/Web';
//   cacheURL = '/Admin';
//   packageName = applicationPackNames.moveandtrack;
// }
let entryPoint;
switch(appName){
  case 'WFT':
  entryPoint = 'WFT';
  break;
  case 'Tracalogic':
  urlValue = "http://"+host.lnt+':8090/Web';
  //urlValue = "http://10.10.10.6:8080";
  cacheURL = "http://"+host.lnt+'/fleettrackingadmin';
  webSocketUrl = host.lnt+":8090";
  adminSocketUrl = host.lnt;
  entryPoint = 'VTS';
  loginImgUrl = 'assets/loginLogo/tracalogic.png';
  break;
  case 'Move and track':
  urlValue = "http://"+host.apmKT+":8090/Web";
  //urlValue = "http://"+host.localIp;
  cacheURL = "http://"+host.apmKT+":8090/Admin";
  webSocketUrl = host.apmKT+":8090";
  //webSocketUrl = host.localIp;
  adminSocketUrl = host.apmKT+":8090";
  entryPoint = 'VTS';
  loginImgUrl = 'assets/loginLogo/moveandtrack.png';
  break;
  case 'remoncloud':
  urlValue = "http://"+host.apmKT+":8090/Web";
  //urlValue = "http://"+host.localIp;
  cacheURL = "http://"+host.apmKT+":8090/Admin";
  webSocketUrl = host.apmKT+":8090";
  //webSocketUrl = host.localIp;
  adminSocketUrl = host.apmKT+":8090";
  entryPoint = 'VTS';
  loginImgUrl = 'assets/loginLogo/remoncloud.png';
  break;
  case "web":
    urlValue = "https://mvt.apmkingstrack.com:8443/Web";
    //urlValue = "http://"+host.localIp;
    cacheURL = "https://mvt.apmkingstrack.com:8443/Admin";
    webSocketUrl = "mvt.apmkingstrack.com:8443/";
    //webSocketUrl = host.localIp;
    adminSocketUrl = "mvt.apmkingstrack.com:8443/";
    entryPoint = 'VTS';
    loginImgUrl = 'assets/loginLogo/moveandtrack.png';
    break;
  case 'localHost':
  urlValue = "http://"+host.localHost+":8080/Web";
  //urlValue = "http://"+host.localIp;
  cacheURL = "http://"+host.apmKT+":8090/Admin";
  webSocketUrl = host.localHost+":8080";
  //webSocketUrl = host.localIp;
  adminSocketUrl = host.apmKT+":8090";
  entryPoint = 'VTS';
  loginImgUrl = 'assets/loginLogo/moveandtrack.png';
  break;
  case 'Upcot-mvt':
  urlValue = "http://"+host.apmKT+":8090/Web";
  //urlValue = "http://"+host.localIp;
  cacheURL = "http://"+host.apmKT+":8090/Admin";
  webSocketUrl = host.apmKT+":8090";
  //webSocketUrl = host.localIp;
  adminSocketUrl = host.apmKT+":8090";
  entryPoint = 'VTS';
  loginImgUrl = 'assets/loginLogo/upcot.png';
  break;
  case 'GE':
  urlValue = "http://"+host.GE+":8090/Web";
  //urlValue = "http://"+host.localIp;
  cacheURL = "http://"+host.GE+"/fleettrackingadmin";
  webSocketUrl = host.GE+":8090";
  //webSocketUrl = host.localIp;
  adminSocketUrl = host.GE+":8090";
  entryPoint = 'VTS';
  loginImgUrl = 'assets/loginLogo/ge.png';
  break;
  case 'Local Host':
  urlValue = "http://"+host.localIp+":8080/Web";
  //urlValue = "http://"+host.localIp;
  cacheURL = "http://"+host.localIp+"/fleettrackingadmin";
  webSocketUrl = host.localIp+":8080";
  //webSocketUrl = host.localIp;
  adminSocketUrl = host.localIp;
  entryPoint = 'VTS';
  loginImgUrl = 'assets/loginLogo/moveandtrack.png';
  break;
  case 'Static Ip':
    urlValue = "http://"+host.staticIp+":8090/Web";
    //urlValue = "http://"+host.localIp;
    cacheURL = "http://"+host.staticIp+"/fleettrackingadmin";
    webSocketUrl = host.staticIp+":8090";
    //webSocketUrl = host.localIp;
    adminSocketUrl = host.staticIp+":8090";
    entryPoint = 'VTS';
    loginImgUrl = 'assets/loginLogo/moveandtrack.png';
    break;
  default : 
  urlValue = "http://"+host.apmKT+":8090/Web";
  cacheURL = "http://"+host.apmKT+"/fleettrackingadmin"
  entryPoint = 'VTS';
}



export let serverUrl = {
  web : urlValue,
  Admin : cacheURL,
  websocket : webSocketUrl,
  adminSocket : adminSocketUrl
}
export const app = {
  "package": applicationPackNames[appName],
  "entryPoint" :entryPoint,
  "loginImgUrl":loginImgUrl,
  "appName" : appName,
  "appVersion": appVersion
}

/*
* For easier debugging in development mode, you can import the following file
* to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
*
* This import should be commented out in production mode because it will have a negative impact
* on performance if an error is thrown.
*/
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.