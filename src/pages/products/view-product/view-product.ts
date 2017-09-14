import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from "../../../models/product";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { ProductsPage } from "../products";
import { CameraOptions, Camera } from "@ionic-native/camera";
import { storage } from "firebase";

/**
 * Generated class for the ViewProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-product',
  templateUrl: 'view-product.html',
})
export class ViewProductPage {

  product = {} as Product;
  currentImage: any;
  key: any;

  options: CameraOptions = {
    quality: 75,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private afDatabase: AngularFireDatabase,
              private camera: Camera
            ) {

    const detail = this.navParams.get('info')
    this.key = detail.$key;
    this.product = this.navParams.get('info');
    this.currentImage = this.product.imageURL;
  }

  types: any = {
    'Cannabis': [
      {
        Category: 'Flower'
      },
      {
        Category: 'Trim'
      },
    ]
  }

  categories: any = {
    'Flower': [
      {
        Group: 'Indica',
      },
      {
        Group: 'Sativa',
      },
      {
        Group: 'Hyberd',
      }

    ]
  }

  getCategory(category: any) {
    return this.types[category];
  }

  getGroup(group: any) {
    return this.categories[group];
  }

  takePhoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      if (base64Image != null) {
        this.currentImage = base64Image;

        let USER = this.afAuth.auth.currentUser;

        const pictures = storage().ref(`users/${USER.uid}/products/${this.generateUUID()}`);
        pictures.putString(base64Image, 'data_url').then(imagedata => {
          this.product.imageURL = imagedata.downloadURL;
        });

      } else {
        this.currentImage = 'assets/images/new-image.png';
        this.product.imageURL = this.currentImage;
      }

    })
  }

  generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  };

  updateProduct() {

    this.afAuth.authState.take(1).subscribe(auth => {
      this.product.updatedBy = auth.uid;
      this.product.updatedDate = Date.now();

      this.afDatabase.object(`gardens/${this.product.gardenId}/products/${this.product.productId}`).set(this.product)
        .then(() => this.navCtrl.pop())
    })
  }

  deleteProduct() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`products/${this.key}`).remove()
        .then(() => this.navCtrl.pop())
    })
  }

}
