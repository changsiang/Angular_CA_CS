import { Component, OnInit, Input } from '@angular/core';
import { GiphyserviceService } from '../giphyservice.service';
import { Result } from '../result';
import { Pagination } from '../pagination';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.css']
})
export class GiphyComponent implements OnInit {

  readonly IMAGE_URL = 'https://media2.giphy.com/media/';
  readonly ORIGINAL_SIZE = '/giphy.gif'

  totalPages: number = 0;
  page: number = 0;
  searchQuery: string = " ";
  limit = 25;
  result: Result;
  pagination: Pagination;
  results: Result[] = [];

  private searchQuerySub: Subscription;
  private returnSub: Subscription;


  constructor(private giphySvc: GiphyserviceService) {


  }

  ngOnInit() {

    this.searchQuerySub = this.giphySvc.searchQuery.subscribe((query) => {
      this.page = query.pageNumber;
      this.searchQuery = query.searchQuery;
      this.processSearch();
    })

    this.returnSub = this.giphySvc.return.subscribe((data) => {
      this.results.push(data);
    })

  }

  processSearch() {
    this.results = [];

    this.giphySvc.getSearchResults(this.searchQuery, this.page, this.limit)
      .then((data) => {
        console.log("data ", data);
        console.log("pagination", data.pagination)
        this.pagination = { total_count: data.pagination.total_count, count: data.pagination.count, offset: data.pagination.offset };
        this.totalPages = Math.ceil(this.pagination.total_count / this.pagination.count);
        for (let i of data.data) {
          this.results.push({
            id: i.id,
            slug: i.slug,
            imageUrl: this.IMAGE_URL + `${i.id}` + this.ORIGINAL_SIZE,
          })
          console.log("i", i.id);
        }
      }
      )
  }


  onClick(index: number) {
    console.log("click>>>>> click here!!", this.results[index].imageUrl, this.results[index].id)
    this.result = this.results[index];
    this.giphySvc.added.next(this.result);
    this.results.splice(index, 1);
  }

}
