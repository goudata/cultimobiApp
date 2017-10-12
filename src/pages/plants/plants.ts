import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ViewPlantPage } from './view-plant/view-plant';
import { Plant } from '../../models/plant';
import { CutPlantPage } from './cut-plant/cut-plant';
import { HarvestPlantPage } from './harvest-plant/harvest-plant';
import { DryPlantPage } from './dry-plant/dry-plant';
import { CurePlantPage } from './cure-plant/cure-plant';

/**
 * Generated class for the PlantsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plants',
  templateUrl: 'plants.html',
})
export class PlantsPage {

  stageType = 'All';
  plants = [];
  plant = {} as Plant;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {

  }

  updatePlant(plant) {

    this.afAuth.authState.take(1).subscribe(auth => {
      plant.updatedBy = auth.uid;
      plant.updatedDate = Date.now();
      this.stages(this.stageType);
      plant.stage = this.stageType;
      
      this.afDatabase.object(`gardens/${plant.gardenId}/plants/${plant.plantId}`).set(plant)
        .then(() => this.getPlantsList())
    })
  }

  removePlant(plant) {
    
        this.afAuth.authState.take(1).subscribe(auth => {
          plant.updatedBy = auth.uid;
          plant.updatedDate = Date.now();
          plant.stage = 'Destroyed';
          
          this.afDatabase.object(`gardens/${plant.gardenId}/plants/${plant.plantId}`).set(plant)
            .then(() => this.getPlantsList())
        })
      }

  stages(stage: any){
    switch (this.stageType) {
      case "Cut":
        this.stageType = 'Clone';
        break;
      case "Clone":
      this.stageType = 'Vegetation';
        break;
      case "Vegetation":
      this.stageType = 'Flower';
        break;
      case "Flower":
      this.stageType = 'Harvest';
        break;
      case "Harvest":
      this.stageType = 'Dry';
        break;
      // case "Dry":
      // this.stageType = 'Cure';
      //   break;
      // case "Cure":
      // this.stageType = 'Developed';
      //   break;
      
      default:
      this.stageType = 'All';
    }
  }

  ionViewWillEnter() {
    this.getPlantsList();
  }

  getPlantsList() {
    this.plants = [];
    let USER = this.afAuth.auth.currentUser;

    this.afDatabase.list(`gardens`).forEach(data => {
      data.map(res => {
        const plantRef = this.afDatabase.database.ref(`gardens/${res.$key}`).child(`plants`);
        const membersRef = this.afDatabase.database.ref(`gardens/${res.$key}`).child(`members`);

        if (res.createdBy == USER.uid) {

          plantRef.on('child_added', snapshot => {
            this.updatePlantList(snapshot.val(), snapshot.key);
          })

        } else {

          membersRef.on('child_added', snapshot => {
            if (snapshot.val() == USER.uid) {
              plantRef.on('child_added', snapshot => {
                this.updatePlantList(snapshot.val(), snapshot.key);
              })
            }
          })
        }
      })
    })
  }

  updatePlantList(data, key) {
    data.plantId = key;
    if (this.stageType === data.stage) {
      switch (data.stage) {
        case "Cut":
          this.plants.push(data);
          break;
        case "Clone":
          this.plants.push(data);
          break;
        case "Vegetation":
          this.plants.push(data);
          break;
        case "Flower":
          this.plants.push(data);
          break;
        case "Harvest":
          this.plants.push(data);
          break;
        case "Dry":
          this.plants.push(data);
          break;
        case "Cure":
          this.plants.push(data);
          break;
        case "Developed":
          this.plants.push(data);
          break;
        case "Destroyed":
          this.plants.push(data);
          break;
        default:
          this.plants = [];
      }
    } else if (this.stageType === 'All') {
      this.plants.push(data);
    }

  }

  showPlantDetail(data: any) {
    this.navCtrl.push(ViewPlantPage, { info: data });
  }

  showPlantDetail_Cut(data: any) {
    this.navCtrl.push(CutPlantPage, { info: data });
  }

  showPlantDetail_Harvest(data: any) {
    this.navCtrl.push(HarvestPlantPage, { info: data });
  }

  showPlantDetail_Dry(data: any) {
    this.navCtrl.push(DryPlantPage, { info: data });
  }

  showPlantDetail_Cure(data: any) {
    this.navCtrl.push(CurePlantPage, { info: data });
  }

  developClone(data: any) {
    let confirm = this.alertCtrl.create({
      title: 'Cloning Stage',
      message: 'Do you agree to develop this plant from Clone to Vegetation?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.updatePlant(data);
          }
        }
      ]
    });
    confirm.present();
  }

  developVegetation(data: any) {
    let confirm = this.alertCtrl.create({
      title: 'Vegetation Stage',
      message: 'Do you agree to develop this plant from Vegetation to Flower?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.updatePlant(data);
          }
        }
      ]
    });
    confirm.present();
  }

  developFlower(data: any) {
    let confirm = this.alertCtrl.create({
      title: 'Flower Stage',
      message: 'Do you agree to develop this plant from Flower to Harvest?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.updatePlant(data);
          }
        }
      ]
    });
    confirm.present();
  }

  destroy(data: any) {
    let confirm = this.alertCtrl.create({
      title: 'Destroy Plant',
      message: 'Do you agree to destroy this plant?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.removePlant(data);
          }
        }
      ]
    });
    confirm.present();
  }

}
