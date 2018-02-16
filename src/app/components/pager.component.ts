import { Component, OnInit, Input } from '@angular/core';
import { GiphyserviceService } from '../giphyservice.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  @Input()
  page: number = 1;

  @Input()
  totalPages: number = 0;

  @Input()
  searchQuery: string;

  constructor(private giphySvc: GiphyserviceService) { }

  ngOnInit() {
  }

  next() {
    this.giphySvc.searchQuery.next({ pageNumber: this.page + 1, searchQuery: this.searchQuery });
  }

  prev() {
    this.giphySvc.searchQuery.next({ pageNumber: this.page - 1, searchQuery: this.searchQuery });
  }

}
