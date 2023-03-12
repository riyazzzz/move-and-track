import { WebAppInterface } from "src/app/interfaces/AndroidNative";
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
};

let urlValue: string;
let cacheURL: string;
let webSocketUrl: string;
let adminSocketUrl: string;
let fmsUrl: string;

export let storageVariable = {
  upDatedJsonData: undefined,
  dashboardData: undefined,
};

export let adminLocalStorage = {
  dealerLoginData: undefined,
  reportData: undefined,
};

let ticketUrl: string;
const applicationPackNames = {
  //"GE":"com.eit.gelement",
  GE: "com.ge.goldenelement.avl",
  APM: "com.eit.apmkingstrack",
  tracalogic: "com.eittracalogic.tracalogic",
  "Move and track": "com.mvt.apmkt",
  "Move and track ios": "com.apm.mvtkt",
  "Upcot-mvt": "com.upcotmvt.upcot",
  Remoncloud: "com.elint.remon",
  Armoron: "com.apmkingstrack.armoron",
};

// let packageName = applicationPackNames.moveandtrack;

let loginImgUrl: string;
let appName = "MnT Live";
//  let armoronappVersion = '2.1.1';
let appVersion = "2.1.3";
// let appVersion = '2.1.9';
// let androidappVersion = '2.1.3';
export const host = {
  staticIp: "122.165.187.106",
  localIp: "192.168.0.109",
  GeLive: "track.thegoldenelement.com",
  // testingServer: '161.97.151.243',
  testingServer: "3.6.171.231",
  // windowServer: '3.6.171.231',
  // windowServer: '192.168.0.134',
  windowServer: "testing.apmkingstrack.com",
  apmKT: "mvt.apmkingstrack.com",
  localHost: "192.168.0.120",
  //GE: 'ntrack.thegoldenelement.com',
  Armoron: "armoron.apmkingstrack.com",
  GE: "mobs.thegoldenelement.com",
  GE_QA: "gps.thegoldenelement.com",
  QA: "34.232.238.80:8090",
  SKT: "armoronapi.apmkingstrack.com:8080",
  BeanStalk: "us-east-1.elasticbeanstalk.com",
  lnt: "lnt.tracalogic.co",
  demo: "75.119.153.123",
};
// http://161.97.151.243:8090/mtrack/#/reports/null
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
console.log("hi");
let backgroundImage =
  "https://kingstrackimages.s3.amazonaws.com/loginimages/track_apmkingstrack_com_background.jpg";
