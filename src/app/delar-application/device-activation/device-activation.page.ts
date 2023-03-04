import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
//import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { FileUploader, FileLikeObject } from "ng2-file-upload";
import { AlertController } from "@ionic/angular";
import { AjaxService } from "../../services/ajax.service";
import { CommonService } from "../../services/common.service";
import { serverUrl } from "src/environments/environment";
import { Router } from "@angular/router";
import { FilePath } from "@ionic-native/file-path/ngx";
// import { Plugins, CameraResultType, Capacitor, FilesystemDirectory,
//   CameraPhoto, CameraSource } from '@capacitor/core';
@Component({
  selector: "app-device-activation",
  templateUrl: "./device-activation.page.html",
  styleUrls: ["./device-activation.page.scss"],
})
export class DeviceActivationPage implements OnInit {
  device: FormGroup;
  data = ["AADHAAR NO", "DRIVINGLICENCE NO", "VOTERID NO", "PASSPORT NO"];
  mob = "^((\\+91-?)|0)?[0-9]{10}$";
  e_Mail = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  deviceActivation: any;
  proof = "";
  selectedFile: File = null;
  // prof:any;
  myPic: any;
  photos: any;
  show = true;
  document = false;
  assest = false;
  showFiles = false;
  image1;
  imageData;
  public uploader: FileUploader = new FileUploader({});
  count = 0;
  uploadFileToUrl: (file: any, uploadUrl: any) => void;
  file: any;
  url: any;
  constructor(
    private filePath: FilePath,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) {}
  // hiding data and progress bar
  personDetails() {
    this.show = !this.show;
  }
  documents() {
    this.document = !this.document;
  }
  assestDetails() {
    this.assest = !this.assest;
  }
  showFile() {
    this.showFiles = !this.showFiles;
  }
  progressbar() {
    this.count = 0;
    if (
      this.device.value.ChassisNo != null &&
      this.device.value.ChassisNo.length >= 5
    ) {
      this.count = this.count + 0.1;
    }
    if (
      this.device.value.customerName != null &&
      this.device.value.customerName.length >= 3
    ) {
      this.count = this.count + 0.1;
    }
    if (
      this.device.value.address != null &&
      this.device.value.address.length >= 5
    ) {
      this.count = this.count + 0.1;
    }
    if (
      this.device.value.imeiNO != null &&
      this.device.value.imeiNO.length === 15
    ) {
      this.count = this.count + 0.1;
    }
    if (
      this.device.value.EngineNo != null &&
      this.device.value.EngineNo.length >= 4
    ) {
      this.count = this.count + 0.1;
    }
    if (
      this.device.value.vehNo != null &&
      this.device.value.vehNo.length >= 4
    ) {
      this.count = this.count + 0.1;
    }
    if (
      this.device.value.proof != null &&
      this.device.value.proof.length >= 4
    ) {
      this.count = this.count + 0.1;
    }
    if (this.device.controls.mail.status === "VALID") {
      this.count = this.count + 0.1;
    }
    if (
      this.device.value.mobile != null &&
      this.device.value.mobile.length === 10
    ) {
      this.count = this.count + 0.1;
    }
    if (
      (this.uploader.queue.length != null && this.uploader.queue.length >= 0) ||
      this.photos.length >= 0
    ) {
      this.count = this.count + 0.04;
    }
  }
  //getting document file
  onFileChange(ev) {
    this.show = false;
    this.file = ev.srcElement.files[0];
  }
  submit() {
    this.commonService.presentToast(
      "please wait until the process is finished"
    );

    this.proof = this.device.value.proof;
    this.deviceActivation = {
      imeiNO: this.device.value.imeiNO,
      customerName: this.device.value.customerName,
      address: this.device.value.address,
      mobile: this.device.value.mobile,
      EngineNo: this.device.value.EngineNo,
      ChassisNo: this.device.value.ChassisNo,
      vehicleNo: this.device.value.vehNo,
      // cameraPictures:this.photos,
      // file:this.uploader
      //         file=addfile
      // data="{'companyid':'jana','address':'chennai'}"
    };
    this.deviceActivation[this.proof] = this.device.value.proofNumber;
    // this.commonService.presentToast("Device Activated");
    // starting ngselcet
    if (this.uploader.queue.length == 0 && this.photos.length == 0) {
      this.commonService.presentToast("please insert one document ");
    } else {
      const url = serverUrl.web + "/site/insert/s3";
      const file = this.uploader;
      // this.uploadFileToUrl = function(file, url){

      const testData: FormData = new FormData();

      for (var i = 0; i < file.queue.length; i++) {
        testData.append("file", file.queue[i]._file);
      }

      // if(this.photos > 0){
      // testData.append('file', );
      // for(var i=0;i<this.photos.length;i++){
      // testData.append('file', this.photos[i]);
      //   }
      //  }
      testData.append("data", JSON.stringify(this.deviceActivation));

      // testData.append('data',JSON.stringify(this.deviceActivation));
      this.ajaxService.ajaxPutMethod(url, testData).subscribe((res) => {
        console.log(res);
        res = JSON.parse(res);
        if (res.message == "Success") {
          this.commonService.presentToast("device activated");
          this.router.navigateByUrl("/dashboard");
        } else {
          this.commonService.presentToast(
            "please give an valid details to activate"
          );
        }
        // this.commonService.presentToast("please insert one document ");
      });
      // }
      //   console.log(this.deviceActivation);
      //
      // this.ajaxService.ajaxPutMethod(url,this.deviceActivation)
      // .subscribe(res=>{
      //   console.log(res);
      //   // this.commonService.presentToast("please insert one document ");
      //   })
    }
    // const data= new FormData();
    // data.append('image',this.selectedFile)
    //  this.datas.push(data);
    // this.http.post('',this.deviceActivation)
    // .subscribe(res=>{
    //   console.log(res);
    // });
  }
  deletes() {
    this.progressbar();
    if (this.uploader.queue.length >= 0 || this.photos.length >= 0) {
      this.count = this.count - 0.1;
    }
  }
  // getting camera file

