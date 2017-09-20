import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the AddToGardenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-to-garden',
  templateUrl: 'add-to-garden.html',
})
export class AddToGardenPage {

  user = {} as User;
  currentImage: any;
  key: any;
  addedToGarden: boolean;
  searchQuery: string = '';

  gardens = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase
  ) {

    const detail = this.navParams.get('info')
    this.key = detail.$key;
    this.user = this.navParams.get('info');
    this.currentImage = this.user.avatar;

  }

  ionViewWillEnter() {
    this.gardens = [];
    let USER = this.afAuth.auth.currentUser;
    this.afDatabase.list(`gardens`).forEach(data => {
      data.map(res => {
        if (res.createdBy == USER.uid) {
          if (res.members) {
            if (res.members.userkey == this.navParams.get('info').$key) {
              res.checked = true;
              this.gardens.push(res)
            }
          } else {
            this.gardens.push(res)
          }
        }
        
      })
    })
  }

  checkedGarden(garden) {
    garden.checked = !garden.checked
  }

  addToGarden() {
    for (var i = 0; i < this.gardens.length; i++) {
      if (this.gardens[i].checked == true) {
        this.afDatabase.object(`gardens/${this.gardens[i].$key}/members`).set({ userkey: this.navParams.get('info').$key })
          .then() //() => this.navCtrl.pop()
      } else {
        this.afDatabase.object(`gardens/${this.gardens[i].$key}/members`).remove()
        .then()
      }
    }
    this.gardens = [];
    this.navCtrl.pop()
  }

  getItems(ev: any) {
    // Reset items back to all of the items

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.gardens = this.gardens.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
