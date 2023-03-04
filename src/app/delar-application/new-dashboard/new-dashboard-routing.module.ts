import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewDashboardPage } from './new-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: NewDashboardPage
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewDashboardPageRoutingModule {}
