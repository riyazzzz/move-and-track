import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketServiceService } from "../../services/ticket-service.service";
import { serverUrl } from 'src/environments/environment';
import { CommonService } from '../../services/common.service';
import { AjaxService } from '../../services/ajax.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss'],
})
export class AddTicketComponent implements OnInit {
  newTicket: FormGroup;
  companyDetail: { branchID: string; companyID: string; userId: string; };
  email: any;
  mobile: any;
  constructor(
    private modelController:ModalController,
    private formBuilder:FormBuilder,
    private TicketService: TicketServiceService,
    private ajaxService:AjaxService,
    private commonService: CommonService,

  ) { }
  getBack(){
    this.modelController.dismiss();
  }
  addTickect(){
      this.modelController.dismiss();
  }
  createTicket(){
    this.newTicket = this.formBuilder.group({
        subject:['', Validators.required ],
        description: ['', Validators.required ],
      
    });
}
createTickets(){
 var id=localStorage.getItem('requesterId');
     if(id !=null && id !=undefined){
  var contactObj = {"description":this.newTicket.value.description,"subject":this.newTicket.value.subject,"requester_id":JSON.parse(id),"priority":1,"status":2,"source":3};
  const url = serverUrl.ticketUrl + "/api/v2/tickets";
  this.TicketService.ticketPost(url,contactObj)
    .subscribe(res => {
     if(res['subject'] == this.newTicket.value.subject){
      this.commonService.presentToast("Ticket created successfully")
      this.modelController.dismiss();
  }
      console.log(res);
    })
}else{
      this.getProfile();
      // this.createContact();
     }
  
}
getProfile(){
 const data = 
   {
"userName":this.companyDetail.userId,
"companyId":this.companyDetail.companyID

 }
  const url = serverUrl.web + '/user/getUserDetails';
  this.ajaxService.ajaxPostMethod(url,data).subscribe(res =>{
    console.log(res);   
    if(res.email != '' || res.contact != '' || res != undefined ){
      if(res.fax !="" || res.fax){
        this.email=res.fax;
        this.mobile=res.contactNo;
        this.createContact();
      }else{
        this.commonService.presentToast("Please update the email id and phone number in your profile")
      }
    
    }else{
      this.commonService.presentToast("Please update the email id and phone number in your profile")
    }
    
 })
 }
createContact(){

  var contactObj = { "name": this.companyDetail.companyID, "email":this.email,"mobile":this.mobile};
  
  if(contactObj.email == null){
this.commonService.presentToast("Email id not available please add email in your profile");
  } else if(contactObj.mobile == null){
    this.commonService.presentToast("Mobile id not available please add email in your profile");
  }else{
    const url = serverUrl.ticketUrl + "/api/v2/contacts";
    this.TicketService.ticketPost(url,contactObj)
      .subscribe(res => {
        console.log(res);
        localStorage.setItem('requesterId', JSON.stringify(res.id));
        this.createTickets();
      })
  }

}
  ngOnInit() {
    this.companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
  //  this.createContact();
    
    this.createTicket();
   
    // if(id.length > 1){
    //   this.createTickets(id);
    // }
  }
}
