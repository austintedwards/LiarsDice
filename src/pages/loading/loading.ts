import { Component } from '@angular/core';
import { App, NavController, NavParams, AlertController } from 'ionic-angular';
import { Gamedata } from '../../providers/gamedata';
// import * as io from 'socket.io-client';
import { DiceRollPage } from '../dice-roll/dice-roll';

/*
  Generated class for the Loading page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html'
})
export class LoadingPage {
  game:any;
  players: any;
  phrase: any;
  socket:any;
  player:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public gamedata:Gamedata,
    public appCtrl: App,
    public alertCtrl: AlertController
  ) {
    // this.socket = io('http://localhost:5000');
    // this.socket.on('player',(players)=>{
    //   console.log('player',players)
    // })
  }

  ionViewDidLoad() {
      var phrase = this.navParams.data.phrase
      var playnum = this.navParams.data.playnum
      this.gamedata.getPlayers(phrase)
      .then((data) => {
      this.game = data;
      this.players = this.game.players;
      if(this.players){
        var playerLength = this.players.length
        }
      if(this.game.passphrase==="not working" || playerLength===playnum){
        this.ionViewDidLoad()
      }
    });
  }

  beginGame(){
    this.player = this.navParams.data.player
    let alert1 = this.alertCtrl.create({
      subTitle: 'Please wait for other players to join.',
      buttons: ['OK']
    });

    var otherPlayers = this.game.players.length
    if (otherPlayers>1){
      this.appCtrl.getRootNav().push(DiceRollPage,{game:this.game, player:this.player});
    }else{
      alert1.present();
    }
  }

}
