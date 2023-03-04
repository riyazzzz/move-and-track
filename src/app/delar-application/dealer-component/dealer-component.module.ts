import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { AssertListCardComponent } from './assert-list-card/assert-list-card.component'
const routes: Routes = [
  
];
@NgModule({
  declarations: [AssertListCardComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule.forChild(routes),
  ],
  entryComponents:[],
  exports:[AssertListCardComponent],
})

export class DealerComponentsModule { }
