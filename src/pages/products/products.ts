import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateProductPage } from "./create-product/create-product";
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { Product } from "../../models/product";
import { ViewProductPage } from "../products/view-product/view-product";

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

  // products: FirebaseObjectObservable<Product>;

  products = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase) {
  }

  ionViewWillEnter() {
    this.afDatabase.list('product').forEach(data=> { 
      this.products = data;
    }); 
  }

  showDetail(data: any) {
    this.navCtrl.push(ViewProductPage, {info: data});
  }
 
  goToNewProduct() {
    this.navCtrl.push(CreateProductPage);
  }

}
