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
  totalDice:any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public alertCtrl: AlertController,
    public gamedata: Gamedata) {
    this.socket = io('http://localhost:5001');
    this.socket.on('send bid', (bid) => {
      console.log('play this', bid)
      // this.play = play;
      this.checkBid(bid)
    })
  }

  ionViewDidLoad() {
    this.game = this.navParams.data.game
    this.player = this.navParams.data.player
    this.dice = this.navParams.data.dice
    this.phrase = this.navParams.data.phrase
    console.log("gameplay", this)
  }
  // makeBid(){
  //   console.log("makebid")
  //
  // }
  testing(num) {
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
        this.bid = { di: num, quanity: data }
        this.socket.emit('send bid', { bid: this.bid, page: this.phrase });
      }
    });
    alert.present().then(() => {
    });
  }

  checkBid(bid) {
    this.gamedata.getDice(this.phrase)
      .then((data) => {
      this.totalDice = data;
      let totalDice = this.totalDice.totalDice[0];
      let quanity = Number(bid.quanity)
      let check = 0
      console.log(totalDice)
      console.log(bid.di)
      for (var i = 0 ; i<totalDice.length; i++){
        console.log(i)
        if (totalDice[i]===bid.di){
          check ++
          console.log(check)
        }
      }
      if (check >= quanity){
        console.log("got it")
      }else{
        console.log("not it")
      }
    })

  }

  bullShit() {
    console.log("bullshit")
  }


}
