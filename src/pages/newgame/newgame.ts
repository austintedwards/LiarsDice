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
  constructor(public viewCtrl: ViewController, public gamedata: Gamedata) {
  }
  ionViewDidLoad(){
    this.gamedata.newPhrase()
    .then((data) => {
      console.log(data)
    this.phrase = data;
  });
}



}
