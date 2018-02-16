import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GiphyserviceService } from '../giphyservice.service';
import { Result } from '../result';
import { Pagination } from '../pagination';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { jsonBasket } from '../jsonBasket';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.css']
})
export class GiphyComponent implements OnInit {

  readonly IMAGE_URL = 'https://media2.giphy.com/media/';
  readonly ORIGINAL_SIZE = '/giphy.gif'

  @ViewChild('searchForm') searchForm: NgForm;

  totalPages: number = 0;
  page: number = 0;
  searchQuery: string = " ";
  limit = 45;
  result: Result;
  pagination: Pagination;
  results: Result[] = [];
  basket: Result[] = [];

  private searchQuerySub: Subscription;

  constructor(private giphySvc: GiphyserviceService) {


  }

  ngOnInit() {

    this.results = this.giphySvc.results;
    this.basket = this.giphySvc.basket;
    this.totalPages = this.giphySvc.totalPages;
    this.page = this.giphySvc.page;

    this.searchQuerySub = this.giphySvc.searchQuery.subscribe((query) => {
      this.page = query.pageNumber;
      this.searchQuery = query.searchQuery;
      this.processSearch();
    })
  }

  searchFormSubmit(){
    this.searchQuery = this.searchForm.value.searchBox;
    this.processSearch();

  }

  processSearch() {
    this.results = [];

    this.giphySvc.getSearchResults(this.searchQuery, this.page, this.limit)
      .then((data) => {
        console.log("data ", data);
        console.log("pagination", data.pagination)
        this.pagination = { total_count: data.pagination.total_count, count: data.pagination.count, offset: data.pagination.offset };
        this.totalPages = Math.ceil(this.pagination.total_count / this.pagination.count);
        this.giphySvc.totalPages = this.totalPages;
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
      this.giphySvc.queryString = this.searchQuery;
      this.giphySvc.results = this.results;
      this.giphySvc.page = this.page;
  }


  onClick(index: number) {
    console.log("click>>>>> click here!!", this.results[index].imageUrl, this.results[index].id)
    this.basket.push(this.results[index]);
    this.results.splice(index, 1);
    this.giphySvc.results = this.results;
    this.giphySvc.basket = this.basket;
    this.giphySvc.totalPages = this.totalPages;
    this.giphySvc.page = this.page;
  }

}
