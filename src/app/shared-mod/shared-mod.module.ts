import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
// import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { jqxTreeGridComponent } from 'jqwidgets-ng/jqxtreegrid';


@NgModule({
  declarations: [jqxGridComponent,jqxTreeGridComponent],
  imports: [
    CommonModule
  ],
  exports: [
    jqxTreeGridComponent,
    jqxGridComponent,
    jqxButtonModule,
    TreeViewModule
  ]
})
export class SharedModModule { }
