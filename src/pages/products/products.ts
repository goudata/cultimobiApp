import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  products: any = 
     [
      {
        plantId: 'PL0001',
        itemName: 'Monopoly',
        batchNo: 'BT00001',
        uom: 'Each',
        createdDate: '2017-01-01'
      },
      {
        plantId: 'PL0002',
        itemName: 'Monopoly',
        batchNo: 'BT00002',
        uom: 'Each',
        createdDate: '2017-01-01'
      }
    ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

}
