import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import{CompanylistComponent} from './companylist/companylist.component';
import { IonicModule } from '@ionic/angular';

import { StocksPageRoutingModule } from './stocks-routing.module';
import { SearchDelarPipe } from '../../services/search-delar.pipe';
import { StocksPage } from './stocks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StocksPageRoutingModule
  ],
  declarations: [
    StocksPage,
    SearchDelarPipe,
    CompanylistComponent
  ],
  entryComponents:[CompanylistComponent]
})
export class StocksPageModule {}
