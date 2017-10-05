import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { Plant } from '../../../models/plant';
import { storage } from 'firebase';
import { ViewPlantPage } from '../view-plant/view-plant';
import { GenerateUUID } from '../../../utilities/generate-uuid';

/**
 * Generated class for the CreatePlantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-plant',
  templateUrl: 'create-plant.html',
  providers: [GenerateUUID]
})
export class CreatePlantPage {

  public date: string = new Date().toISOString();
  plantOrigin: string;
  stageType = 'add';
  currentImage: any = 'assets/images/new-image.png';
  imageUpload = false;

  public event = {
    month: this.date
  }

  gardens = [];

  plant = {} as Plant;
  plants = [];

  constructor(public navCtrl: NavController,
    public toast: ToastController,
    public navParams: NavParams,
    private camera: Camera,
    private uuid: GenerateUUID,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {

    this.plant.orderDate = this.event.month;

    let USER = this.afAuth.auth.currentUser;
    this.afDatabase.list(`gardens`).forEach(data => {
      data.map(res => {
        if (res.createdBy == USER.uid) {
          this.gardens.push(res);
        } else {
          if (res.members && res.members.userkey == USER.uid) {
            this.gardens.push(res);
          }
        }
      });
    });
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  takePhoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      if (base64Image != null) {
        this.currentImage = base64Image;

        let USER = this.afAuth.auth.currentUser;

        const pictures = storage().ref(`plants/${USER.uid}/${this.uuid.generateUUID()}`);
        pictures.putString(base64Image, 'data_url').then(imagedata => {
          this.plant.imageURL = imagedata.downloadURL;
          this.imageUpload = true;
        });

      } else {
        this.currentImage = 'assets/images/new-image.png';
        this.plant.imageURL = this.currentImage;
      }

    })
  }

  getPlantsList() {
    this.plants = [];
    let USER = this.afAuth.auth.currentUser;

    this.afDatabase.list(`gardens`).forEach(data => {
      data.map(res => {
        const productRef = this.afDatabase.database.ref(`gardens/${res.$key}`).child(`plants`);
        const membersRef = this.afDatabase.database.ref(`gardens/${res.$key}`).child(`members`);

        if (res.createdBy == USER.uid) {

          productRef.on('child_added', snapshot => {
            this.updatePlant(snapshot.val(), snapshot.key);
          })

        } else {

          membersRef.on('child_added', snapshot => {
            if (snapshot.val() == USER.uid) {
              productRef.on('child_added', snapshot => {
                this.updatePlant(snapshot.val(), snapshot.key);
              })
            }
          })
        }
      })
    })
  }

  updatePlant(data, key) {
    data.plantId = key;
    this.plants.push(data);
  }

  createPlant() {
    this.plants.push(this.plant)
    if (!this.imageUpload) {
      this.plant.imageURL = this.currentImage;
    }

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
    this.navCtrl.push(ViewPlantPage, { info: data });
  }

}
