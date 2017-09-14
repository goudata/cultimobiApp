import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garden} from "../../models/garden";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {ViewGardenPage} from "./view-garden/view-garden";

/**
 * Generated class for the GardensPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gardens',
  templateUrl: 'gardens.html',
})
export class GardensPage {

  gardens = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
  }

  ionViewWillEnter() {
    this.gardens = [];
    let USER = this.afAuth.auth.currentUser;
    this.afDatabase.list(`gardens`).forEach(data => {
      data.map(res => {
        if(res.createdBy == USER.uid){

          this.gardens.push(res)

        }
      })
    })
  }

  showDetail(data: any){
    this.navCtrl.push(ViewGardenPage, {info: data});
  }




}
