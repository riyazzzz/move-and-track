import { Component, OnInit } from '@angular/core';
import {AjaxService} from '../../services/ajax.service';
import {serverUrl} from '../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  data={
    schoolName:"",
    mailId:"",
    contactNo:"",
    address:"",
    describe:""

}

  constructor(
private ajaxservice:AjaxService,
private location: Location,

  ) { }


getAboutDatas(){
const url = serverUrl.web+'/parentapp/about?companyId='+ localStorage.getItem('corpId');
this.ajaxservice.ajaxGetObject(url).subscribe(res=>{
this.data=JSON.parse(res)
})
}

locationBack() {
  this.location.back()
} 

  ngOnInit() {
    this.getAboutDatas();
  }

}
