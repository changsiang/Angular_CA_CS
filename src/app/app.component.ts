import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpParams, HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Data } from './data';
import { Result } from './result';
import { GiphyserviceService } from './giphyservice.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { HttpClientJsonpModule } from '@angular/common/http/src/module';
import { query } from '@angular/core/src/animation/dsl';
import { Pagination } from './pagination';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Giphy Sticker Book';
  @ViewChild('searchForm') searchForm: NgForm;
  retrievedList: Result[];
  contents: Result[] = [];
  pagination: Pagination;

  private addSub: Subscription;
  private removeSub: Subscription;

  constructor(private httpClient: HttpClient, private giphySvc:GiphyserviceService){

  }

  ngOnInit(){
    this.addSub = this.giphySvc.added.subscribe((data) => {
      this.contents.unshift(data);
    })

    this.removeSub = this.giphySvc.removed.subscribe((i) => {
      this.contents.splice(i, 1);
    })
    

  }

  processSearch(): void{
    this.giphySvc.searchQuery.next({pageNumber: 0, searchQuery: this.searchForm.value.searchBox});
    console.log(">>> Submit Button Pressed " + this.searchForm.value.searchBox);

  }

}
