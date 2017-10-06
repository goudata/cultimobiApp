import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurePlantPage } from './cure-plant';

@NgModule({
  declarations: [
    CurePlantPage,
  ],
  imports: [
    IonicPageModule.forChild(CurePlantPage),
  ],
})
export class CurePlantPageModule {}
