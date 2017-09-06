import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanBarcodePage } from './scan-barcode';

@NgModule({
  declarations: [
    ScanBarcodePage,
  ],
  imports: [
    IonicPageModule.forChild(ScanBarcodePage),
  ],
})
export class ScanBarcodePageModule {}
