
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, OnChanges, ViewChild } from '@angular/core';
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
import { ImageConversationComponent } from '../image-conversation/image-conversation.component';

declare var $: any;
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-conversation-tab',
  templateUrl: './conversation-tab.page.html',
  styleUrls: ['./conversation-tab.page.scss'],
})
export class ConversationTabPage implements OnInit {
  @Input() id;
  @Input() sub;

  @ViewChild('scroll', { static: true }) scroll;
  uploader: FileUploader = new FileUploader({});
  imageBlock;
  audioBlock;
  fileValue;
  image;
  countCoversation = 2;
  myPlatform;
  answer = '';
  replyObj;
  fabButton = false;
  responceData: number = 0;
  page;
  data = [];
  data1 = [];
  messages = false;
  customerId = false;
  sendbtn = false;
  imageUrl = "https://s3.ap-south-1.amazonaws.com/ind-cdn.freshdesk.com/data/helpdesk/attachments/production/81015216350/original/subscriptionPopup.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2WD6T3JNC%2F20201208%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20201208T062011Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=caef5c11f22b73dea80ee6c3e63609ceb7895ade02d62c988038a8499b8d228b"
  uploadFileToUrl: (file: any, uploadUrl: any) => void;
  file: any;
  url: any;
  count: number;
  title = 'micRecorder';
  record;
  recording = false;
  audioUrl;
  error;
  conversation: any;
  subNew: any;
  idNew: any;
  acknowledge: boolean = false;

  constructor(
    private filePath: FilePath,
    private router: Router,
    private toastController: ToastController,
    private TicketService: TicketServiceService,
    private commonService: CommonService,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private platform: Platform,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private domSanitizer: DomSanitizer,
    private location: Location,
  ) { }

  enableSendbtn(data) {
    if (data.target.value == '') {
      this.sendbtn = false;
    }
    else {
      this.sendbtn = true;
    }
  }
  delete(index) {
    this.uploader.queue.splice(index, 1);
  }

  async openModel() {
    const modal = await this.modalController.create({
      component: AddTicketComponent,
      cssClass: 'ticket-form'
    });
    modal.onDidDismiss().then(() => {
      this.getContact();
    })
    return await modal.present();
  }


  ticket = [];
  getBackcard() {
    this.modalController.dismiss();
  }
  getConversation(id, sub) {
    localStorage.setItem('coversationId', id);
    localStorage.setItem('subject', sub);
    if (this.id.length > 1) {
      this.getChats(this.id);
    }

    this.messages = true;
    this.customerId = true;
  }



