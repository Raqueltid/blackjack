import { Component, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
    @Input('card') card: any;
    @Input('visible') visible: Boolean;
    constructor() {
      
    }   
}