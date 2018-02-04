//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//App Components
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { DealerComponent } from './components/dealer/dealer.component';
import { HeaderComponent } from './components/header/header.component';
import { GameComponent } from './containers/game/game.component';
import { PlayerComponent } from './components/player/player.component';
import { WelcomeComponent } from './containers/welcome/welcome.component';

//Services
import { DeckService } from './services/deck.service';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: '*', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'game', component: GameComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    DealerComponent,
    HeaderComponent,
    GameComponent,
    PlayerComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,            
    RouterModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    DeckService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
