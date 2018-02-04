import {Injectable} from '@angular/core';

@Injectable()
export class DeckService { 
    private cardsTypes: Array<string> = ['diamond', 'heart','club', 'spade'];        
    private cardsValues: Array<number> = [];      
    private deck =[]; 
    
    constructor() {
       this.initializeDeck();
    }
    
    /**
     * Get all deck
     */
    public getDeck() {
        return this.deck;
    }
    
    /**
     * Pick a card
     */
    public getCard() {        
        const oneCard = this.deck.shift();
        return oneCard;
    }
    
    /**
     * Generate a deck with 52 cards and mix
     */
    public initializeDeck() {
        let count = 0;
        //Generate card values        
        this.cardsValues = Array.from( {length: 13}, (v, k) => k+1) ;
        //Generate deck
        this.cardsTypes.forEach((type)=> {
            this.cardsValues.forEach((val, idx)=> {                 
                this.deck[count] = {};
                this.deck[count]['type'] = type;  
                this.deck[count]['visible'] = true; 
                switch (val) {
                    case 1:               
                        this.deck[count]['label'] = 'A';
                        this.deck[count]['value'] = 1;
                        break;
                    case 11:                         
                        this.deck[count]['label'] = 'J';
                        this.deck[count]['value'] = 10;                        
                        break;
                    case 12:                         
                        this.deck[count]['label'] = 'Q';
                        this.deck[count]['value'] = 10;                        
                        break;
                    case 13:                         
                        this.deck[count]['label'] = 'K';
                        this.deck[count]['value'] = 10;
                        break;
                    default:                         
                        this.deck[count]['label'] = val;
                        this.deck[count]['value'] = val;
                    break;
                 }
                 count++;
            });           
        });            
        this.deck = this.shuffleArray(this.deck);     
    }    
    /**
     * Mix - randomnly cards
     * @param arr for shuffle
     */
    private shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr; 
    }
}