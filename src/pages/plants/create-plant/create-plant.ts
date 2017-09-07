import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";

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
})
export class CreatePlantPage {

  public date: string = new Date().toISOString();
  plantOrigin: string;

  public event = {
    month: this.date,
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

  constructor(public navCtrl: NavController, public toast: ToastController, public navParams: NavParams, private camera: Camera) {
  }

  currentImage: any = 'assets/images/new-image.png';

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  async takePhoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      try {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        if (base64Image != null) {
          this.currentImage = base64Image;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePlantPage');
  }

}
