import { Injectable } from '@angular/core';
import { Observable,Subscription } from 'rxjs';
import { QueueingSubject } from 'queueing-subject';
import { map, share, switchMap } from 'rxjs/operators';
import makeWebSocketObservable,{ 
  GetWebSocketResponses,
  normalClosureMessage,
} from 'rxjs-webSockets';
import { websocket } from '../interfaces/webSocket';
import { serverUrl,app } from 'src/environments/environment';
import { webSocket } from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class WebsocketliveService {
  constructor(
    private webSocketInstance : websocket
    ) { }
    messagesSubscription : Subscription;
    socket$: any;
    subject$: any;
    input$ = new QueueingSubject<string>(); 
    messages$: Observable<any>;
    
    setProductService(ws : websocket){
      this.webSocketInstance = ws; 
    }
    
    isAlive(type){
      let status = false;
      if(this.subject$ && this.subject$._socket && this.subject$._socket.url.indexOf(type) !== -1){
        (this.subject$.closed == false)? status = true : status = false;
      }      
      return status;
    }
    
    // connectSocket(input: any,type: string){
    //   // queue up a request to be sent when the websocket connects
    //   this.input$.next(input);
    //   // create the websocket observable, does *not* open the websocket connection
    //   switch(type){
    //     case "dashboard":
    //     this.socket$ = makeWebSocketObservable('ws://' +serverUrl.websocket+ '/Web/dashboardendpoint');
    //    // this.socket$ = makeWebSocketObservable('ws://10.10.10.28:8080/dashboardendpoint');
    //     break;
    //     case "alert":
    //     this.socket$ = makeWebSocketObservable('wss://' +serverUrl.adminSocket+ '/fleettrackingadmin/alertsmanagerendpoint');
    //     break;
    //     case "livetrack":
    //     this.socket$ = makeWebSocketObservable('wss://' +serverUrl.adminSocket+ '/fleettrackingadmin/livetrackingendpoint');
    //     break;  
    //   }
    //   if(type !== 'addressUpdate'){
    //      this.messages$ =
    //     this.socket$.pipe(
    //       // the observable produces a value once the websocket has been opened
    //       switchMap((getResponses: GetWebSocketResponses) => {
    //         console.log('websocket opened');
    //         localStorage.setItem('DashboardWebSocket', 'created');
    //         return getResponses(this.input$);
    //       }),
    //       share(),
    //       ) 
    //       this.messagesSubscription = this.messages$.subscribe(
    //         (message: string) => {
    //           if(this.webSocketInstance){
    //             this.webSocketInstance.wsResponse(JSON.parse(message));
    //           }else{
    //             this.messagesSubscription.unsubscribe();
    //             console.log('Websocket closed');
    //           }
    //         },
    //         (error: Error) => {
    //           const { message } = error;
    //           if (message === normalClosureMessage) {
    //             console.log('server closed the websocket connection normally');
    //           } else {
    //             console.log('socket was disconnected due to error:', message);
    //           }
    //         },
    //         () => {
    //           // The clean termination only happens in response to the last
    //           // subscription to the observable being unsubscribed, any
    //           // other closure is considered an error.
    //           console.log('the connection was closed in response to the user');
    //           localStorage.removeItem('DashboardWebSocket');
    //         },
    //         );
    //       }
    
    //     }
    connectSocket(input: any,type: string){
      switch(type){
        case "dashboard":
        this.subject$ = webSocket(serverUrl.websocket+ "/Web/dashboardendpoint");
        //this.subject$ = webSocket("ws://"+serverUrl.websocket+ "/dashboardendpoint");
        this.subject$.next(input);
        console.log("Dashboard websocket connected!");
        break;
        case "alert":
        this.subject$ = webSocket(serverUrl.adminSocket+ '/fleettrackingadmin/alertsmanagerendpoint');
        this.subject$.next(input);
        console.log("Alerts websocket connected!");
        break;
        case "livetrack":
        // this.subject$ = app.appName !== 'GE' ? webSocket('ws://' +serverUrl.adminSocket+ '/Admin/livetrackingendpoint') : webSocket('ws://' +serverUrl.adminSocket+ '/fleettrackingadmin/livetrackingendpoint');
        this.subject$ = webSocket(serverUrl.adminSocket+ '/Admin/livetrackingendpoint')
        // this.subject$ = webSocket('ws://' +"122.165.146.212:9090"+ '/fleettrackingadmin/livetrackingendpoint');
        this.subject$.next(input);
        console.log("Admin websocket connected!");
        break;  
      }
      this.subject$.subscribe(
        res =>{
          if(this.webSocketInstance){
            this.webSocketInstance.wsResponse(res);
          }else{
            this.subject$.unsubscribe();
            console.log('Websocket closed');
          }
        },
        err =>{
          if(this.webSocketInstance){
            this.webSocketInstance.wsOnError();
          }
          console.log(err);
        },
        close =>{
          console.log("Websocket closed");
        });
      }
      reSendRequest(input){
        this.subject$.next(input);
      };
      
      disConnectSocket(type){
        // let subject : any;
        // if(type = 'dashboard'){
        //   subject = webSocket("ws://"+serverUrl.websocket+ "/Web/dashboardendpoint");
        // }else{
        //   subject = webSocket("wss://"+serverUrl.websocket+"/fleettrackingadmin/livetrackingendpoint");
        // }
        // if(subject.closed == false){
        //   subject.unsubscribe();
        //   console.log("Websocket closed");
        // }
        this.subject$.unsubscribe();
        // this.subject$.complete();
      }
}
