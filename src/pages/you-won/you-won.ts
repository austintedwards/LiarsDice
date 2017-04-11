import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import * as io from 'socket.io-client';

/*
  Generated class for the YouWon page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-you-won',
  templateUrl: 'you-won.html'
})
export class YouWonPage {
  socket:any;
  phrase:any;

  constructor(public appCtrl: App,
     public navCtrl: NavController,
      public navParams: NavParams) {
        this.socket = io('http://localhost:5000');
      }

  ionViewDidLoad() {
    this.phrase = this.navParams.data.phrase
    console.log('ionViewDidLoad YouWonPage');
  }

  backToStart(){
    this.appCtrl.getRootNav().popToRoot()
    this.socket.emit('main menu', {page:this.phrase});

  }

}
