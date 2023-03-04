import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionReportComponent } from './subscription-report/subscription-report.component';
import { SubscriptionPage } from './subscription.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionPage
  },
  {
    path: 'renewal',
    loadChildren: () => import('./renewal/renewal.module').then( m => m.RenewalPageModule)
  },{
    path: 'SusbscriptionReportComponent',component:SubscriptionReportComponent
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionPageRoutingModule {}
