import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassAdditionalComponent } from './classdetails/class-additional/class-additional.component';
import { SharedModModule } from '../shared-mod/shared-mod.module';
import { StudentAddtionalComponent } from './student/student-addtional/student-addtional.component';
import { StudentClassAdditionalComponent } from './student/student-class-additional/student-class-additional.component';
import { ParentAdditionalComponent } from './parent/parent-additional/parent-additional.component';
import { TagAdditionalComponent } from './tag/tag-additional/tag-additional.component';
import { GateAdditionalComponent } from './gate/gate-additional/gate-additional.component';
import { HttpClientModule } from '@angular/common/http';
import { EnableAdditionalComponent } from './enable/enable-additional/enable-additional.component';
import { RouteAddtionalComponent } from './route/route-addtional/route-addtional.component';
import { BusStopComponent } from './route/bus-stop/bus-stop.component';
import { BroadcastAdditionalComponent } from './broad/broadcast-additional/broadcast-additional.component';
import { RouteCommonComponent } from './route/route-common/route-common.component';
import { RouteFormComponent } from './route/route-form/route-form.component';
import {AddStudentComponent} from './student/add-student/add-student.component'
import {AddRouteComponent} from './student/add-route/add-route.component'
import { AddAlertsComponent } from './student/add-alerts/add-alerts.component'
import { LatlongComponent } from './latlong/latlong.component';
@NgModule({
  declarations: [
    ClassAdditionalComponent,
    StudentAddtionalComponent,
    AddRouteComponent,
    StudentClassAdditionalComponent,
    ParentAdditionalComponent,
    TagAdditionalComponent,
    GateAdditionalComponent,
    EnableAdditionalComponent,
    RouteAddtionalComponent,
    BusStopComponent,
    AddStudentComponent,
    AddAlertsComponent,
    BroadcastAdditionalComponent,
    RouteCommonComponent,
    RouteFormComponent,
    LatlongComponent
],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    SharedModModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents:[
    ClassAdditionalComponent,
    StudentAddtionalComponent,
    StudentClassAdditionalComponent,
    ParentAdditionalComponent,
    TagAdditionalComponent,
    GateAdditionalComponent,
    AddRouteComponent,
    AddAlertsComponent,
    EnableAdditionalComponent,
    RouteAddtionalComponent,
    AddStudentComponent,
    BusStopComponent,
    BroadcastAdditionalComponent,
    RouteCommonComponent,
    RouteFormComponent,
    LatlongComponent
  ],
  exports:[
    ClassAdditionalComponent,
    StudentAddtionalComponent,
    StudentClassAdditionalComponent,
    ParentAdditionalComponent,
    TagAdditionalComponent,
    AddStudentComponent,
    AddRouteComponent,
    AddAlertsComponent,
    GateAdditionalComponent,
    RouteAddtionalComponent,
    BusStopComponent,
    BroadcastAdditionalComponent,
    RouteCommonComponent,
    RouteFormComponent,
    LatlongComponent
  ],
})

export class SktComponentsModule { }