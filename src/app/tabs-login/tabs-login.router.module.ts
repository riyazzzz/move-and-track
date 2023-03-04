import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsLoginPage } from './tabs-login.page';

const routes: Routes = [
  {
    path: 'tabs-login',
    component: TabsLoginPage,
    children: [
      {
        path: 'members',
        children: [
          {
            path: '',
            loadChildren: '../members/member-routing.module#MemberRoutingModule'
          }
        ]
      },
      {
        path: 'dealarlogin',
        children: [
          {
            path: '',
            loadChildren: '../delar-application/delar-application-routing.module#DelarApplicationRoutingModule'
          }
        ]
      },
      {
        path: 'tabs-login',
        redirectTo: '/tabs-login/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'tabs-login',
    redirectTo: '/tabs-login/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsLoginPageRoutingModule {}
