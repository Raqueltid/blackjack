import { Component } from '@angular/core';
import { DeckService} from '../../services/deck.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
    
    public endMsg: String;
    public isFinished: Boolean = false;
    public stickFlg: Boolean = false;
    private dealer = {      
        'scores': [0],
        'cards': [],        
        'a': 0
    };

    private player = {      
        'scores': [0],
        'cards': [],
        'a': 0
    };
    
    constructor(private deckService: DeckService) {  
        this.initializeGame();      
    }

    public hit(){
        this.player.cards.push(this.deckService.getCard());
        this.player.scores = this.calculateScore(this.player.cards);
        this.checkScore(this.player.scores, false);        
    }

    public stick() {
        this.stickFlg = true;
        this.dealer.cards.push(this.deckService.getCard());
        this.dealer.scores = this.calculateScore(this.dealer.cards);
        this.checkScore(this.dealer.scores, true);
        if(!this.isFinished) {            
            //Pick the major score fro player
            //this.player.scores.sort((a,b)=>a-b); 
            if (this.dealer.scores[this.dealer.scores.length-1] < 21 &&
                this.dealer.scores[this.dealer.scores.length-1] > 
                this.player.scores[this.player.scores.length-1]) {
                this.endMsg = 'I win!!';
                this.endGame();      
            } else {
                //Wait a litle before show the next
                setTimeout(()=>{
					this.stick();
				}, 1000);		
            }
        }
    }
    
    private initializeGame () {
        //Reset status
        this.isFinished = false;
        this.stickFlg = false;

        //Reset deck
        this.deckService.initializeDeck();
        
        //Get four cards from deck
        let cards = [];
        for( let i=0; i<4; i++ ) {            
            cards.push(this.deckService.getCard());
        }

        //Reset cores
        this.dealer.scores = [0];
        this.player.scores = [0];
        
        //Hide dealer's second card
        cards[1].visible = false;   
        
         //Set the cards and scores
        this.dealer.cards = [cards[0], cards[1]];        
        this.player.cards = [cards[2], cards[3]];    
        this.dealer.scores = this.calculateScore(this.dealer.cards);
        this.player.scores = this.calculateScore(this.player.cards);
        
        this.checkScore(this.dealer.scores, true);
        if( !this.isFinished ) {
            this.checkScore(this.player.scores, false);
        }
    }

    private checkScore(scores: Array<Number>, isDealer: Boolean) {   
        //Blackjack
        const win = scores.filter(score => score == 21);    
        if ( win.length > 0 ) {
            this.endMsg =  (isDealer) ? 'I win!!':'Congratulations, You win!!';
            this.endGame();            
        } else {
            // Major than 21
            const lost = scores.filter(score => score > 21);
            if( lost.length === scores.length  ){
                console.log(lost);
                this.endMsg =  (isDealer) ? 'Congratulations, You win!!':'I win!!';
                this.endGame();
            }     
        }
    }

    private endGame() {
        //Show dealer's second card
        this.dealer.cards[1].visible = true; 
        this.isFinished = true; 
    }

    private calculateScore(cards) {
        let scores = [];
        let score = 0;
        let a = 0;
        cards.forEach(card => {
            score = score + card.value;
            //Check "A"
            if (card.value == 1) {
                a++;    
            }
        });

        scores.push(score);
        //If there is one or more "A"
        if( a > 0 ) {
            for(let i = 0; i<a; i++) {
                const alternativeValue = 10 * ( i + 1);
                scores.push(score + alternativeValue);              
            }
        }
        return scores;
    }   
}