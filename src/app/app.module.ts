import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { NewGamePage } from '../pages/newgame/newgame';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Gamedata } from '../providers/gamedata';
import { JoinGamePage } from '../pages/joingame/joingame';
import { GamePlayPage } from '../pages/gameplay/gameplay';
import { LoadingPage } from '../pages/loading/loading';
import { DiceRollPage } from '../pages/dice-roll/dice-roll';
import { YouDonePage } from '../pages/you-done/you-done';
import { YouWonPage } from '../pages/you-won/you-won';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    NewGamePage,
    JoinGamePage,
    GamePlayPage,
    LoadingPage,
    DiceRollPage,
    YouDonePage,
    YouWonPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    NewGamePage,
    JoinGamePage,
    GamePlayPage,
    LoadingPage,
    DiceRollPage,
    YouDonePage,
    YouWonPage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Gamedata,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
