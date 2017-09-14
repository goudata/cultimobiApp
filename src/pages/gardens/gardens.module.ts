import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GardensPage } from './gardens';

@NgModule({
  declarations: [
    GardensPage,
  ],
  imports: [
    IonicPageModule.forChild(GardensPage),
  ],
})
export class GardensPageModule {}
