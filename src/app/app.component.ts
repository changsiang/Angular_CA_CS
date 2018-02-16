import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GiphyserviceService } from './giphyservice.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Giphy Sticker Book';
  @ViewChild('searchForm') searchForm: NgForm;

  constructor(private giphySvc:GiphyserviceService){
  }

  ngOnInit() {}

  processSearch(): void{
    this.giphySvc.searchQuery.next({pageNumber: 0, searchQuery: this.searchForm.value.searchBox});
    console.log(">>> Submit Button Pressed " + this.searchForm.value.searchBox);
  }

}
