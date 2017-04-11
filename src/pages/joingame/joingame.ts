import { Component } from '@angular/core';
import {App, ViewController, AlertController} from 'ionic-angular';
import { Gamedata } from '../../providers/gamedata';

/*
  Generated class for the Joingame page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-joingame',
  templateUrl: 'joingame.html'
})
export class JoinGamePage {

  player: any;
  phrase: any;
  game: any;
  play:any;
  players:any;

  constructor(
    public viewCtrl: ViewController,
    public gamedata: Gamedata,
    public appCtrl: App,
    public alertCtrl: AlertController) { }

  ionViewDidLoad() {

  }

  joinStartGame(): void {
    let game = {
      phrase: this.phrase,
      player: this.player,
    };

    let alert1 = this.alertCtrl.create({
      subTitle: 'Please Input Player Name & Passphrase',
      buttons: ['OK']
    });
    let alert2 = this.alertCtrl.create({
      subTitle: 'Please Input Passphrase',
      buttons: ['OK']
    });
    let alert3 = this.alertCtrl.create({
      subTitle: 'Please Input Player Name',
      buttons: ['OK']
    });
    let alert4 = this.alertCtrl.create({
      subTitle: 'Passphrase does not exist',
      buttons: ['OK']
    });
    let alert5 = this.alertCtrl.create({
      subTitle: 'Game is full',
      buttons: ['OK']
    });
    if (this.phrase) {
      this.gamedata.getGame(this.phrase)
        .then((data) => {
          this.game = data;
          this.play=this.game.passphrase
          if (this.play !=="not working"){
            this.players = this.game.players.length
          }
          if (this.player && this.phrase && this.play !== "not working" && this.players<4) {
            this.viewCtrl.dismiss(game);
          } else if (this.player && this.phrase && this.play === "not working") {
            alert4.present();
          } else if (this.players>=4){
            alert5.present();
          } else if (this.phrase) {
            alert3.present();
          } else {
            alert1.present();
          }
        });
    } else if (this.player) {
      alert2.present();
    }else {
      alert1.present();
    }
  }
  close(): void {
    this.viewCtrl.dismiss();
  }




}
