import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ModalController } from 'ionic-angular';
import { NewGamePage } from '../newgame/newgame';
import { Gamedata } from '../../providers/gamedata';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public http: Http, public modalCtrl: ModalController, public gamedata: Gamedata) {

  }
  newGame() {
    let modal = this.modalCtrl.create(NewGamePage);
    modal.present()
  }

  joinGame() {
    console.log("yo");
  }

}
