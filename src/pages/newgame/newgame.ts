import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ViewController} from 'ionic-angular';
import { Gamedata } from '../../providers/gamedata';

@Component({
  selector: 'new-game-page',
  templateUrl: 'newgame.html'
})

export class NewGamePage {
  phrase: any;
  player:any;

  constructor(public viewCtrl: ViewController, public gamedata: Gamedata) {
  }

  ionViewDidLoad(){
    this.gamedata.newPhrase()
    .then((data) => {
    this.phrase = data;
  });
}

startGame(): void {
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