switch (appName) {
  case "WFT":
    entryPoint = "WFT";
    break;
  case "Tracalogic":
    urlValue = "http://" + host.lnt + ":8090/Web";
    //urlValue = "http://10.10.10.6:8080";
    //  cacheURL = "http://" + host.lnt
    webSocketUrl = "ws://" + host.lnt + ":8090";
    adminSocketUrl = "ws://" + host.lnt;
    entryPoint = "VTS";
    loginImgUrl = "assets/loginLogo/tracalogic.png";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "Move and track":
    urlValue = "http://" + host.apmKT + ":8090/Web";
    cacheURL = "http://" + host.apmKT + ":8090/Admin";
    webSocketUrl = "ws://" + host.apmKT + ":8090";
    adminSocketUrl = "ws://" + host.apmKT + ":8090";
    entryPoint = "VTS";
    loginImgUrl = "assets/loginLogo/moveandtrack.png";
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent))
      applicationPackNames[appName] = "com.apm.mvtkt";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "MnT test":
    urlValue = "https://" + host.windowServer + "/fleettracking";
    //urlValue = "http://"+host.localIp;
    cacheURL = "https://" + host.windowServer + "/Admin";
    webSocketUrl = "wss://" + host.windowServer;
    //webSocketUrl = host.localIp;
    adminSocketUrl = "wss://" + host.windowServer;
    entryPoint = "VTS";
    appName = "Move and track";
    loginImgUrl = "assets/loginLogo/moveandtrack.png";
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent))
      applicationPackNames[appName] = "com.apm.mvtkt";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    fmsUrl = "https://" + host.windowServer + "/fleettracking";
    break;

  case "MnT Live":
    // urlValue = "http://" + "192.168.0.113:8081" + "/fleettracking";
    urlValue = "https://" + host.apmKT + "/fleettracking";
    //urlValue = "http://"+host.localIp;
    cacheURL = "https://" + host.apmKT + "/Admin";
    webSocketUrl = "wss://" + host.apmKT;
    //webSocketUrl = host.localIp;
    adminSocketUrl = "wss://" + host.apmKT;
    entryPoint = "VTS";
    appName = "Move and track";
    loginImgUrl = "assets/loginLogo/moveandtrack.png";
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent))
      applicationPackNames[appName] = "com.apm.mvtkt";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    fmsUrl = "http://" + host.apmKT + "8095/fms";
    break;
  case "GoodGps":
    urlValue = "https://" + host.apmKT + "/fleettracking";
    //urlValue = "http://"+host.localIp;
    cacheURL = "https://" + host.apmKT + "/Admin";
    webSocketUrl = "wss://" + host.apmKT;
    //webSocketUrl = host.localIp;
    adminSocketUrl = "wss://" + host.apmKT;
    entryPoint = "VTS";
    appName = "GoodGps";
    loginImgUrl =
      "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/goodgps.jpg";
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent))
      applicationPackNames[appName] = "com.sunra.mvt";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "Sunra":
    urlValue = "https://" + host.apmKT + "/fleettracking";
    //urlValue = "http://"+host.localIp;
    cacheURL = "https://" + host.apmKT + "/Admin";
    webSocketUrl = "wss://" + host.apmKT;
    //webSocketUrl = host.localIp;
    adminSocketUrl = "wss://" + host.apmKT;
    entryPoint = "VTS";
    appName = "Sunra";
    loginImgUrl = "assets/loginLogo/sunra.jpg";
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent))
      applicationPackNames[appName] = "com.sunra.mvt";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;
  case "fleetPolice":
    urlValue = "https://" + host.apmKT + "/fleettracking";
    //urlValue = "http://"+host.localIp;
    cacheURL = "https://" + host.apmKT + "/Admin";
    webSocketUrl = "wss://" + host.apmKT;
    //webSocketUrl = host.localIp;
    adminSocketUrl = "wss://" + host.apmKT;
    entryPoint = "VTS";
    appName = "fleetPolice";
    loginImgUrl =
      "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/dfadf.jpg";
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent))
      applicationPackNames[appName] = "com.sunra.mvt";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "MnT Web":
    urlValue = "https://mvt.apmkingstrack.com/fleettracking";
    //urlValue = "http://"+host.localIp;
    cacheURL = "https://mvt.apmkingtrack.com/Admin";
    webSocketUrl = "wss://mvt.apmkingtrack.com";
    //webSocketUrl = host.localIp;
    adminSocketUrl = "wss://mvt.apmkingtrack.com";
    entryPoint = "VTS";
    appName = "Move and track";
    loginImgUrl = "assets/loginLogo/moveandtrack.png";
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent))
      applicationPackNames[appName] = "com.apm.mvtkt";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "MnT Demo":
    urlValue = "http://" + host.demo + ":8081/fleettracking";
    //urlValue = "http://"+host.localIp;
    cacheURL = "http://" + host.demo + ":8091/Admin";
    webSocketUrl = "ws://" + host.demo + ":8091";
    //webSocketUrl = host.localIp;
    adminSocketUrl = "ws://" + host.demo + ":8091";
    entryPoint = "vts";
    appName = "mvt-demo";
    loginImgUrl = "assets/loginLogo/moveandtrack.png";
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent))
      applicationPackNames[appName] = "com.apm.mvtkt";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "Idea Track":
    urlValue = "https://" + host.apmKT + "/fleettracking";
    //urlValue = "http://"+host.localIp;
    cacheURL = "https://" + host.apmKT + "/Admin";
    webSocketUrl = "wss://" + host.apmKT;
    //webSocketUrl = host.localIp;
    adminSocketUrl = "wss://" + host.apmKT;
    entryPoint = "VTS";
    appName = "Ideatrack";
    loginImgUrl = "assets/loginLogo/idea.png";
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent))
      applicationPackNames[appName] = "com.apm.ideatrack";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "GE Live":
    urlValue = "https://" + host.GeLive + "/fleettracking";
    //urlValue = "http://"+host.localIp;
    cacheURL = "https://" + host.GeLive + "/Admin";
    webSocketUrl = "wss://" + host.GeLive;
    //webSocketUrl = host.localIp;
    adminSocketUrl = "wss://" + "spring.thegoldenelement.com";
    entryPoint = "VTS";
    appName = "GE";
    loginImgUrl = "assets/loginLogo/ge.png";
    backgroundImage =
      "https://kingstrackimages.s3.amazonaws.com/loginimages/track_thegoldenelement_com_background.jpg";
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent))
      applicationPackNames[appName] = "com.apm.mvtkt";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "Window Server":
    urlValue = "http://" + host.windowServer + ":8081/fleettracking";
    //urlValue = "http://"+host.localIp;
    cacheURL = "http://" + host.windowServer + ":8091/Admin";
    webSocketUrl = "ws://" + host.windowServer + ":8091";
    //webSocketUrl = host.localIp;
    adminSocketUrl = "ws://" + host.windowServer + ":8091";
    entryPoint = "unknown";
    appName = "Move and track";
    loginImgUrl = "assets/loginLogo/moveandtrack.png";
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent))
      applicationPackNames[appName] = "com.apm.mvtkt";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;
  // Armoron
  case "Armoron":
    urlValue = "http://" + host.Armoron + ":8081/fleettracking";
    cacheURL = "http://" + host.Armoron + ":8091/Admin";
    webSocketUrl = "ws://" + host.Armoron + ":8091";
    adminSocketUrl = "ws://" + host.Armoron + ":8091";
    entryPoint = "VTS";
    loginImgUrl = "assets/loginLogo/moveandtrack.png";
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent))
      applicationPackNames[appName] = "com.apmkingstrack.armoron";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "ParentApp":
    urlValue = "http://" + host.apmKT + ":8081/fleettracking";
    cacheURL = "http://" + host.apmKT + ":8090/Admin";
    // webSocketUrl = "ws://" + host.windowServer + ":8090";
    webSocketUrl = "wss://" + host.apmKT;
    adminSocketUrl = "wss://" + host.apmKT;
    entryPoint = "VTS";
    loginImgUrl = "assets/loginLogo/moveandtrack.png";
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent))
      applicationPackNames[appName] = "com.armoron10.apmkingstrack";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "ParentApp_test":
    urlValue = "http://" + host.testingServer + ":8081/fleettracking";
    cacheURL = "http://" + host.testingServer + ":8090/Admin";
    // webSocketUrl = "ws://" + host.windowServer + ":8090";
    webSocketUrl = "ws://" + host.apmKT + ":8091";
    adminSocketUrl = "ws://" + host.apmKT + ":8090";
    entryPoint = "VTS";
    loginImgUrl = "assets/loginLogo/moveandtrack.png";
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent))
      applicationPackNames[appName] = "com.armoron10.apmkingstrack";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "Remoncloud":
    // urlValue = "http://" + host.apmKT + ":8090/Web";
    // //urlValue = "http://"+host.localIp;
    // cacheURL = "http://" + host.apmKT + ":8090/Admin";
    // webSocketUrl = "ws://" + host.apmKT + ":8090";
    // //webSocketUrl = host.localIp;
    // adminSocketUrl = "ws://" + host.apmKT + ":8090";
    // entryPoint = 'unknown';
    urlValue = "https://" + host.apmKT + "/fleettracking";
    //urlValue = "http://"+host.localIp;
    cacheURL = "https://" + host.apmKT + "/Admin";
    webSocketUrl = "wss://" + host.apmKT;
    //webSocketUrl = host.localIp;
    adminSocketUrl = "wss://" + host.apmKT;
    entryPoint = "VTS";
    appName = "Remon Cloud";
    loginImgUrl = "assets/loginLogo/remoncloud.png";
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent))
      applicationPackNames[appName] = "com.elint.remon";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "web":
    appName = "Move and track";
    urlValue = "https://mvt.apmkingstrack.com:8443/Web";
    // //urlValue = "http://"+host.localIp;
    cacheURL = "https://mvt.apmkingstrack.com:8443/Admin";
    // webSocketUrl = "wss://"+"mvt.apmkingstrack.com:8443/";
    // //webSocketUrl = host.localIp;
    // adminSocketUrl = "wss://"+"mvt.apmkingstrack.com:8443/";
    // urlValue = "/Web";
    // cacheURL = "/Admin";
    webSocketUrl = "wss://" + "mvt.apmkingstrack.com:8443/";
    adminSocketUrl = "wss://" + "mvt.apmkingstrack.com:8443/";
    entryPoint = "VTS";
    loginImgUrl = "assets/loginLogo/moveandtrack.png";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "Remon web":
    urlValue = "http://" + "track.remon.in" + "/Web";
    //urlValue = "http://"+host.localIp;
    cacheURL = "http://" + "track.remon.in" + ":/Admin";
    webSocketUrl = "ws://" + "track.remon.in" + "";
    //webSocketUrl = host.localIp;
    adminSocketUrl = "ws://" + "track.remon.in" + "";
    entryPoint = "unknown";
    loginImgUrl = "assets/loginLogo/remoncloud.png";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "localHost":
    urlValue = "http://" + host.localHost + ":8081/fleettracking";
    //urlValue = "http://"+host.localIp;
    cacheURL = "http://" + host.localHost + ":8091/Admin";
    webSocketUrl = "ws://" + host.localHost + ":8091";
    //webSocketUrl = host.localIp;
    adminSocketUrl = "ws://" + host.localHost + ":8091";
    entryPoint = "VTS";
    loginImgUrl = "assets/loginLogo/moveandtrack.png";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "testingServer":
    urlValue = "http://" + host.testingServer + ":8081/fleettracking";
    //urlValue = "http://"+host.localIp;
    cacheURL = "http://" + host.testingServer + ":8093/Admin";
    webSocketUrl = "ws://" + host.testingServer + ":8083";
    //webSocketUrl = host.localIp;
    adminSocketUrl = "ws://" + host.testingServer + ":8093";
    entryPoint = "VTS";
    loginImgUrl = "assets/loginLogo/moveandtrack.png";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;
  case "Upcot-mvt":
    urlValue = "http://" + host.apmKT + ":8090/Web";
    //urlValue = "http://"+host.localIp;
    cacheURL = "http://" + host.apmKT + ":8090/Admin";
    webSocketUrl = "ws://" + host.apmKT + ":8090";
    //webSocketUrl = host.localIp;
    adminSocketUrl = "ws://" + host.apmKT + ":8090";
    entryPoint = "VTS";
    loginImgUrl = "assets/loginLogo/upcot.png";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "GE":
    urlValue = "http://" + host.apmKT + ":8090/Web";
    cacheURL = "http://" + host.apmKT + ":8090/Admin";
    webSocketUrl = "ws://" + host.apmKT + ":8090";
    adminSocketUrl = "ws://" + host.apmKT + ":8090";
    entryPoint = "VTS";
    loginImgUrl = "assets/loginLogo/ge.png";
    break;

  case "Local Host":
    urlValue = "http://" + host.localIp + ":8081/fleettracking";
    //urlValue = "http://"+host.localIp;
    cacheURL = "http://" + host.localIp + ":8091/Admin";
    webSocketUrl = "ws://" + host.localIp + ":8091";
    //webSocketUrl = host.localIp;
    adminSocketUrl = "ws://" + host.localIp + ":8091";
    entryPoint = "VTS";
    loginImgUrl = "assets/loginLogo/moveandtrack.png";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "Static Ip":
    urlValue = "http://" + host.staticIp + ":8090/Web";
    //urlValue = "http://"+host.localIp;
    cacheURL = "http://" + host.staticIp + "/fleettrackingadmin";
    webSocketUrl = "ws://" + host.staticIp + ":8090";
    //webSocketUrl = host.localIp;
    adminSocketUrl = "ws://" + host.staticIp + ":8090";
    entryPoint = "VTS";
    loginImgUrl = "assets/loginLogo/moveandtrack.png";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    break;

  case "FMS":
    urlValue = "https://" + host.windowServer + "/fleettracking";
    //urlValue = "http://"+host.localIp;
    cacheURL = "https://" + host.windowServer + "/Admin";
    webSocketUrl = "wss://" + host.windowServer;
    //webSocketUrl = host.localIp;
    adminSocketUrl = "wss://" + host.windowServer;
    entryPoint = "VTS";
    appName = "FMS";
    loginImgUrl =
      "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/fms.png";
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent))
      applicationPackNames[appName] = "com.apm.mvtkt";
    ticketUrl = "https://apmkingstrack.freshdesk.com";
    backgroundImage =
      "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/fmslogin.gif";
    fmsUrl = "https://" + host.windowServer + "/fleettracking";
    break;

  default:
    urlValue = "http://" + host.apmKT + ":8090/Web";
    cacheURL = "http://" + host.apmKT + "/fleettrackingadmin";
    entryPoint = "VTS";
}

export let serverUrl = {
  web: urlValue,
  Admin: cacheURL,
  websocket: webSocketUrl,
  adminSocket: adminSocketUrl,
  ticketUrl: ticketUrl,
  fmsUrl: fmsUrl,
};
export const app = {
  package: applicationPackNames[appName],
  entryPoint: entryPoint,
  loginImgUrl: loginImgUrl,
  appName: appName,
  appVersion: appVersion,
  bgImage: backgroundImage,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
