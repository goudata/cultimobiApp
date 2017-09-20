import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddToGardenPage } from './add-to-garden';

@NgModule({
  declarations: [
    AddToGardenPage,
  ],
  imports: [
    IonicPageModule.forChild(AddToGardenPage),
  ],
})
export class AddToGardenPageModule {}