  getContact() {
    const url = serverUrl.ticketUrl + "/api/v2/contacts";
    this.TicketService.ticketGet(url)
      .subscribe(res => {
        localStorage.setItem("ticketsContact", res);
        this.responceData = 0;
        for (let i = 0; i < res.length; i++) {
          if (res[i].name.toLowerCase() == localStorage.getItem("corpId").toLowerCase()) {
            this.responceData = res[i].id;
          }
        }

        if (this.responceData != 0) {
          localStorage.setItem('requesterId', JSON.stringify(this.responceData));

        } else {
          this.commonService.presentToast('No Tickets.....!');
          this.ticket = [
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
              "status": "--",
              "subject": "No Tickets Available",

              "id": '---',
              "type": null,
              "due_by": "2020-12-10T11:09:37Z",
              "fr_due_by": "2020-12-08T11:09:37Z",
              "is_escalated": true,
              "custom_fields": {},
              "created_at": "---",
              "updated_at": "---",

            }]

        }
      })
  }

  getTicketsList(id) {
    const url = serverUrl.ticketUrl + "/api/v2/tickets?requester_id=" + id;
    this.TicketService.ticketGet(url)
      .subscribe(res => {
        this.ticket = res;
        this.ticket.sort((a, b) => a.id - b.id)
        console.log(this.ticket)
      })
  }

  getChats(id) {
    const url = serverUrl.ticketUrl + "/api/v2/tickets/" + id + "/conversations";
    this.TicketService.ticketGet(url)
      .subscribe(res => {
        console.log(res);
        this.conversation = res;
        console.log(this.conversation[0]);
        if (this.conversation.length == 30) {

          this.countCoversation = 2;
          this.getMoreChats(id);
        }
       if(this.conversation.length == 1){
          this.acknowledge = true;
          this.getMoreChats(id);
        }
        else{
          this.acknowledge = false;
        }
      })

  }

  getMoreChats(id) {
    this.customerId = true;
    this.commonService.presentLoader();
    const url1 = serverUrl.ticketUrl + "/api/v2/tickets/" + id + "/conversations?page=" + this.countCoversation
    this.TicketService.ticketGet(url1).subscribe(res => {
      this.countCoversation++;
      this.conversation = this.conversation.concat(res);
      this.commonService.dismissLoader();
      if (res.length == 30) {
        this.getMoreChats(id);
      }
    })
  }
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
  processRecording(blob, fileName: '_audio') {
    console.log(new File([blob], fileName, { lastModified: new Date().getTime(), type: blob.type }));
    this.audioUrl = new File([blob], fileName, { lastModified: new Date().getTime(), type: blob.type })
    this.sendAudioMsg();
  }

  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
    this.commonService.presentToast("Audio can't play")
  }

  sendAudioMsg() {
    var imgData: FormData = new FormData();
    imgData.append("attachments[]", this.audioUrl);
    imgData.append("body", ".");
    console.log(imgData)
    this.uploader.queue.length = 0;
    const url = serverUrl.ticketUrl + "/api/v2/tickets/" + this.id + "/reply";
    this.TicketService.ticketPostImage(url, imgData)
      .subscribe(res => {
        console.log(res);
        if (res.ticket_id + '' == this.id) {
          this.commonService.presentToast('Sent successfully');
        } else {
          this.commonService.presentToast('Please try again');
        }
        this.getChats(this.id);
      })
  }

  sendReplyMsg() {
    this.sendbtn = false;
    if (this.uploader.queue.length == 0) {
      this.replyObj = { "body": this.image };
      if (this.image["body"] !== "") {
        const url = serverUrl.ticketUrl + "/api/v2/tickets/" + this.id + "/reply";
        this.TicketService.ticketPost(url, this.replyObj)
          .subscribe(res => {
            console.log(res);
            if (res.ticket_id + '' == this.id) {
              this.commonService.presentToast('Sent successfully');
            } else {
              this.commonService.presentToast('Please try again');
            }
            this.getChats(this.id);

          })
      }
    } else {

      this.sendbtn = false;
      if (this.uploader.queue.length == 0) {
        this.commonService.presentToast("please insert one document ");
      } else {
        const file = this.uploader;
        var imgData: FormData = new FormData();
        for (let i = 0; i < file.queue.length; i++) {
          imgData.append("attachments[]", file.queue[i]._file);
        }
        imgData.append("body", ".");
        console.log(imgData)
        this.uploader.queue.length = 0;
        const url = serverUrl.ticketUrl + "/api/v2/tickets/" + this.id + "/reply";
        this.TicketService.ticketPostImage(url, imgData)
          .subscribe(res => {
            console.log(res);
            if (res.ticket_id + '' == this.id) {
              this.commonService.presentToast('Sent successfully');
            } else {
              this.commonService.presentToast('Please try again');
            }
            this.getChats(this.id);
          })
      }
    }
    this.image = '';
  }

  item = [];
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    this.fabButton = true;
    //this.subNew = this.sub;
    //this.id = this.id;
    this.getChats(this.id);
    this.getContact();
    console.log(this.subNew, this.id);
  }
  ngOnChanges() {
    this.subNew = this.sub
    this.id = this.id
    this.getContact();
    this.getChats(this.id);
    console.log(this.subNew, this.id);
  }
  //upload
  getFile() {
    document.getElementById("upfile").click();
  }

  fileName;
  getBack() {
    this.location.back();
  }
  // async enlargeImage(image){
  //   console.log(image,'iam image');
  //   const modal = await this.modalController.create({
  //     component:ImageConversationComponent,
  //     componentProps: {
  //       value: image,
  //      }
  //   });
  //   return await modal.present(); 

  // }
  subject(obj) {
    this.file = obj.target.value;
    this.fileName = this.file.split("\\");
    document.getElementById("yourBtn").innerHTML = this.fileName[this.fileName.length - 1];
    console.log(this.file);
    console.log(this.uploader.queue[0].file.name)

  }


}
