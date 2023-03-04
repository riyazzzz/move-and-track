import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriptionPageRoutingModule } from './subscription-routing.module';
import { SubscriptionReportComponent } from './subscription-report/subscription-report.component';
import { SubscriptionPage } from './subscription.page';
import { RenewalPage } from '../subscription/renewal/renewal.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SubscriptionPageRoutingModule
  ],
  declarations: [SubscriptionPage,SubscriptionReportComponent,RenewalPage],
  entryComponents: [RenewalPage],
  exports:[RenewalPage],
})
export class SubscriptionPageModule {}
