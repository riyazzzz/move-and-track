import { Component, EventEmitter, Input, OnInit, Output ,OnDestroy, OnChanges, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { TicketServiceService } from "../../services/ticket-service.service";
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { CommonService } from '../../services/common.service';
import { AjaxService } from "../../services/ajax.service";
import { AddTicketComponent } from '../add-ticket/add-ticket.component'
import { ModalController, Platform } from '@ionic/angular';
import { serverUrl } from 'src/environments/environment';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import {ImageConversationComponent} from '../image-conversation/image-conversation.component';
import { ConversationTabPage } from '../conversation-tab/conversation-tab.page';
@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss'],
})
export class TicketCardComponent implements OnInit {
  @ViewChild('scroll',{static:true})scroll;
   uploader: FileUploader = new FileUploader({});
  imageBlock;
  audioBlock;
  fileValue;
  image='';
  countCoversation=2;
  countValue=1;
  myPlatform;  
  id: string;
  sub: string;
  answer='';
  replyObj;
  fabButton = false;
  responceData: number = 0;
  page;
  data=[];
  data1=[];
  conversation;
  messages= false;  
  customerId= false;
  sendbtn= false;
  imageUrl="https://s3.ap-south-1.amazonaws.com/ind-cdn.freshdesk.com/data/helpdesk/attachments/production/81015216350/original/subscriptionPopup.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2WD6T3JNC%2F20201208%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20201208T062011Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=caef5c11f22b73dea80ee6c3e63609ceb7895ade02d62c988038a8499b8d228b"
  uploadFileToUrl: (file: any, uploadUrl: any) => void;
  file:any;
  url: any;
  count: number;
  title = 'micRecorder';
  record;
  recording = false;
  audioUrl;
  error;
  mobileCardData = 'mobileCard';
  ticketCard;
  ticketConversation;
  conversationBack = 'getConversationFail';
  tabId: any;
  tabSub: any;
  companyDetail: { branchID: string; companyID: string; userId: string; };
  email: any;
  getContact_url: string=serverUrl.ticketUrl +"/api/v2/contacts";
  today = new Date(); 
  constructor(
    private filePath: FilePath,
    private router:Router,
    private toastController:ToastController,
    private TicketService: TicketServiceService,
    private commonService: CommonService,
    private modalController:ModalController,
    private ajaxService:AjaxService,
    private platform: Platform,
    private http: HttpClient,
    private formBuilder:FormBuilder,
   
    private location: Location,
  ) { }

  enableSendbtn(data){
     if(data.target.value == ''){
      this.sendbtn=false;
    }
    else{
      this.sendbtn=true;
    }
  }
  delete(index){
    this.uploader.queue.splice(index, 1);
  }
  
  async openModel() {

    const modal = await this.modalController.create({
      component:AddTicketComponent,
     cssClass: 'ticket-form'
      });
      modal.onDidDismiss().then(()=>{
        this.getContact_url = serverUrl.ticketUrl +"/api/v2/contacts";
        this.countValue = 1;
       this.getContact();
        } )
    return await modal.present(); 
  }

  // async enlargeImage(image){
  //   const modal = await this.modalController.create({
  //     component:ImageConversationComponent,
  //     componentProps: {
  //       value: image,
  //      }
  //   });
  //   return await modal.present(); 
     
  // }
  ticket=[];
  goBack(){
    this.ticketConversation = false;
    this.ticketCard = this.conversationBack;
  }
  async getConversation(id,sub){
    this.tabId = id;
    this.tabSub = sub;
    if(this.myPlatform !== "desktop"){
     let modal = await this.modalController.create({
        component : ConversationTabPage,
        componentProps: {
          id: id,
          sub: sub
        }
      })
      return await modal.present();
    
  }
    else if (this.myPlatform == "desktop"){
     this.ticketConversation = true;
      }
   console.log(id,sub)
   localStorage.setItem('coversationId',id);
   localStorage.setItem('subject',sub);
    
    this.sub =localStorage.getItem('subject');
    this.id=localStorage.getItem('coversationId');
   
    if(this.id.length > 1){
       // this.getChats(this.id);
    }
        this.messages = true;
        this.customerId = true; 
    }

   
  getContact() {
  
        
    this.TicketService.ticketGet( this.getContact_url)
      .subscribe(res => {
        localStorage.setItem("ticketsContact",res);
        this.responceData = 0;
        for (let i = 0; i < res.length; i++) {
          if (res[i].name.toLowerCase() == localStorage.getItem("corpId").toLowerCase()) {
            this.responceData = res[i].id;
          }
        }
        if(this.responceData == 0 && res.length == 30){
          this.countValue++;
          this.getContact_url = serverUrl.ticketUrl +"/api/v2/contacts?page="+this.countValue;
         
          this.getContact()
        }else{
          if (this.responceData != 0) {
            this.getTicketsList(this.responceData);
            localStorage.setItem('requesterId', JSON.stringify(this.responceData));
           
          } else {
            this.commonService.presentToast('No Tickets.....!');
           this.ticket= [
              {
                "cc_emails": [],
                "fwd_emails": [],
                "reply_cc_emails": [],
                "ticket_cc_emails": [],
                "fr_escalated": false,
                "spam": false,
                "email_config_id": null,
                "group_id": null,
                "priority": 1,
                "requester_id": 81025435419,
                "responder_id": 81003182444,
                "source": 3,
                "company_id": null,
                "status": "",
                "subject": "No Tickets Available",
               
                "id": '',
                "type": null,
                "due_by": "2020-12-10T11:09:37Z",
                "fr_due_by": "2020-12-08T11:09:37Z",
                "is_escalated": true,
                "custom_fields": {},
                "created_at": "",
                "updated_at": "",
                
              }]
  
          }
        }
        
      })
  }
  
  getTicketsList(id){
    const url = serverUrl.ticketUrl + "/api/v2/tickets?requester_id=" + id;
    this.TicketService.ticketGet(url)
      .subscribe(res => {
        this.ticket=res;
        this.ticket.sort((a,b)=> a.id-b.id)
       console.log(this.ticket)
      })
  }

  getChats(id) {
    const url = serverUrl.ticketUrl +"/api/v2/tickets/" + id + "/conversations";
    this.TicketService.ticketGet(url)
      .subscribe(res => {
        console.log(res);
        this.conversation =res;
        if(this.conversation.length == 30){
         
          this.countCoversation=2;
          this.getMoreChats(id);
  }
       })
     
  }

  getMoreChats(id){
   this.commonService.presentLoader();
    const url1 = serverUrl.ticketUrl +"/api/v2/tickets/" + id + "/conversations?page="+this.countCoversation
    this.TicketService.ticketGet(url1).subscribe(res=>{
    this.countCoversation++;
    this.conversation=this.conversation.concat(res);
    this.commonService.dismissLoader();
   if(res.length == 30){
    this.getMoreChats(id);
   }
   
  
    })
  }

  // item=[];
  sample(){
    let url = serverUrl.web + "/login/wft";
    var date = this.today.getFullYear() + "-";
    this.ajaxService.ajaxPostMethod(url, date).subscribe(res=>{
  console.log(res)
 setTimeout(()=>{
this.sample()
 },20000)
    })
    }

  ngOnInit() {
    // this.sample();
    this.myPlatform = this.platform.platforms()[0];
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
    this.companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
    this.fabButton = true;
    this.getContact();
  }
   
 

}
