import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { Plant } from '../../../models/plant';
import { storage } from 'firebase';
import { ViewPlantPage } from '../view-plant/view-plant';

/**
 * Generated class for the CreatePlantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-plant',
  templateUrl: 'create-plant.html'
})
export class CreatePlantPage {

  public date: string = new Date().toUTCString();
  plantOrigin: string;

  currentImage: any = 'assets/images/new-image.png';
  imageUpload = false;

  public event = {
    month: this.date
  }

  gardens = [];
  products = [];

  plant = {} as Plant;
  plants = [];

  constructor(public navCtrl: NavController,
    public toast: ToastController,
    public navParams: NavParams,
    private camera: Camera,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {

    this.plant.orderDate = this.event.month;

    let USER = this.afAuth.auth.currentUser;
    this.afDatabase.list(`gardens`).forEach(data => {
      data.map(res => {
        const productRef = this.afDatabase.database.ref(`gardens/${res.$key}`).child(`products`);
        const membersRef = this.afDatabase.database.ref(`gardens/${res.$key}`).child(`members`);
        this.gardens.push(res);
        if(res.createdBy == USER.uid){

          productRef.on('child_added', snapshot => {
            this.products.push(snapshot.val());
          })

        } else {

          membersRef.on('child_added', snapshot => {
            if(snapshot.val() == USER.uid){
              productRef.on('child_added', snapshot => {
                this.products.push(snapshot.val());
              })
            }
          })
        }
      })
    });
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  updatePlant(data, key) {
    data.plantId = key;
    this.plants.push(data);
  }

  createPlant() {
    if (!this.imageUpload) {
      this.plant.imageURL = this.currentImage;
    }

    this.plant.stage = 'Cut';

    this.afAuth.authState.take(1).subscribe(auth => {
      this.plant.createdBy = auth.uid;
      this.plant.createdDate = Date.now();
      this.plant.isActive = true;

      this.afDatabase.list(`gardens/${this.plant.gardenId}/plants`).push(this.plant)
        .then(() => this.navCtrl.pop())
    })
  }

  showDetail(data: any) {
    // console.log(data)
    this.plants = [];
    this.navCtrl.push(ViewPlantPage, { info: data });
  }

}
