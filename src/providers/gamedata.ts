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
    this.http.get("http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=6&maxLength=6&limit=1&api_key=ce6633f582cfd304a94050c97d200a34aef3946497b09ae63")
    // .map(res => res.json())
    .subscribe((data)=>{
      this.data = data.json()[0].word
      resolve(this.data)
    })
  })
  }

createGame(game){
  return new Promise(resolve=>{
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  this.http.post('http://localhost:5000/v1/api/game', JSON.stringify(game), {headers: headers})
    .subscribe((data) => {
      this.data=data.json()
      resolve(this.data)
    });
  });
}

addPlayer(game){
  return new Promise(resolve=>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.put('http://localhost:5000/v1/api/game/'+game.phrase, JSON.stringify(game),{headers: headers})
    .subscribe((data) => {
      this.data=data.json()
      resolve(this.data)
    });
  });
}

addRoll(game){
  return new Promise(resolve=>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.put('http://localhost:5000/v1/api/game/'+game.phrase, JSON.stringify(game),{headers: headers})
    .subscribe((data)=>{
      this.data=data.json()
      resolve(this.data)
    })
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

giveMark(game,phrase,mark){
  return new Promise(resolve=>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.put('http://localhost:5000/v1/api/game/'+phrase+"/"+mark, JSON.stringify(game),{headers: headers})
    .subscribe((data)=>{
      this.data=data.json()
      resolve(this.data)
    })
    })
}

getMark(phrase, playerNum){
  return new Promise(resolve=>{
  this.http.get('http://localhost:5000/v1/api/game/'+phrase+"/"+playerNum)
  .subscribe((data)=>{
    this.data=data.json()
    resolve(this.data)
  })
})
}

deletePlayer(phrase, playerNum){
  return new Promise(resolve=>{
  this.http.delete('http://localhost:5000/v1/api/game/'+phrase+"/"+playerNum)
  .subscribe((data)=>{
    console.log("deleted data",data);
    resolve(data)
  })
})

}

gameSize(game,phrase,players){
  return new Promise(resolve=>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.put('http://localhost:5000/v1/api/game/'+phrase+"/players/"+players, JSON.stringify(game),{headers: headers})
    .subscribe((data)=>{
      this.data=data.json()
      resolve(this.data)
    })
    })
}



}
