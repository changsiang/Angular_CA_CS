import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Result } from '../result';
import { GiphyserviceService } from '../giphyservice.service';
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
  results: Result[];
  submitted: boolean = false;

  constructor(private giphySvc: GiphyserviceService, private httpClient: HttpClient) { }

  ngOnInit(){
    this.basket = this.giphySvc.basket;
    this.results = this.giphySvc.results;
  }

  removeFromBasket(i: number) {
    this.result = this.basket[i];
    this.basket.splice(i , 1);
    this.results.push(this.result);
    this.giphySvc.basket = this.basket;
    this.giphySvc.results = this.results;

  }

  postData(){
    this.jsonBasket = {data: this.basket, userId: this.selectedForm.value.userId, collectionName: this.selectedForm.value.collectionName};
    this.giphySvc.postSelectedGifs(this.jsonBasket);
    this.basket = this.giphySvc.basket;
    this.submitted = true;
  }
}
