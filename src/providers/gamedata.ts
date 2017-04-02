import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Gamedata provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Gamedata {

  constructor(public http: Http) {
    console.log('Hello Gamedata Provider');
  }
  newPhrase(){
    this.http.get("http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=6&maxLength=6&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
    // .map(res => res.json())
    .subscribe((data)=>{
      var word = data.json()[0].word
      console.log(word);
    })

  }

}
