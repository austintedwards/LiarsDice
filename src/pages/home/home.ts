import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ModalController } from 'ionic-angular';
import { NewGamePage } from '../newgame/newgame';
import { Gamedata } from '../../providers/gamedata';
import { JoinGamePage } from '../joingame/joingame';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public http: Http,
    public modalCtrl: ModalController,
    public gamedata: Gamedata) {

  }
  newGame() {
    let modal = this.modalCtrl.create(NewGamePage);
    modal.onDidDismiss(game => {
      if(game){
        this.gamedata.createGame(game);
      }
    });
    modal.present()
  }

  joinGame() {
    let modal = this.modalCtrl.create(JoinGamePage);
    modal.onDidDismiss(game => {
      if(game){
        this.gamedata.addPlayer(game);
      }
    });
    modal.present()
  }

}
