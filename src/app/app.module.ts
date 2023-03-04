import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { TabsPageModule } from "./tabs/tabs.module";
import { TabsLoginPageModule } from "./tabs-login/tabs-login.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { IonicStorageModule } from "@ionic/storage";
import { Device } from "@ionic-native/device/ngx";
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { Network } from "@ionic-native/network/ngx";
import { UniqueDeviceID } from "@ionic-native/unique-device-id/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { Market } from "@ionic-native/market/ngx";
import { Clipboard } from "@ionic-native/clipboard/ngx";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { SMS } from "@ionic-native/sms/ngx";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";

import { SmsRetriever } from "@ionic-native/sms-retriever/ngx";
import { HttpClientModule } from "@angular/common/http";
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";
import * as Hammer from "hammerjs";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
// import { SearchDelarPipe } from './services/search-delar.pipe';
// import { Base64 } from '@ionic-native/base64/ngx';

export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: "pan-y",
    });

    return mc;
  }
}
@NgModule({
  declarations: [
    AppComponent,
    // SearchDelarPipe
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    TabsPageModule,
    TabsLoginPageModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AppVersion,
    StatusBar,
    SplashScreen,
    FileOpener,
    // Base64,
    Device,
    SmsRetriever,
    FirebaseX,
    Clipboard,
    AndroidPermissions,
    SMS,
    Network,
    FilePath,
    UniqueDeviceID,
    Market,
    Geolocation,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
