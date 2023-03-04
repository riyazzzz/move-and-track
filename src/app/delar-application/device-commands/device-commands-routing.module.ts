import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceCommandsPage } from './device-commands.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceCommandsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceCommandsPageRoutingModule {}
