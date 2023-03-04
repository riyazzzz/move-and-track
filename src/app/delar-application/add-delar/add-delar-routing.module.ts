import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDelarPage } from './add-delar.page';

const routes: Routes = [
  {
    path: '',
    component: AddDelarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDelarPageRoutingModule {}
