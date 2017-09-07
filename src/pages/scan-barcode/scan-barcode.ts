import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the ScanBarcodePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-barcode',
  templateUrl: 'scan-barcode.html',
})
export class ScanBarcodePage {

  public barcode: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      this.barcode = barcodeData.text;
     }, (err) => {
         // An error occurred
     });
  }

}
