import { Component, OnInit, Input } from '@angular/core';
import { GiphyserviceService } from '../giphyservice.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {


  page: number = 1;
  totalPages: number = 0;
  searchQuery: string;

  constructor(private giphySvc: GiphyserviceService) { }

  ngOnInit() {
    this.page = this.giphySvc.page;
    this.totalPages = this.giphySvc.totalPages;
    this.searchQuery = this.giphySvc.queryString;
  }

  next() {
    this.giphySvc.searchQuery.next({ pageNumber: this.page + 1, searchQuery: this.searchQuery });
  }

  prev() {
    this.giphySvc.searchQuery.next({ pageNumber: this.page - 1, searchQuery: this.searchQuery });
  }

}
