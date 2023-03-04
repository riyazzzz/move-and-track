import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FileUploadModule } from 'ng2-file-upload';
import { ConversationTabPage } from './conversation-tab.page';
import { NodataImageComponent } from '../../components/nodata-image/nodata-image.component';
import { ImageConversationComponent } from '../image-conversation/image-conversation.component';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ConversationTabPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    FileUploadModule
  ],
  entryComponents:[ImageConversationComponent],
  declarations: [ConversationTabPage,NodataImageComponent,ImageConversationComponent]
})
export class ConversationTabPageModule {}
