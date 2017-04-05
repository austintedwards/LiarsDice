import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Gamedata } from '../../providers/gamedata';
import * as io from 'socket.io-client';
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public gamedata:Gamedata
  ) {
    this.socket = io('http://localhost:5000');
    this.socket.on('player',(players)=>{
      console.log('player',players)
      // this.players.push(player)
    })
  }

  ionViewDidLoad() {
      var phrase = this.navParams.data.phrase
      var playnum = this.navParams.data.playnum
      this.gamedata.getPlayers(phrase)
      .then((data) => {
      this.game = data;
      this.players = this.game.players;
      if(this.game.passphrase==="not working"|| playnum!==this.players.length){
        this.ionViewDidLoad()
      }
    });
  }

}
