import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import * as io from 'socket.io-client';

/*
  Generated class for the YouDone page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-you-done',
  templateUrl: 'you-done.html'
})
export class YouDonePage {
  socket:any;

  constructor(public appCtrl: App,
    public navCtrl: NavController,
    public navParams: NavParams){
      this.socket = io('http://localhost:5000');
      this.socket.on('main menu',()=>{
        console.log("main menu")
        this.backToStart()
        })
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YouDonePage');
  }
  backToStart(){
    this.appCtrl.getRootNav().popToRoot()
  }

}
