import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import * as io from 'socket.io-client';
import { Gamedata } from '../../providers/gamedata';

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
  bidResult:any;
  markYou: any;
  playerMarks:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public alertCtrl: AlertController,
    public gamedata: Gamedata) {
    this.socket = io('http://localhost:5001');
    this.socket.on('send bid', (bid, playerBid) => {
      console.log('play this', bid, playerBid)
      // this.play = play;
      this.bid = bid
      this.playerBid = playerBid
      this.checkBid(bid, playerBid)
    })
    this.socket.on('you marked', (playerNum) => {
      console.log('play this', playerNum)
      if (this.playernum ===playerNum){
      this.gamedata.giveMark(this.game,this.phrase,playerNum)
      .then((data)=>{
        this.game = data
        this.playerMarks = this.game.players[playerNum-1].marks
        this.markYou = true;
      })
    }
      // this.play = play;

    })
  }

  ionViewDidLoad() {
    this.markYou=false;
    console.log("onthispage")
    this.phrase = this.navParams.data.phrase
    this.gamedata.getGame(this.phrase)
    .then((data)=>{
      console.log(data);
    })
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
    this.socket.emit('player rolled', { page: this.phrase, playerNum: this.playernum });
    this.playerUp = 1
    this.playerShow(this.playerUp)
  }

  playerShow(playerUp) {
    console.log("player number happening", this.playerUp)
    for (var i = 0; i < this.players.length; i++) {
      if (this.playerUp === this.players[i].playerNum) {
        this.playerNameUp = this.players[i].name
      }
    }

  }
  // makeBid(){
  //   console.log("makebid")
  //
  // }
  makeBid(num) {
    console.log(this.totalDice)
    console.log("game this", this)
    // if(this.totalDice){
    let alert = this.alertCtrl.create();
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
        if(!this.bid){
        this.bid = currentBid
        this.socket.emit('send bid', { bid: this.bid, page: this.phrase, player: this.playernum });
      }else if(currentBid.quanity<this.bid.quanity){
        console.log("increase quanity")
        let quant = this.alertCtrl.create({
          subTitle: 'Bid needs to include a higher quanity',
          buttons: ['OK']
        });
        quant.present();
      }else if(currentBid.quanity===this.bid.quanity&&currentBid.di<this.bid.di){
        console.log("increase quanity")
        let quantNum = this.alertCtrl.create({
          subTitle: 'If the di face number is lower, the bid needs a greater quanity',
          buttons: ['OK']
        });
        quantNum.present();
      }else{
        this.bid = currentBid
        this.socket.emit('send bid', { bid: this.bid, page: this.phrase, player: this.playernum });
        console.log("before", this.playerUp)
        console.log("length", this.players.length)
      }
      }
    });
    alert.present().then(() => {
    });

  }

  checkBid(bid, playerBid) {
    this.gamedata.getDice(this.phrase)
      .then((data) => {
        this.totalDice = data;
        console.log(this.totalDice)
        let totalDice = this.totalDice.totalDice[0];
        let quanity = Number(bid.quanity)
        console.log(totalDice)
        let check = 0
        if (totalDice) {
          for (var i = 0; i < totalDice.length; i++) {
            if (totalDice[i] === bid.di) {
              check++
            }
          }
          if (check >= quanity) {
            console.log("got it from player #", playerBid)
            this.bidResult = true
          } else {
            console.log("not it from player#", playerBid)
            this.bidResult = false
          }
          if (playerBid < this.players.length){
            this.playerUp = playerBid+1
            console.log("player number", this.playerUp)
          }else{
            this.playerUp = 1
          }
          this.playerShow(this.playerUp)
        } else {
          let noBid = this.alertCtrl.create({
            subTitle: 'Wait for All Players to Roll Dice.',
            buttons: ['OK']
          });
          noBid.present();

        }
      })


  }

  bullShit() {
    console.log("bullshit")
    if (!this.bidResult){
      console.log("DIS BULLSHIT")
      console.log(this.bid, "playerbid", this.playerBid)
      let mark = this.playerBid
      this.socket.emit('you marked', { page: this.phrase, playerNum: mark });
       console.log("mark", mark, "game", this.game)
    }else{
      console.log("you got a mark")
      console.log(this.bid, "playerbid", this.playerBid)
      if (this.playerBid<this.players.length){
        let mark = this.playerBid + 1
        this.gamedata.giveMark(this.game,this.phrase,mark)
        .then((data)=>{
          this.game = data
          this.playerMarks = this.game.players[mark-1].marks
          this.markYou = true;
        })
      }else{
        let mark = 1
        this.gamedata.giveMark(this.game,this.phrase,mark)
        .then((data)=>{
          this.game = data
          this.playerMarks = this.game.players[mark-1].marks
          this.markYou = true;
        })

      }

    }
  }


}
