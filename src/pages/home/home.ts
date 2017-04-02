import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ModalController } from 'ionic-angular';
import { NewGamePage } from '../newgame/newgame';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public http: Http, public modalCtrl: ModalController) {

  }
  newGame(){
    let modal = this.modalCtrl.create(NewGamePage);
    console.log(this)
    console.log("hey");
    this.http.get("http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=6&maxLength=6&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
    // .map(res => res.json())
    .subscribe((data)=>{
      var word = data.json()[0].word
      console.log(word);
    })

    modal.present();

  }

  joinGame(){
    console.log("yo");
  }

}
