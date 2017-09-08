import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Product } from "../../../models/product";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { ProductsPage } from "../products";
import { CameraOptions, Camera } from "@ionic-native/camera";
import { storage } from "firebase";

/**
 * Generated class for the CreateProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html',
})
export class CreateProductPage {


  constructor(public camera: Camera, public toast: ToastController, public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
  }


  public date: string = new Date().toISOString();

  public event = {
    month: this.date
  }

  product = {} as Product;

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

  currentImage: any = 'assets/images/new-image.png';
  image: any;
  
    options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

  getCategory(category: any) {
    return this.types[category];
  }

  getGroup(group: any) {
    return this.categories[group];
  }

  async takePhoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      try {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        if (base64Image != null) {
          this.currentImage = base64Image;
          this.image = imageData;

          const pictures = storage().ref('pictures');
          pictures.putString(base64Image, 'data_url');

        } else {
          this.currentImage = 'assets/images/new-image.png';
        }
      } catch (error) {

      }

    }, (err) => {
      this.toast.create({
        message: err,
        duration: 3000
      })
    });
  }

  createProduct() {
    // const pictures = storage().ref('pictures');
    // pictures.putString(this.currentImage, 'data_url');
    // this.product.imageURL = pictures.getDownloadURL().then(function(url){
    //    return url; 
    // });

    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.list(`products`).push(this.product)
        .then(() => this.navCtrl.push(ProductsPage))
    })
  }
}
