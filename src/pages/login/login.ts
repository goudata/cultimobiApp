import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from "../../models/user";
import { RegisterPage } from "../register/register";
import { AngularFireAuth } from "angularfire2/auth";
import { HomePage } from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  user = {} as User;
  constructor(private afAuth: AngularFireAuth, public toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.email);
      if(result){
        this.navCtrl.setRoot(HomePage);
      }
      console.log(result);
    } catch (error) {
      this.toast.create({
        message: error,
        duration: 3000,
        position: 'center'
      })
    }
  }

  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }


}
