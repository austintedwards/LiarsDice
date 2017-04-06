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
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  this.http.post('http://localhost:5000/v1/api/game', JSON.stringify(game), {headers: headers})
    .subscribe(res => {
    });
}

addPlayer(game){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.put('http://localhost:5000/v1/api/game/'+game.phrase, JSON.stringify(game),{headers: headers})
    .subscribe(res => {
    });
}

addRoll(game){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.put('http://localhost:5000/v1/api/game/'+game.phrase, JSON.stringify(game),{headers: headers})
    .subscribe(res => {
    });
}

getGame(phrase){
  return new Promise(resolve=>{
  this.http.get('http://localhost:5000/v1/api/game/'+phrase)
  .subscribe((data)=>{
    this.data=data.json()
    resolve(this.data)
  })
})
}

getPlayers(phrase){
  return new Promise(resolve=>{
  this.http.get('http://localhost:5000/v1/api/game/'+phrase)
  .subscribe((data)=>{
    this.data=data.json()
    resolve(this.data)
  })
})
}

getDice(phrase){
  return new Promise(resolve=>{
  this.http.get('http://localhost:5000/v1/api/game/'+phrase)
  .subscribe((data)=>{
    this.data=data.json()
    resolve(this.data)
  })
})
}




}
