import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  public cardList : string[] = ["uno","dos","tres","cuatro"]

  @Input()
  public gifsList: Gif[]=[];
}
