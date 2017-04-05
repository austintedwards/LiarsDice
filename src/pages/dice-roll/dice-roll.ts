import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Gamedata } from '../../providers/gamedata';

/*
  Generated class for the Gameplay page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dice-roll',
  templateUrl: 'dice-roll.html'
})
export class DiceRollPage {
  game:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public gamedata:Gamedata,
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameplayPage');
    this.game = this.navParams.data.game
    console.log(this.game)
  }

  rollDice(){
    let dice = []
    for (var i =0; i<5; i++){
      dice.push(Math.floor(Math.random()*6)+1)
    }
    let playerRoll = {
      phrase: this.game.passphrase,
      roll: dice
    };
    this.gamedata.addRoll(playerRoll)
    console.log(playerRoll)
  }


}