  //  image(){
  //  const options: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.NATIVE_URI,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE ,
  // }
  // const capturedPhoto =  CameraOptions.getPhoto({
  //   resultType: CameraResultType.Uri, // file-based data; provides best performance
  //   source: CameraSource.Camera, // automatically take a new photo with the camera
  //   quality: 100 // highest quality (0 to 100)
  // });
  // this.camera.getPicture(options).then((imageData) => {
  //  // imageData is either a base64 encoded string or a file URI
  //  // If it's base64 (DATA_URL):
  //  this.imageData = imageData;
  //     this.image1=(<any>window).Ionic.WebView.convertFileSrc(imageData);
  //  this.myPic = 'data:image/jpeg;base64,' + imageData;
  //  this.photos.push(this.image1);
  //  this.photos.reverse();
  //  this.filePath.resolveNativePath( this.imageData)
  //  .then(filePath =>
  // this.url=filePath)
  //  .catch(err => console.log(err));
  //  const tempImage =  this.url;
  //  const tempFilename = tempImage.substr(tempImage.lastIndexOf('/') + 1);
  //  const tempBaseFilesystemPath = tempImage.substr(0, tempImage.lastIndexOf('/') + 1);

  //  const newBaseFilesystemPath = this.file.dataDirectory;

  //   this.file.copyFile(tempBaseFilesystemPath, tempFilename,
  //                           newBaseFilesystemPath, tempFilename);

  //  const storedPhoto = newBaseFilesystemPath + tempFilename;
  // //  const displayImage = window.Ionic.WebView.convertFileSrc(storedPhoto);
  // }, (err) => {
  //  // Handle error
  // this.commonService.presentToast("camera not available");
  // });
  // }
  deletePhoto(index) {
    this.photos.splice(index, 1);
  }
  delete(index) {
    this.uploader.queue.splice(index, 1);
  }
  ionViewWillEnter() {
    this.device.reset();
  }
  ngOnInit() {
    this.device = this.formBuilder.group({
      imeiNO: [
        "",
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(15),
        ],
      ],
      customerName: ["", Validators.required],
      address: ["", Validators.required],
      mobile: [""],
      mail: [""],
      proof: ["", Validators.required],
      proofNumber: ["", [Validators.required, Validators.minLength(8)]],
      vehNo: ["", [Validators.required, Validators.minLength(4)]],
      ChassisNo: ["", Validators.required],
      EngineNo: ["", Validators.required],
    });
    this.photos = [];
  }
}
