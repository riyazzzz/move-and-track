import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NewDashboardPage } from './new-dashboard.page';
// import { AssertStatusListPage } from './assert-status-list/assert-status-list.page'
import { DealerComponentsModule } from '../dealer-component/dealer-component.module';
// const assertModal: Routes = [
//   {
//     path: '',
//     component:  AssertStatusListPage
//   },
// ];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DealerComponentsModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      "radius": 60,
      "space": -10,
      "outerStrokeGradient": true,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "outerStrokeGradientStopColor": "#53a9ff",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "animateTitle": false,
      "animationDuration": 1000,
      "showInnerStroke" : true,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false
    }),
    RouterModule.forChild([
      {
        path: '',
        component: NewDashboardPage
      }
    ]),
    // RouterModule.forChild(assertModal),
  ],
  declarations: [NewDashboardPage]
})
export class NewDashboardPageModule {}





















// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { IonicModule } from '@ionic/angular';

// import { NewDashboardPageRoutingModule } from './new-dashboard-routing.module';

// import { NewDashboardPage } from './new-dashboard.page';

// @NgModule({
//   imports: [
//     CommonModule,
//     FormsModule,
//     IonicModule,
//     NewDashboardPageRoutingModule
//   ],
//   declarations: [NewDashboardPage]
// })
// export class NewDashboardPageModule {}