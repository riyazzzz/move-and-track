import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
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
        path: 'gridview/:type',
        children: [
          {
            path: '',
            loadChildren: '../gridview-tab/gridview-tab.module#GridviewTabPageModule'
          }
        ]
      },
      {
        path: 'mapview/:type',
        children: [
          {
            path: '',
            loadChildren: '../mapview-tab/mapview-tab.module#MapviewTabPageModule'
          }
        ]
      },
      {
        path: 'alerts/:type',
        children: [
          {
            path: '',
            loadChildren: '../alerts-tab/alerts-tab.module#AlertsTabPageModule'
          }
        ]
      },
      {
        path: 'tabs',
        redirectTo: '/tabs/member/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'tabs',
    redirectTo: '/tabs/member/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
