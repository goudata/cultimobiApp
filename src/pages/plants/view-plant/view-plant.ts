import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Plant } from '../../../models/plant';
import { storage } from 'firebase';
import { GenerateUUID } from '../../../utilities/generate-uuid';

/**
 * Generated class for the ViewPlantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-plant',
  templateUrl: 'view-plant.html',
  providers: [GenerateUUID]
})
export class ViewPlantPage {

  plant = {} as Plant;
  currentImage: any;
  key: any;
  gardens = [];

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
    private camera: Camera,
    private uuid: GenerateUUID
  ) {


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

    const detail = this.navParams.get('info')
    this.key = detail.$key;
    this.plant = this.navParams.get('info');
    this.currentImage = this.plant.imageURL;
  }

  takePhoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      if (base64Image != null) {
        this.currentImage = base64Image;

        let USER = this.afAuth.auth.currentUser;

        const pictures = storage().ref(`users/${USER.uid}/plants/${this.uuid.generateUUID()}`);
        pictures.putString(base64Image, 'data_url').then(imagedata => {
          this.plant.imageURL = imagedata.downloadURL;
        });

      } else {
        this.currentImage = 'assets/images/new-image.png';
        this.plant.imageURL = this.currentImage;
      }

    })
  }

  updatePlant() {

    this.afAuth.authState.take(1).subscribe(auth => {
      this.plant.updatedBy = auth.uid;
      this.plant.updatedDate = Date.now();

      this.afDatabase.object(`gardens/${this.plant.gardenId}/products/${this.plant.plantId}`).set(this.plant)
        .then(() => this.navCtrl.pop())
    })
  }

  deletePlant() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`plants/${this.key}`).remove()
        .then(() => this.navCtrl.pop())
    })
  }
}
