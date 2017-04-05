import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Gameplay page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gameplay',
  templateUrl: 'gameplay.html'
})
export class GamePlayPage {
  game:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

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
    console.log(dice)
    console.log(this)
  }

}
