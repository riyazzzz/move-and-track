import { Component, OnInit } from '@angular/core';
import {  ModalController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { serverUrl } from 'src/environments/environment';
import { CommonService } from '../../services/common.service';
import { AjaxService } from '../../services/ajax.service';
import { TicketServiceService } from "../../services/ticket-service.service";
import { ToastController } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { Router } from "@angular/router";
//New***
declare var $: any;
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageConversationComponent } from '../image-conversation/image-conversation.component';
@Component({
  selector: 'app-ticket-conversation',
  templateUrl: './ticket-conversation.page.html',
  styleUrls: ['./ticket-conversation.page.scss'],
})
export class TicketConversationPage implements OnInit {
  uploader: FileUploader = new FileUploader({});
id: string;
answer:any;
data=[];
data1=[];
fileValue;
image = "";
countCoversation=2;
myPlatform;  
sub: string;
replyObj;
fabButton = false;
responceData: number = 0;
page;
conversation;
messages= false;  
customerId= false;
sendbtn= false;
//New****
title = 'micRecorder';
record;
recording = false;
audioUrl;
error;
  domSanitizer: any;
  fileName: any;
  file: any;
  constructor(
    private platform: Platform,
    private location: Location,
    private TicketService: TicketServiceService,
    private ajaxService:AjaxService,
    private commonService:CommonService,
    private router:Router,
    private modalController:ModalController,

  ) { }

  ticket;
  mine;
 
 

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
    }
    
    initiateRecording() {
    this.recording = true;
    let mediaConstraints = {
    
    audio: true
    };
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
    }
    
    successCallback(stream) {
    var options = {
    mimeType: "audio/wav",
    };
    
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
    }
    
    stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
    }
    /**
    * processRecording Do what ever you want with blob
    * @param  {any} blob Blog
    */
    processRecording(blob, fileName:'_audio'){
      console.log(new File([blob] , fileName, { lastModified: new Date().getTime(), type: blob.type }));
      this.audioUrl = new File([blob] , fileName, { lastModified: new Date().getTime(), type: blob.type })
      this.sendAudioMsg();
    }
    
    errorCallback(error) {
    this.error = 'Can not play audio in your browser';
    this.commonService.presentToast("Audio device not supported");
    }

    sendAudioMsg(){
      var imgData: FormData = new FormData();
      imgData.append("attachments[]", this.audioUrl);
      
      imgData.append("body", "." );
      console.log(imgData)
      this.uploader.queue.length = 0;
      const url = serverUrl.ticketUrl + "/api/v2/tickets/" + this.id + "/reply";
      this.TicketService.ticketPostImage(url, imgData)
        .subscribe(res => {
          console.log(res);
          if(res.ticket_id+'' == this.id){
            this.commonService.presentToast('Sent successfully');
            this.image='';
          }else{
            this.commonService.presentToast('Please try again');
          }
          this.getChats(this.id);
          this.answer = '';
        })
    }
  getBack(){
      this.location.back();
  }
  sendReplyMsg() {
    this.sendbtn=false;
    if(this.uploader.queue.length == 0){
      this.replyObj = { "body": this.image};
      if(this.image["body"] !== ""){
     const url = serverUrl.ticketUrl +"/api/v2/tickets/" + this.id + "/reply";
      this.TicketService.ticketPost(url,this.replyObj)
        .subscribe(res => {
          console.log(res);
          if(res.ticket_id+'' == this.id){
            this.commonService.presentToast('Sent successfully');
          }else{
            this.commonService.presentToast('Please try again');
          }
          this.getChats(this.id);
          this.image='';
        })
      }
    }else{
      var currentdate = new Date();
      var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + "  "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
      this.sendbtn = false;
      if (this.uploader.queue.length == 0) {
        this.commonService.presentToast("please insert one document ");
      } else {
        const file = this.uploader;
  
        var imgData: FormData = new FormData();
        // this.replyObj = { "attachments[]": imgData};
        for (let i = 0; i < file.queue.length; i++) {
          imgData.append("attachments[]", file.queue[i]._file);
  
        }
        imgData.append("body", "." );
        //imgData.append('data',JSON.stringify(this.image));
        //const data=JSON.stringify(imgData)
        console.log(imgData)
  
        // this.replyObj = { "attachments[]": imgData};
        //if(this.answer["body"] !== ""){
          this.uploader.queue.length =0;
        const url = serverUrl.ticketUrl + "/api/v2/tickets/" + this.id + "/reply";
        this.TicketService.ticketPostImage(url, imgData)
          .subscribe(res => {
            console.log(res);
            if(res.ticket_id+'' == this.id){
              this.commonService.presentToast('Sent successfully');
              this.image='';
            }else{
              this.commonService.presentToast('Please try again');
            }
            this.getChats(this.id);
            this.answer = '';
          })
        //}
      }
    }
  

  }
  getFile() {
    document.getElementById("upfile").click();
  }
  enableSendbtn(data){
    if(data.target.value == ''){
     this.sendbtn=false;
   }
   else{
     this.sendbtn=true;
   }
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
  async enlargeImage(image){
    const modal = await this.modalController.create({
      component:ImageConversationComponent,
      componentProps: {
        value: image,
       }
    });
    return await modal.present(); 
     
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
  subject(obj) {
    this.file = obj.target.value;
    this.fileName = this.file.split("\\");
    document.getElementById("yourBtn").innerHTML = this.fileName[this.fileName.length - 1];
    console.log(this.file);
    //document.myForm.submit();
    //event.preventDefault();
    
    console.log(this.uploader.queue[0].file.name)
  
  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
    //this.messages = true;
    this.sub =localStorage.getItem('subject');
    this.id=localStorage.getItem('coversationId');
    if(this.id.length >= 1){
      this.getChats(this.id);
    }

 }




 
}
