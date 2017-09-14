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
    this.products = [];
    let USER = this.afAuth.auth.currentUser;

    this.afDatabase.list(`gardens`).forEach(data => {
      data.map(res => {
        const productRef = this.afDatabase.database.ref(`gardens/${res.$key}`).child(`products`);
        const membersRef = this.afDatabase.database.ref(`gardens/${res.$key}`).child(`members`);

        if(res.createdBy == USER.uid){

          productRef.on('child_added', snapshot => {
            this.updateProduct(snapshot.val(), snapshot.key);
          })

        } else {

          membersRef.on('child_added', snapshot => {
            if(snapshot.val() == USER.uid){
              productRef.on('child_added', snapshot => {
                this.updateProduct(snapshot.val(), snapshot.key);
              })
            }
          })
        }
      })
    })
  }

  updateProduct(data, key){
    data.productId = key;
    this.products.push(data);
  }

  showDetail(data: any) {
    this.navCtrl.push(ViewProductPage, {info: data});
  }

  goToNewProduct() {
    this.navCtrl.push(CreateProductPage);
  }

}
