import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeckService } from '../../services/deck.service';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
    public topCards = [];
    public bottomCards = [];
    constructor ( private router: Router, private deckService: DeckService) {
        this.drawCards();
    }

    private drawCards() {
        this.deckService.initializeDeck();        
        for( let i=0; i<5; i++ ) {            
            this.topCards.push(this.deckService.getCard());
        }
        for( let i=0; i<5; i++ ) {            
          this.bottomCards.push(this.deckService.getCard());
        }
    }
    /**
    Start the game
      */
    play() {
        this.router.navigateByUrl('/game');
    }
}