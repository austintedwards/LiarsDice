import { Component } from '@angular/core';
import { App, NavController, NavParams, AlertController } from 'ionic-angular';
import { Gamedata } from '../../providers/gamedata';
import * as io from 'socket.io-client';
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
  game: any;
  players: any;
  phrase: any;
  socket: any;
  player: any;
  play: any;
  playernum: any;
  playedIt:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public gamedata: Gamedata,
    public appCtrl: App,
    public alertCtrl: AlertController
  ) {
    // this.socket = io('http://localhost:5000');
    this.socket = io('https://diceliar.herokuapp.com/');
    this.socket.on('players', (players) => {
      this.playedIt = true;
      this.ionViewDidLoad()
    })
    this.socket.on('start game', (play, playerNum, otherPlayers) => {
      this.gamedata.gameSize(this.game, this.phrase, otherPlayers)
        .then((data) => {
          this.appCtrl.getRootNav().push(DiceRollPage, { game: this.game, player: this.player, playernum: this.playernum });
        })
    })
  }

  ionViewDidLoad() {
    this.player = this.navParams.data.player
    this.phrase = this.navParams.data.phrase
    console.log(this.player)
    this.gamedata.getPlayers(this.phrase)
      .then((data) => {
        this.game = data;
        this.players = this.game.players;
        for (var i = 0; i < this.players.length; i++) {
          if (this.players[i].name === this.player) {
            this.playernum = this.players[i].playerNum
          }
        }
        console.log(this.playernum)
        if(!this.playedIt){
          this.socket.emit('players', { player: this.player, page: this.phrase });
        }
      });
  }

  beginGame() {
    let alert1 = this.alertCtrl.create({
      subTitle: 'Please wait for other players to join.',
      buttons: ['OK']
    });
    var otherPlayers = this.game.players.length
    if (otherPlayers > 1) {
      this.socket.emit('start game', { play: "play", page: this.phrase, playerNum: this.playernum, otherPlayers: otherPlayers });
    } else {
      alert1.present();
    }
  }
}
