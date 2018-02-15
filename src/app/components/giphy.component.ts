import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpClientModule }from '@angular/common/http';
import { GiphyserviceService } from '../giphyservice.service';
import { Result } from '../result';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.css']
})
export class GiphyComponent implements OnInit {

  readonly URL = 'https://media1.giphy.com/media/';
  readonly ORIGINAL_SIZE = '/100.gif'
  @Input() imageId: string;
  @Input() imageUrl: string;
  result:Result;

  ngOnInit() {
  }

  constructor(private giphySvc:GiphyserviceService){
  }

  onClick(){
    console.log("click>>>>> click here!!", this.imageUrl, this.imageId)
    this.result = { id: this.imageId, imageUrl: this.imageUrl, slug: "Nothing"};
    this.giphySvc.added.next(this.result);
  }

}
