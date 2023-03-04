import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import {
  AlertController,
  MenuController,
  ModalController,
  Platform,
} from "@ionic/angular";
import { AjaxService } from "../../services/ajax.service";
import { CommonService } from "../../services/common.service";
import {
  adminLocalStorage,
  app,
  serverUrl,
} from "src/environments/environment";
import { ForgotpassdealerComponent } from "../login/forgotpassdealer/forgotpassdealer.component";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  yudsegment: string;
  login: FormGroup;
  appName: string;
  logo = "assets/APM KT LOGO.png";
  loginCrd;
  myPlatform: string;
  eye_icon: string = "eye-off";
  password_type: string = "password";
  constructor(
    public router: Router,
    private platform: Platform,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private menuController: MenuController,
    private ajaxService: AjaxService,
    public modalController: ModalController,
    private commonService: CommonService
  ) {}

  changeModule(data) {
    if (data == "user") {
      this.router.navigateByUrl("tabs-login/members/login");
    } else {
      this.router.navigateByUrl("tabs-login/dealarlogin/login");
    }
  }

  ionViewWillEnter() {
    this.yudsegment = "sample1";
    localStorage.clear();
  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.logo = app.loginImgUrl;
    this.appName = app.appName;
    localStorage.clear();
    this.menuController.enable(false);
    this.login = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  async openFpassModal() {
    const modal = await this.modalController.create({
      component: ForgotpassdealerComponent,
      cssClass: "custome_fleet",
    });
    return await modal.present();
  }

  showHidePass = () => {
    this.password_type = this.password_type === "text" ? "password" : "text";
    this.eye_icon = this.eye_icon === "eye" ? "eye-off" : "eye";
  };
  async submitLogin() {
    this.commonService.presentLoader();

    this.loginCrd = {
      userId: this.login.value.userName,
      password: this.login.value.password,
      version: "v2",
    };
    // tslint:disable-next-line: max-line-length
    if (
      this.loginCrd.userId == null ||
      this.loginCrd.userId === "" ||
      (this.loginCrd.userId === undefined && this.loginCrd.password == null) ||
      this.loginCrd.password === undefined
    ) {
      // this.commonService.dismissLoader();
      this.commonService.presentToast("User id and password is empty");
    } else {
      const url = serverUrl.web + "/global/checkAuthenticateDealer";
      this.ajaxService.ajaxPostWithBody(url, this.loginCrd).subscribe((res) => {
        if (res !== undefined) {
          if (res.message == "Invalid User") {
            if (this.commonService.isLoading)
              this.commonService.dismissLoader();
            this.commonService.presentToast("Invalid User name and password");
          } else {
            console.log(res);
            this.commonService.updateLogo(res);
            // localStorage.setItem('dealerLoginData', JSON.stringify(res));
            adminLocalStorage.dealerLoginData = JSON.stringify(res);
            localStorage.setItem("companyId", res.companyId);
            localStorage.setItem("companySuffix", res.companySuffix);
            localStorage.setItem("corpId", res.companyId);
            localStorage.setItem("userName", res.userId);
            localStorage.setItem("userId", res.userId);
            localStorage.setItem("password", res.password);
            // localStorage.setItem('mainMenu', res.mainMenu);
            localStorage.setItem("mainMenu", res.mainmenu);
            localStorage.setItem("esimdashboardmenu", res.esimdashboardmenu);
            localStorage.setItem("esimremovemenu", res.esimremovemenu);
            // if(this.myPlatform == "desktop")
            // this.router.navigateByUrl('/dashboard');
            // else
            this.router.navigateByUrl("/tabs-login/new-dashboard");
            //this.authService.login();
          }
        } else if (res.message == "Invalid User") {
          if (this.commonService.isLoading) this.commonService.dismissLoader();
          this.commonService.presentToast("Invalid User name and password");
        } else if (res.error) {
          if (this.commonService.isLoading) this.commonService.dismissLoader();
          const error = res.error;
          if (error.text === "Invalid") {
            this.commonService.presentToast("Invalid User name and password");
          } else if (error.text === "Update") {
            this.commonService.presentToast("Get Lastest Application");
          } else if (error.text === "Error") {
            this.commonService.presentToast(
              "Something Wrong Please Contact Support Team"
            );
          } else {
            this.commonService.presentToast(
              "Please check your internet connection!"
            );
          }
        }
      });
    }
  }
}
