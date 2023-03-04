import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { IonicModule } from '@ionic/angular';
import { DealerIntroSlideComponent } from './dealer-intro-slide/dealer-intro-slide.component'
import { DashboardPage } from './dashboard.page';
const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCircleProgressModule.forRoot({
      // set defaults here
      titleFontWeight: "700",
      radius: 50,
      space: -6,
      outerStrokeWidth: 6,
      innerStrokeWidth: 6,
      outerStrokeColor: "#c1c1d2",
      innerStrokeColor: "#c3c3d4",
      animationDuration: 600,
      animation: true,
      showUnits: false,
      showSubtitle: false,
      showBackground: false,
    }),
  ],
  entryComponents: [
    DealerIntroSlideComponent
 ],
  declarations: [DashboardPage, DealerIntroSlideComponent]
})
export class DashboardPageModule { }
