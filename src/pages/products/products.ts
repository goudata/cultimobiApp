import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateProductPage } from "./create-product/create-product";
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
  }

  ionViewWillEnter() {
    let USER = this.afAuth.auth.currentUser;
    this.afDatabase.list(`products`).forEach(data=> {
      data.map(res => {
        if(res.createdBy == USER.uid){
          this.products.push(res);
        } else {
          if(res.members && res.members.userkey == USER.uid){
            this.products.push(res);
          }
        }
      });
    });
  }

  showDetail(data: any) {
    this.navCtrl.push(ViewProductPage, {info: data});
  }

  goToNewProduct() {
    this.navCtrl.push(CreateProductPage);
  }

}
