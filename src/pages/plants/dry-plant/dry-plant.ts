import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Plant } from '../../../models/plant';

/**
 * Generated class for the DryPlantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dry-plant',
  templateUrl: 'dry-plant.html',
})
export class DryPlantPage {

  plant = {} as Plant;
  key: any;
  gardens = [];
  products = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {

    let USER = this.afAuth.auth.currentUser;
    this.afDatabase.list(`gardens`).forEach(data => {
      data.map(res => {
        const productRef = this.afDatabase.database.ref(`gardens/${res.$key}`).child(`products`);
        const membersRef = this.afDatabase.database.ref(`gardens/${res.$key}`).child(`members`);
        this.gardens.push(res);
        if (res.createdBy == USER.uid) {

          productRef.on('child_added', snapshot => {
            this.products.push(snapshot.val());
          })

        } else {

          membersRef.on('child_added', snapshot => {
            if (snapshot.val() == USER.uid) {
              productRef.on('child_added', snapshot => {
                this.products.push(snapshot.val());
              })
            }
          })
        }
      })
    })

    const detail = this.navParams.get('info')
    this.key = detail.$key;
    this.plant = this.navParams.get('info');
  }

  updatePlantDry() {

    this.afAuth.authState.take(1).subscribe(auth => {
      this.plant.updatedBy = auth.uid;
      this.plant.updatedDate = Date.now();
      this.plant.stage = 'Cure';

      this.afDatabase.object(`gardens/${this.plant.gardenId}/plants/${this.plant.plantId}`).set(this.plant)
        .then(() => {
          let USER = this.afAuth.auth.currentUser;
          this.afDatabase.list(`gardens`).forEach(data => {
            data.map(res => {
              const productRef = this.afDatabase.database.ref(`gardens/${res.$key}`).child(`products`);
              const membersRef = this.afDatabase.database.ref(`gardens/${res.$key}`).child(`members`);
              this.gardens.push(res);
              if (res.createdBy == USER.uid) {
      
                productRef.on('child_added', snapshot => {
                  this.updateProductStock(snapshot.val(), snapshot.key, res.$key);
                })
      
              } else {
      
                membersRef.on('child_added', snapshot => {
                  if (snapshot.val() == USER.uid) {
                    productRef.on('child_added', snapshot => {
                      this.updateProductStock(snapshot.val(), snapshot.key, res.$key);
                    })
                  }
                })
              }
            })
          })

          this.navCtrl.pop();
        })
    })
  }

  updateProductStock(data, key, gardenid) {
      if (data.productId === this.plant.productId) {
        data.stock = parseFloat(data.stock) + parseFloat(this.plant.dryWeight);
        this.afDatabase.object(`gardens/${gardenid}/products/${data.productId}`).set(data)
          
      } else if (data.productId === this.plant.productTrimId) {
        data.stock = parseFloat(data.stock) + parseFloat(this.plant.trimWeight);
        this.afDatabase.object(`gardens/${gardenid}/products/${data.productId}`).set(data)

      } else if (data.productId === this.plant.productWasteId) {
        data.stock = parseFloat(data.stock) + parseFloat(this.plant.wasteWeight);
        this.afDatabase.object(`gardens/${gardenid}/products/${data.productId}`).set(data)

      }
    }
}
