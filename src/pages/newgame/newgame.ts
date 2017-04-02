import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ViewController} from 'ionic-angular';

@Component({
  selector: 'new-game-page',
  templateUrl: 'newgame.html'
})

export class NewGamePage {
  constructor(public viewCtrl: ViewController) {
  }


}
