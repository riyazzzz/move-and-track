import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCompanyPage } from './add-company.page';

const routes: Routes = [
  {
    path: '',
    component: AddCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCompanyPageRoutingModule {}
