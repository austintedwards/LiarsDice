import { Component } from '@angular/core';
import {App, ViewController, AlertController} from 'ionic-angular';
import { Gamedata } from '../../providers/gamedata';

@Component({
  selector: 'new-game-page',
  templateUrl: 'newgame.html'
})

export class NewGamePage {
  phrase: any;
  player:any;

  constructor(
    public viewCtrl: ViewController,
    public gamedata: Gamedata,
    public appCtrl: App,
    public alertCtrl: AlertController) {}

  ionViewDidLoad(){
    this.gamedata.newPhrase()
    .then((data) => {
    this.phrase = data;
    console.log(this.phrase)
  });
}

startGame(): void {
    let game = {
      phrase: this.phrase,
      player: this.player,
    };

    let alert = this.alertCtrl.create({
      subTitle: 'Please Input Player Name',
      buttons: ['OK']
    });
    let phraseAlert = this.alertCtrl.create({
      subTitle: 'Wait for passphrase',
      buttons: ['OK']
    });

    if (this.player&&this.phrase){
    this.viewCtrl.dismiss(game);
  }else if(!this.phrase){
    phraseAlert.present();
  }else{
      alert.present();
    }
  }
close(): void {
    this.viewCtrl.dismiss();
  }




}
