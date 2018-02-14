import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpClientModule }from '@angular/common/http';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.css']
})
export class GiphyComponent implements OnInit {

  readonly URL = 'https://media1.giphy.com/media/';
  readonly ORIGINAL_SIZE = '/giphy-preview.gif'
  @Input() imageId = 'l3q2UZGFTdIKqsSje';
  @Input() imageUrl: string;

  ngOnInit() {
  }

  constructor(){
    this.imageUrl = this.URL + this.imageId + this.ORIGINAL_SIZE;
  }

  onClick(){

  }

}
