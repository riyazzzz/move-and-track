import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  {
    path: 'dashboard', 
    loadChildren: () =>
      import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'login', 
    loadChildren: () =>
      import('../login/login.module').then(m => m.LoginPageModule)
  }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }