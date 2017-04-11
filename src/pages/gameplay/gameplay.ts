import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import * as io from 'socket.io-client';
import { Gamedata } from '../../providers/gamedata';
// import { DiceRollPage } from '../dice-roll/dice-roll';
import { YouDonePage } from '../you-done/you-done';
import { YouWonPage } from '../you-won/you-won';

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
  game: any;
  player: any;
  dice: any;
  bid: any;
  socket: any;
  phrase: any;
  totalDice: any;
  players: any;
  playernum: any;
  playerBid: any;
  groupSize: any;
  playersRolled: any;
  playerUp: any;
  playerName: any;
  playerNameUp: any;
  bidResult: any;
  markYou: any;
  playerMarks: any;
  play: any;
  dicecheck: any;
  data: any;
  youOut: any;
  rollButton:any;
  youUp:any;
  markedPlayer:any;
  array =[]
  youWon:any;
  bullButton:any;
  dontHit:any;
  dontMark:any;
  dontWin: any;
  dontLose:any;
  outHit:any;
  youRolled:any;
  numTest = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public alertCtrl: AlertController,
    public gamedata: Gamedata) {
    this.socket = io('https://diceliar.herokuapp.com');
    this.socket.on('send bid', (bid, playerBid) => {
      this.bid = bid
      this.playerBid = playerBid
      this.checkBid(bid, playerBid)
    })
    this.socket.on('you marked', (playerNum) => {
      if (this.playernum === playerNum &&!this.dontMark) {
        this.dontMark =true;
        this.gamedata.giveMark(this.game, this.phrase, playerNum)
          .then((data) => {
            console.log("gaveMark")
            this.game = data
            this.playerMarks = this.game.players[playerNum - 1].marks
            if (this.playerMarks < 5) {
              this.markYou = true;
              this.rollButton = true;
            } else {
              this.youOut = true;
              console.log("fix this")
              this.socket.emit('out of game', {page: this.phrase, player: this.playernum });
            }
          })
      }
    })
    this.socket.on('new roll', (playerNum, youUp) => {
      this.play = "play"
      this.youUp = youUp
      console.log(playerNum)
      // this.appCtrl.getRootNav().push(DiceRollPage,{ game: this.game, player: this.player, groupNum: this.players.length, youUp:this.youUp });
      if(!this.dontHit){
        this.dontHit=true;
        this.appCtrl.getRootNav().pop()
      }
    })
    this.socket.on('player rolled', (data, game) => {
      this.array.push(data)
      this.game = game
      this.dicecheck = this.game.totalDice

    })

    this.socket.on('out of game', (playerNum) => {
      if(!this.outHit){
        this.outHit=true;
      if (this.playernum === playerNum) {
      this.gamedata.deletePlayer(this.phrase, playerNum)
      .then(()=>{
      this.socket.emit('game update', { page: this.phrase});
      })
    }else{
      this.rollButton = true;
    }
    }
    })
    this.socket.on('game update', (once) => {
      this.gamedata.getGame(this.phrase)
      .then((data)=>{
        this.game = data
        this.players = this.game.players
        this.numTest.push(1)
        if(this.numTest.length>1){
        if (this.players.length ===1){
          if(this.playernum===this.players[0].playerNum &&!this.dontWin){
            console.log("bye")
            this.dontWin = true;
            this.dontLose=true;
            return this.appCtrl.getRootNav().push(YouWonPage, {phrase:this.phrase});
          }else if(!this.dontLose){
            this.dontLose=true;
            console.log("hello")
            return this.appCtrl.getRootNav().push(YouDonePage);
          }
        }
      }
      })
    })
    this.socket.on('main menu',()=>{
      console.log("main menu")
      this.backToStart()
      })
  }

  ionViewDidLoad() {
    this.bullButton = true;
    this.outHit = false;
    console.log(this.navCtrl)
    this.markYou = false;
    this.rollButton = false;
    this.phrase = this.navParams.data.phrase
    if (this.playerMarks<5 ||!this.playerMarks){
    this.gamedata.getGame(this.phrase)
      .then((data) => {
        this.data = data
        if (this.playernum === 1) {
          if (this.data.totalDice.length > 0) {
            this.dicecheck = this.data.totalDice
          }
        }
      })
    }
    //may need to change this!
    this.game = this.navParams.data.game
    this.players = this.game.players
    this.player = this.navParams.data.player
    this.dice = this.navParams.data.dice
    this.groupSize = this.players.length
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].name === this.player) {
        this.playernum = this.players[i].playerNum
      }
    }
    this.socket.emit('player rolled', { page: this.phrase, playerNum: this.playernum, game:this.game});
    this.youUp =this.navParams.data.youUp
    console.log("players",this.players)
    console.log(this.youUp)
    if (!this.youUp){
        this.playerUp = this.players[0].playerNum
    }else{
      this.playerUp = this.youUp
    }
    this.playerShow(this.playerUp)
  }

  playerShow(playerUp) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.playerUp === this.players[i].playerNum) {
        this.playerNameUp = this.players[i].name
      }
    }

  }

  makeBid(num) {
    let alert = this.alertCtrl.create();
    let noBid = this.alertCtrl.create({
      subTitle: 'Wait for All Players to Roll Dice.',
      buttons: ['OK']
    });
    if (this.dicecheck.length>0) {
      alert.setTitle("Quanity of " + num);
      for (var i = 1; i < 21; i++) {
        var j = i.toString()
        alert.addInput({
          type: 'radio',
          label: j,
          value: j
        });
      }

      alert.addButton('Cancel');
      alert.addButton({
        text: 'Ok',
        handler: data => {
          var currentBid = { di: num, quanity: data }
          if (!this.bid) {
            this.bid = currentBid
            this.socket.emit('send bid', { bid: this.bid, page: this.phrase, player: this.playernum });
          } else if (currentBid.quanity < this.bid.quanity) {
            let quant = this.alertCtrl.create({
              subTitle: 'Bid needs to include a higher quanity',
              buttons: ['OK']
            });
            quant.present();
          } else if (currentBid.quanity === this.bid.quanity && currentBid.di < this.bid.di) {
            let quantNum = this.alertCtrl.create({
              subTitle: 'If the di face number is lower, the bid needs a greater quanity',
              buttons: ['OK']
            });
            quantNum.present();
          } else {
            this.bid = currentBid
            this.socket.emit('send bid', { bid: this.bid, page: this.phrase, player: this.playernum });
          }
        }
      });
      alert.present().then(() => {
      });
    } else {
      noBid.present();
    }
  }

  checkBid(bid, playerBid) {
    this.gamedata.getDice(this.phrase)
      .then((data) => {
        this.totalDice = data;
        let totalDice = this.totalDice.totalDice[0];
        this.dicecheck = totalDice;
        let quanity = Number(bid.quanity)
        let check = 0
        if (totalDice) {
          for (var i = 0; i < totalDice.length; i++) {
            if (totalDice[i] === bid.di) {
              check++
            }
          }
          if (check >= quanity) {
            this.bidResult = true
          } else {
            this.bidResult = false
          }
            for (var i = 0; i < this.players.length; i++) {
              if (this.players[i].playerNum === playerBid) {
                if(this.players[i].playerNum===this.players[this.players.length-1].playerNum){
                  this.playerUp=this.players[0].playerNum
                  return this.playerShow(this.playerUp)
                }
                this.playerUp=this.players[i+1].playerNum
                return this.playerShow(this.playerUp)

              }
            }
        } else {
          let noBid = this.alertCtrl.create({
            subTitle: 'this is it',
            buttons: ['OK']
          });
          noBid.present();

        }
      })


  }

  bullShit() {
    this.bullButton = false;
    if (!this.bidResult) {
      let mark = this.playerBid
      this.socket.emit('you marked', { page: this.phrase, playerNum: mark });
    } else {
      if (this.playerBid < this.players.length) {
        let mark = this.playerBid + 1
        this.gamedata.giveMark(this.game, this.phrase, mark)
          .then((data) => {
            console.log("gaveMark")
            this.game = data
            for (var i = 0; i<this.game.players.length; i++){
              if(this.playernum===this.game.players[i].playerNum){
                this.playerMarks = this.game.players[i].marks
              }
            }
            if (this.playerMarks < 5) {
              this.markYou = true;
              this.rollButton = true;
            } else {
              this.youOut = true;
              console.log("help")
              this.socket.emit('out of game', {page: this.phrase, player: this.playernum });

            }
          })
      } else {
        let mark = 1
        this.gamedata.giveMark(this.game, this.phrase, mark)
          .then((data) => {
            console.log("gaveMark")
            this.game = data
            for (var i = 0; i<this.game.players.length; i++){
              if(this.playernum===this.game.players[i].playerNum){
                this.playerMarks = this.game.players[i].marks
              }
            }
            if (this.playerMarks < 5) {
              this.markYou = true;
              this.rollButton = true;
            } else {
              this.youOut = true;
              console.log("please")
              this.socket.emit('out of game', {page: this.phrase, player: this.playernum });
            }
          })

      }

    }
  }

  newRoll() {
    if (!this.youOut){
      if (!this.play) {
        if(this.playerUp ===this.playernum){
          this.youUp =this.playernum
          if (this.youUp===0)
          {this.youUp=this.players[0].playerNum}
        }else{
          this.youUp = this.playernum
          if (this.players.length<this.youUp)
          {  this.youUp=this.players[0].playerNum}
        }
        this.socket.emit('new roll', { page: this.phrase, playerNum: this.playernum, youUp:this.youUp });
      }
      // this.navCtrl.pop();
    }else{
      this.youDone()
    }

  }



  youDone(){
    this.appCtrl.getRootNav().push(YouDonePage);
  }
  backToStart(){
    // this.appCtrl.getRootNav().popToRoot()
  }

}
