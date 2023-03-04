import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebAppInterface } from 'src/app/interfaces/AndroidNative';
declare var Android : WebAppInterface;

@Component({
  selector: 'app-add-camera',
  templateUrl: './add-camera.page.html',
  styleUrls: ['./add-camera.page.scss'],
  
})
export class AddCameraPage implements OnInit {
  addDevice;
  constructor(
    private formBuilder: FormBuilder,
    public router: Router
  ) { }

  addNewDevice(){
  Android.addDeviceInAdmin(this.addDevice.value.deviceId,"admin","inside123");
  setTimeout(()=>{
    this.router.navigateByUrl('camera-list');
  },2000)
 
  }

  ngOnInit() {
    this.addDevice = this.formBuilder.group({
      deviceId: ['vvhg', Validators.required]
    });
  }

}
