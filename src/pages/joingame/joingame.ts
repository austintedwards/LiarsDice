import { Component } from '@angular/core';
import {App, ViewController, AlertController} from 'ionic-angular';
import { Gamedata } from '../../providers/gamedata';
import { GamePlayPage } from '../gameplay/gameplay';

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

  player:any;
  phrase:any;
  play:any;
  constructor(
    public viewCtrl: ViewController,
    public gamedata: Gamedata,
    public appCtrl: App,
    public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoingamePage');

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

      this.gamedata.getPhrase(this.phrase)
        .then((data) => {
          this.play = data;
        });

        console.log("this",this)
        console.log("this.play", this.play)

    if (this.player && this.phrase){
      this.viewCtrl.dismiss(game);
      this.appCtrl.getRootNav().push(GamePlayPage);
      }else if (this.player){
        alert2.present();
      }else if (this.phrase){
        alert3.present();
      }else{
        alert1.present();
      }

    }
    close(): void {
      this.viewCtrl.dismiss();
    }




}
