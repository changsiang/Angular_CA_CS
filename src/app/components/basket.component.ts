import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Result } from '../result';
import { GiphyserviceService } from '../giphyservice.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { jsonBasket } from '../jsonBasket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  @ViewChild('basketForm') selectedForm: NgForm;
  @Input() basket: Result[] = [];
  result: Result;
  jsonBasket: jsonBasket;
  dipSAprojectUrl = 'http://127.0.0.1:8080/GiphyProject/collections/'

  private addSub: Subscription;
  private removeSub: Subscription;

  constructor(private giphySvc: GiphyserviceService, private httpClient: HttpClient) { }

  ngOnInit(){
    this.addSub = this.giphySvc.added.subscribe((data) => {
      this.basket.unshift(data);
    })

    this.removeSub = this.giphySvc.removed.subscribe((i) => {
      this.basket.splice(i, 1);
    })

  }

  removeFromBasket(i: number) {
    this.result = this.basket[i];
    this.giphySvc.removed.next(i);
    this.giphySvc.return.next(this.result);
  }

  postData(){
    this.jsonBasket = {data: this.basket, userId: this.selectedForm.value.userId, collectionName: this.selectedForm.value.collectionName};
    var httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    this.httpClient.post(this.dipSAprojectUrl, JSON.stringify(this.basket), httpOptions)
    .subscribe((res) => {console.log(">>> httpPost", res);
    this.basket = [];
  })
  }
}
