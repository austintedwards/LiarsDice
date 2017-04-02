import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Gamedata provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Gamedata {
  data:any;

  constructor(public http: Http) {
    this.data=null;
    console.log('Hello Gamedata Provider');
  }

  newPhrase(){
    return new Promise(resolve=>{
    this.http.get("http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=6&maxLength=6&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
    // .map(res => res.json())
    .subscribe((data)=>{
      this.data = data.json()[0].word
      resolve(this.data)
    })
  })
  }

  createGame(game){
    console.log("game", game)
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  this.http.post('http://localhost:8080/api/game', JSON.stringify(game), {headers: headers})
    .subscribe(res => {
      console.log(res.json());
    });
}

addPlayer(game){
    console.log("game", game)
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  this.http.put('http://localhost:8080/api/game/'+game.phrase, JSON.stringify(game), {headers: headers})
    .subscribe(res => {
      console.log(res.json());
    });
}


}
