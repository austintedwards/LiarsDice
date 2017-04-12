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
  dicecheck: any;
  playerNum:any;
  players:any;
  youUp:any;
  youRolled:any;
  testArr=[];
  workWithThis=[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public gamedata:Gamedata,
    public appCtrl: App
    ) {
      this.socket = io('http://localhost:5000');
    }

  ionViewDidLoad() {
    this.youRolled = true;
    this.game = this.navParams.data.game
    this.players = this.game.players
    this.playerNum = this.navParams.data.playernum
    if(this.navParams.data.youUp){
      this.youUp =this.navParams.data.youUp
    }
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
    this.appCtrl.getRootNav().push(GamePlayPage,{playerRoll:playerRoll, playernum:this.playerNum});
  }
}
