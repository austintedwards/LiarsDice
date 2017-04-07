import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { Gamedata } from '../../providers/gamedata';
import { GamePlayPage } from '../gameplay/gameplay';
import * as io from 'socket.io-client';

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
  player:any;
  socket:any;
  phrase: any;
  totalDice:any;
  groupSize: any;
  playersRolled:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public gamedata:Gamedata,
    public appCtrl: App
    ) {
      this.socket = io('http://localhost:5001');
  

    }

  ionViewDidLoad() {
    this.game = this.navParams.data.game
    this.player = this.navParams.data.player
    this.groupSize= this.navParams.data.groupNum
    this.playersRolled = 0
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
    .then((data)=>{
      this.game=data
      this.phrase = playerRoll.phrase
      this.appCtrl.getRootNav().push(GamePlayPage,{game:this.game, player:this.player, dice:dice, phrase:this.phrase});
      this.socket.emit('dice roll', { page: this.phrase, totalDice: this.game.totalDice});
    })


  }


}
