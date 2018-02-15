import { Component, OnInit, Input } from '@angular/core';
import { Result } from '../result';
import { GiphyserviceService } from '../giphyservice.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  @Input()
  basket: Result[] = [];
  result: Result;

  constructor(private giphySvc: GiphyserviceService) { }

  ngOnInit(){}

  removeFromBasket(i: number) {
    this.result = this.basket[i];
    this.giphySvc.removed.next(i);
    this.giphySvc.return.next(this.result);
  }

}
