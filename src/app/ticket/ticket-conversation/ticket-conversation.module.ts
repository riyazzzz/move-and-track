import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TicketConversationPage } from './ticket-conversation.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FileUploadModule } from 'ng2-file-upload';
const routes: Routes = [
  {
    path: '',
    component: TicketConversationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FileUploadModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TicketConversationPage]
})
export class TicketConversationPageModule {}
