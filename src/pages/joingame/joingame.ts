import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ViewController} from 'ionic-angular';

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

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoingamePage');
  }

  joinStartGame(): void {
      let game = {
        phrase: this.phrase,
        player: this.player,
      };
      console.log(game)
      this.viewCtrl.dismiss(game);
    }
    close(): void {
      this.viewCtrl.dismiss();
    }

}
