import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Product } from "../../../models/product";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { ProductsPage } from "../products";
import { CameraOptions, Camera } from "@ionic-native/camera";
import { storage } from "firebase";
import {Garden} from "../../../models/garden";
import { GenerateUUID } from '../../../utilities/generate-uuid';

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
  providers: [GenerateUUID]
})
export class CreateProductPage {

  gardens = [];

  constructor(public camera: Camera,
              public toast: ToastController, 
              public navCtrl: NavController, 
              public navParams: NavParams, 
              private afAuth: AngularFireAuth, 
              private afDatabase: AngularFireDatabase,
              private uuid: GenerateUUID
            ) {
              
    let USER = this.afAuth.auth.currentUser;
    this.afDatabase.list(`gardens`).forEach(data=> {
      data.map(res => {
        if(res.createdBy == USER.uid){
          this.gardens.push(res);
        } else {
          if(res.members && res.members.userkey == USER.uid){
            this.gardens.push(res);
          }
        }
      });
    });
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
  imageUpload = false;

  options: CameraOptions = {
    quality: 75,
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

  takePhoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      if (base64Image != null) {
        this.currentImage = base64Image;

        let USER = this.afAuth.auth.currentUser;

        const pictures = storage().ref(`products/${USER.uid}/${this.uuid.generateUUID()}`);
        pictures.putString(base64Image, 'data_url').then(imagedata => {
          this.product.imageURL = imagedata.downloadURL;
          this.imageUpload = true;
        });

      } else {
        this.currentImage = 'assets/images/new-image.png';
        this.product.imageURL = this.currentImage;
      }

    })
  }

  createProduct() {

    if(!this.imageUpload){
      this.product.imageURL = this.currentImage;
    }

    this.afAuth.authState.take(1).subscribe(auth => {
      this.product.createdBy = auth.uid;
      this.product.createdDate = Date.now();
      this.product.isActive = true;

      this.afDatabase.list(`gardens/${this.product.gardenId}/products`).push(this.product)
        .then(() => this.navCtrl.pop())
    })
  }
}
