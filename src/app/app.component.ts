import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { GiphyserviceService } from './giphyservice.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'My Giphy Sticker Book';

  constructor(){
  }
}
