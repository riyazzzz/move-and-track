import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { OverlayEventDetail, TabButtonLayout } from '@ionic/core';
import { IonicModule } from '@ionic/angular';
import { VtsgridComponent } from '../gridview-tab/vtsgrid/vtsgrid.component';
import { GridviewTabPage } from './gridview-tab.page';
import { SearchPipe } from '../services/search.pipe';
import { FilterPipe } from '../services/filter.pipe';
import { ActionModePage } from './action-mode/action-mode.page';
import { AlertsModalPage } from './alerts-modal/alerts-modal.page';
import { ComponentsModule } from '../components/components.module';
import { GridFilterPage } from './grid-filter/grid-filter.page';

const alertsModalPage: Routes = [
  {
    path: '',
    component: AlertsModalPage
  }
];

const routes: Routes = [
  {
    path: '',
    component: GridviewTabPage
  }
];
const actionModePage: Routes = [
  {
    path: '',
    component: ActionModePage
  }
];
const gridFilterPage: Routes = [
  {
    path: '',
    component: GridFilterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    RouterModule.forChild(actionModePage),
    RouterModule.forChild(alertsModalPage),
    RouterModule.forChild(gridFilterPage),
    IonicSwipeAllModule,
    ComponentsModule
  ],
  declarations: [GridviewTabPage, VtsgridComponent, SearchPipe, FilterPipe, ActionModePage, AlertsModalPage, GridFilterPage]
})
export class GridviewTabPageModule implements OnInit {
  
  constructor(
    
    ) { }
    // async openModalAddAsset(type) {
    //   const modal = await this.modalController.create({
    //     component: liveTrack
    //   });
    //   modal.onDidDismiss().then((detail: OverlayEventDetail) => {
    //     //  this.getLiveVariableData();
    //   });
    
    //   return await modal.present();
    // }
    ngOnInit() {
      console.warn("Gridview tab on Init")
    }
    
  }
  export class ActionModePageModule { }
  export class AlertsModalPageModule { }