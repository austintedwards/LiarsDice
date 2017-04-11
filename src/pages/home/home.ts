import { Component } from '@angular/core';
import { Http } from '@angular/http';
import {App, ModalController } from 'ionic-angular';
import { NewGamePage } from '../newgame/newgame';
import { Gamedata } from '../../providers/gamedata';
import { JoinGamePage } from '../joingame/joingame';
import * as io from 'socket.io-client';
import { LoadingPage } from '../loading/loading';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  socket: any;
  game: any;

  constructor(
    public http: Http,
    public modalCtrl: ModalController,
    public gamedata: Gamedata,
    public appCtrl: App) {
      this.socket = io('http://localhost:5000');

  }
  newGame() {
    let modal = this.modalCtrl.create(NewGamePage);
    modal.onDidDismiss(game => {
      if(game){
        this.gamedata.createGame(game)
        .then(()=>{
          this.appCtrl.getRootNav().push(LoadingPage,{phrase:game.phrase, player:game.player});
        });
      }
    });
    modal.present()
  }

  joinGame() {
    let modal = this.modalCtrl.create(JoinGamePage);
    modal.onDidDismiss(game => {
      if(game){
        this.gamedata.addPlayer(game)
        .then(()=>{
          this.appCtrl.getRootNav().push(LoadingPage,{phrase:game.phrase, player:game.player});
        });
      }
    });
    modal.present()
  }

}
