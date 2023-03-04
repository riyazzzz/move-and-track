import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, Platform } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { AjaxService } from '../../services/ajax.service';
import { serverUrl } from '../../../environments/environment';
import { WebAppInterface } from 'src/app/interfaces/AndroidNative';

declare var Android: WebAppInterface;

@Component({
  selector: 'app-action-mode',
  templateUrl: './action-mode.page.html',
  styleUrls: ['./action-mode.page.scss'],
})



export class ActionModePage implements OnInit {
  @Input() mode: string;
  @Input() vin: string;
  immobilizeStatus: boolean;
  watchStatus: boolean;
  immobResponse;
  pass: string = "";
  data: any;
  plateNo : any ;
  constructor(private modalController: ModalController,
    private alertController: AlertController,
    private commonService: CommonService,
    public ajaxService: AjaxService, 
    public platform:Platform
    ) { }
    
    toggleWatchmode(event) {
      let statusBitWatchmode: number = 0;
      if (event.currentTarget.checked == true) {
        statusBitWatchmode = 1;
        this.watchStatus = true;
      } else {
        this.watchStatus = false;
      }
      let url: string = serverUrl.web + "/device/updatewatchmode?vin="+this.data.vin+"&value="+ statusBitWatchmode.toString();
      let body = {
        "vin": this.data.vin,
        "value": statusBitWatchmode.toString()
      };
      this.commonService.presentLoader();
      this.ajaxService.ajaxPostMethodWithoutData(url)
      .subscribe(res => {
        console.log(res);
        if (res.length > 1) {
          this.commonService.dismissLoader();
          statusBitWatchmode = 0;
          if (this.watchStatus == true) {
            statusBitWatchmode = 1;
          }
          this.data["watchmode"] = statusBitWatchmode;
          localStorage.setItem("selectedVin", JSON.stringify(this.data));
        } else {
          this.watchStatus = !this.watchStatus;
          this.commonService.dismissLoader();
          this.commonService.presentToast('Invalid credential');
        }
      });
    }
    
    async presentAlertPrompt() {
      const alert = await this.alertController.create({
        header: 'Enter Password!',
        inputs: [
          {
            name: 'Password',
            type: 'password',
            placeholder: 'Password'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.immobilizeStatus = !this.immobilizeStatus;
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              if (data.Password === localStorage.password) {
                this.pass = data.Password;
                this.conformPass();
              }
              else {
                this.immobilizeStatus = !this.immobilizeStatus;
                this.commonService.presentToast('Invalid password');
              }
              console.log('Confirm Ok');
            }
          }
        ]
      });
      await alert.present();
    }
    conformPass() {
      let returnValue: string;
      if (this.immobilizeStatus == true) {
        returnValue = "immobilizeOn";
      } else {
        returnValue = "immobilizeOff";
      }
      const data = JSON.parse(localStorage.getItem('commandsData'));
      let command: any = this.commonService.commandsBasedOnModel(this.data.model, returnValue);
      // let command: any;
      // const data = JSON.parse(JSON.parse(localStorage.getItem('commandsData')));
      // for (let i = 0; i < data.length; i++) {
      //   if (data[i].hasOwnProperty(this.data.model)) {
      //     command = data[i][this.data.model][returnValue];
      //   }
      // }
      if (command != undefined) {
        const body = {
          "imeiNo": this.data.imeiNo,
          "manufacturer": this.data.make,
          "model": this.data.model,
          "command": command,
          "pass": this.pass
        }
        let url: string = serverUrl.Admin + "/api/device/command";

        this.commonService.presentLoader();
        this.ajaxService.ajaxPostWithString(url, body)
        .subscribe(resdata => {
          clearTimeout(this.immobResponse);
          console.log('----------Recieved Command From Device ==>' + resdata + '<==----------');
          if(this.data.model == "TK003"){
            statusBitImmobilize = 0;
            if (this.immobilizeStatus == true) {
              statusBitImmobilize = 1;
            }
            this.data["lockstatus"] = statusBitImmobilize;
            localStorage.setItem("selectedVin", JSON.stringify(this.data));
            let tempDashboardData = localStorage.dashboardData;
            this.commonService.presentToast("Status of immobilize changed")
          }else{
          var statusBitImmobilize;
          const immobilizeSuccess = this.commonService.commandsBasedOnModel(this.data.model, 'immobilizeSuccess');
          if (resdata === undefined || resdata === 'null' || resdata === null || resdata === '' || resdata === 'noresponse') {
            this.commonService.presentAlert('Error', 'Empty response from device. Please try after sometime');
            this.immobilizeStatus = !this.immobilizeStatus;
          } else {
            let checkData = '';
            for (let i = 0; i < immobilizeSuccess.length; i++) {
              checkData = resdata.toString().indexOf(immobilizeSuccess[i]);
              if ((checkData.toString()) !== '-1') {
                break;
              }
            }
            if ((checkData.toString()) === '-1') {
              this.commonService.presentAlert('Error', 'Invalid response. Please try after sometime.');
              this.immobilizeStatus = !this.immobilizeStatus;
            } else {
              statusBitImmobilize = 0;
              this.commonService.presentToast("Vehicle immobilize off")
              if (this.immobilizeStatus == true) {
                statusBitImmobilize = 1;
                this.commonService.presentToast("Vehicle immobilized sucessfully")
              }
              this.data["lockstatus"] = statusBitImmobilize;
              localStorage.setItem("selectedVin", JSON.stringify(this.data));
              let tempDashboardData = localStorage.dashboardData;
            }
          }
        }
          this.commonService.dismissLoader();
          this.getBack();
        });
        this.immobResponse = setTimeout(() => {
          this.commonService.dismissLoader();
          this.commonService.presentAlert('No Reply', 'Please try after sometime.');
          this.immobilizeStatus = !this.immobilizeStatus;
        }, 60000);
      } else {
        this.immobilizeStatus = !this.immobilizeStatus;
        this.commonService.presentAlert('Alert', this.data.model + " doesn't have immobilize option");
      }
    }
    getBack() {
      this.modalController.dismiss();
    }
    ngOnInit() {
      this.data = JSON.parse(localStorage.selectedVin);
     
      if (this.mode == "Immobilize") {
        if (this.data.lockstatus == 1) {
          this.immobilizeStatus = true;
        }
        else {
          this.immobilizeStatus = false;
        }
      } else {
        if (this.data.hasOwnProperty("watchmode") && this.data.watchmode == 1) {
          this.watchStatus = true;
        }
        else {
          this.watchStatus = false;
        }
      }
    }
    
  }
  